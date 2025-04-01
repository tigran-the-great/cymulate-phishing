import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User, UserSchema } from "./schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: "secret123", // test secret
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
