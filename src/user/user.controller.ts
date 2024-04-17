import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { get } from "http";

@Controller('users')
export class UserController{

    @Post()
    async create(@Body() body){
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
    async update(@Body() body, @Param() param){
        return {
            method:"put",
            body,
            param
        }

    }
    
    @Patch(':id')
    async updatePartial(@Body() body, @Param() param){
        return {
            method:"patch",
            body,
            param
        }
    }
}