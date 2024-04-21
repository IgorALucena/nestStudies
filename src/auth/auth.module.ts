import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
    imports:[JwtModule.register({
        secret:"ahsduah123176@#$%¨¨!ç~[ásdqwersdvoo-0qpms908901642kaosdiuincásd"
    }), 
    UserModule, 
    PrismaModule,
    ],
    controllers:[AuthController],
    providers:[AuthService]

})
export class AuthModule{}