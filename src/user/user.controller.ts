import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { get } from "http";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController{

    constructor(private userService: UserService){}

    @Roles(Role.Admin)
    @UseInterceptors(LogInterceptor)
    @Post()
    async create(@Body() body: CreateUserDto){
        return await this.userService.create(body);    
    }

    @Roles(Role.Admin)
    @Get()
    async read(){
        return this.userService.list();
    }

    @Roles(Role.Admin)
    @Get(':id')
    async readOne(@ParamId() id: number){ // com decorator param customizado
        return this.userService.show(id);
    }

    @Roles(Role.Admin)
    @Put(':id')
    async update(@Body() body: UpdatePutUserDto, @Param('id', ParseIntPipe) id: number){
        return this.userService.update(id,body);

    }
    
    @Roles(Role.Admin)
    @Patch(':id')
    async updatePartial(@Body() body: UpdatePatchUserDto, @Param('id', ParseIntPipe) id: number){
        return this.userService.updatePartial(id,body);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.userService.delete(id);
    }
}