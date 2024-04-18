import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { NotFoundError } from "rxjs";

@Injectable()
export class UserService{

    constructor(private readonly prisma:PrismaService){}

    async create({email,name,password}:CreateUserDto){

        return await this.prisma.user.create({
            data:{
                email,
                name,
                password
            }
        })

    }

    async list(){
        return this.prisma.user.findMany({
        })
    }

    async show(id:number){
        return this.prisma.user.findUnique({
            where:{
                id
            }
        })
    }

    async update(id:number, {email, name, password, birthAt}:UpdatePutUserDto){

        if(!(await this.show(id))){
            throw new NotFoundException("O usuário do id mencionado não existe");
        }

        return this.prisma.user.update({
          
            data: {email, name, password, birthAt: birthAt ? new Date(birthAt) : null},
            where:{
                id
            }
        })
    }
    async updatePartial(id:number, {email, name, password, birthAt}:UpdatePatchUserDto){

        if(!(await this.show(id))){
            throw new NotFoundException("O usuário do id mencionado não existe");
        }
        
        const data:any = {}

        if(email){
            data.email = email
        }
        if(name){
            data.name = name
        }
        if(password){
            data.password = password
        }
        if(birthAt){
            data.birthAt = new Date(birthAt)
        }
        
        return this.prisma.user.update({
            data, 
            where:{
                id
            }
        })
    }

    async delete(id:number){

        if(!(await this.show(id))){
            throw new NotFoundException("O usuário do id mencionado não existe");
        }
        return this.prisma.user.delete({
            where:{
                id
            }
        })
    }

}