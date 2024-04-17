import { Body, Controller, Get, Param, Post } from "@nestjs/common";
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
}