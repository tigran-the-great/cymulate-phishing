import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { PhishingModule } from "./phishing/phishing.module";
import * as dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    AuthModule,
    PhishingModule,
  ],
})
export class AppModule {}
