import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService, private readonly userService: UserService) { }

    createToken(user: User) {
        return {
            acessToken: this.jwtService.sign(
                {
                    id: user.id,
                    name: user.name,
                    email: user.email

                },
                {
                    expiresIn: "7 days",
                    subject: String(user.id),
                    issuer: 'login',
                    audience: 'users'
                })
        }
    }


    /*
    expiresIn: Define o tempo de expiração do token. Neste caso, o token expirará após 7 dias.
    subject: Representa o assunto do token. Normalmente, é o identificador único do usuário. Aqui, está sendo usado o ID do usuário convertido em string.
    issuer: Indica a entidade que emitiu o token. Neste caso, está definido como 'login'.
    audience: Especifica para quem o token é destinado. Aqui, é definido como 'users', indicando que o token é destinado aos usuários do sistema.
    Isso se refere as: chaves de identificação do token: iss, sub, aud, exp, nbf, iat, jti 
    */



    checkToken(token: string) {
        try{
            const data = this.jwtService.verify(token, {
                audience:'users',
                issuer:'login',
            });

            return data

        }catch(e){
            throw new BadRequestException(e);
        }
        
    }

    isValidToken(token:string){ // apenas para teste
        try{
            this.checkToken(token);
            return true;
        }catch(e){
            return false;
        }
    }

    async login(email: string, password: string) {

        console.log(process.env)
        const user = await this.prisma.user.findFirst({
            where: {
                email,
            }
        })

        if (!user) {
            throw new UnauthorizedException("E-mail ou senha incorretos.");
        }

        if(!await bcrypt.compare(password, user.password)){// para validar a senha
            throw new UnauthorizedException("E-mail ou senha incorretos.");
        }; 

        return this.createToken(user);

    }

    async forget(email: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        })
        if (!user) {
            throw new UnauthorizedException("E-mail está incorreto");
        }

        return true;

        //Fazer: enviar o e-mail...
    }

    async reset(password: string, token: string) {

        // Fazer: validar o token e trocar a senha

        const id = 0

        const user = await this.prisma.user.update({
            where: {
                id
            },
            data: {
                password
            }
        })
        return this.createToken(user);

    }

    async register(data: AuthRegisterDTO) {

        const user = await this.userService.create(data);
        return this.createToken(user);

    }

}