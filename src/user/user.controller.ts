import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { get } from "http";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";

@Controller('users')
export class UserController{

    @Post()
    async create(@Body() body: CreateUserDto){
        return {body};
    }

    @Get()
    async read(){
        return {users:[]}
    }

    @Get(':id')
    async readOne(@Param() param){
        return {user:{}, param}
    }

    @Put(':id')
    async update(@Body() body: UpdatePutUserDto, @Param() param){
        return {
            method:"put",
            body,
            param
        }

    }
    
    @Patch(':id')
    async updatePartial(@Body() body: UpdatePatchUserDto, @Param() param){
        return {
            method:"patch",
            body,
            param
        }
    }

    @Delete(':id')
    async delete(@Param() param){
        return {param}
    }
}