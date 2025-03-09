import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { PrismaModule } from "src/infrastructure/prisma.module";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

@Module({
    imports: [HttpModule.register({}), PrismaModule],
    providers: [UserService, UserRepository],
    controllers: [UserController],
})
export class UserModule {}