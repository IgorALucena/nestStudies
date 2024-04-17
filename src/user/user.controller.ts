import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { get } from "http";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{

    constructor(private userService: UserService){}

    @Post()
    async create(@Body() body: CreateUserDto){
        return await this.userService.create(body);    
    }

    @Get()
    async read(){
        return this.userService.list();
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number){
        return this.userService.show(id);
    }

    @Put(':id')
    async update(@Body() body: UpdatePutUserDto, @Param('id', ParseIntPipe) id: number){
        return {
            method:"put",
            body,
            id
        }

    }
    
    @Patch(':id')
    async updatePartial(@Body() body: UpdatePatchUserDto, @Param('id', ParseIntPipe) id: number){
        return {
            method:"patch",
            body,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return {id}
    }
}