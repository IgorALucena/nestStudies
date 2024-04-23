import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import * as bcrypt from 'bcrypt'; // importa assim quando for desenvolvido em javascript

@Injectable()
export class UserService{

    constructor(private readonly prisma:PrismaService){}

    async create({email,name,password,role}:CreateUserDto){

       password = await bcrypt.hash(password, await bcrypt.genSalt()); // gerando a senha com o bcrypt

        return await this.prisma.user.create({
            data:{
                email,
                name,
                password,
                role
            }
        })

    }

    async list(){
        return this.prisma.user.findMany({
        })
    }

    async show(id:number){

        if(!(await this.prisma.user.count({
            where:{
                id
            }
        }))){
            throw new NotFoundException("O usuário do id mencionado não existe");
        }

        return this.prisma.user.findUnique({
            where:{
                id
            }
        })
    }

    async update(id:number, {email, name, password, birthAt, role}:UpdatePutUserDto){

        if(!(await this.show(id))){
            throw new NotFoundException("O usuário do id mencionado não existe");
        }

        password = await bcrypt.hash(password, await bcrypt.genSalt());

        return this.prisma.user.update({
          
            data: {email, name, password, birthAt: birthAt ? new Date(birthAt) : null, role},
            where:{
                id
            }
        })
    }
    async updatePartial(id:number, {email, name, password, birthAt, role}:UpdatePatchUserDto){

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
            data.password = await bcrypt.hash(password, await bcrypt.genSalt());
        }
        if(birthAt){
            data.birthAt = new Date(birthAt)
        }

        if(role){
            data.role = role
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