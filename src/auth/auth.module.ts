import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[JwtModule.register({
        secret:"ahsduah123176@#$%¨¨!ç~[ásdqwersdvoo-0qpms908901642kaosdiuincásd"
    })]

})
export class AuthModule{}