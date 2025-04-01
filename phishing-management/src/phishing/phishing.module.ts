import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PhishingController } from "./phishing.controller";
import { PhishingAttempt, PhishingSchema } from "./schemas/phishing.schema";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingSchema },
    ]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [PhishingController],
})
export class PhishingModule {}
