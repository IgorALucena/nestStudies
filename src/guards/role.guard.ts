import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate{

    constructor(private readonly reflector: Reflector){

    }

    async canActivate(context: ExecutionContext){

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

        if(!requiredRoles){
            return true; // se não tem regra, libera a rota
        }

        const {user} = context.switchToHttp().getRequest();

        const rolesfilted = requiredRoles.filter(role=>role ===user.role) //filtrando se o usuário que chega é igual a regra pegada estabelecida de acesso a role

        return rolesfilted.length > 0 // como deve retornar aqui, basta eu fazer o retorno de true or falso, que ele já faz funcionar. Se true, ele libera, se false, ele não libera

        
    }
}