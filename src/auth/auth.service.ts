import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class AuthService{
    constructor(private readonly jwtService: JwtService, private readonly prisma:PrismaService){}

    async createToken(){
        //return this.jwtService.sign()
    }

    async checkToken(token:String){
        //return this.jwtService.verify()
    }

    async login(email:string, password:string){
        const user = await this.prisma.user.findFirst({
            where:{
                email,
                password
            }
        })

        if(!user){
            throw new UnauthorizedException("E-mail ou senha incorretos.");
        }

        return user;

    }

    async forget(email: string){
        const user = await this.prisma.user.findFirst({
            where:{
                email
            }
        })
        if(!user){
            throw new UnauthorizedException("E-mail está incorreto");
        }

        return true;

        //Fazer: enviar o e-mail...
    }

    async reset(password: string, token: string){

        // Fazer: validar o token e trocar a senha

        const id = 0

        await this.prisma.user.update({
            where: {
                id
            },
            data:{
                password
            }
        })


    }
    
}