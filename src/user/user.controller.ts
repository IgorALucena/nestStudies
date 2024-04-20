import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { get } from "http";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";

@Controller('users')
export class UserController{

    constructor(private userService: UserService){}

    @UseInterceptors(LogInterceptor)
    @Post()
    async create(@Body() body: CreateUserDto){
        return await this.userService.create(body);    
    }

    @Get()
    async read(){
        return this.userService.list();
    }

    @Get(':id')
    async readOne(@ParamId() id: number){ // com decorator param customizado
        return this.userService.show(id);
    }

    @Put(':id')
    async update(@Body() body: UpdatePutUserDto, @Param('id', ParseIntPipe) id: number){
        return this.userService.update(id,body);

    }
    
    @Patch(':id')
    async updatePartial(@Body() body: UpdatePatchUserDto, @Param('id', ParseIntPipe) id: number){
        return this.userService.updatePartial(id,body);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.userService.delete(id);
    }
}