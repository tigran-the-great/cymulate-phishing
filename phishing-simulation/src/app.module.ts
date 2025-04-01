import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PhishingModule } from "./phishing/phishing.module";
import * as dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    PhishingModule,
  ],
})
export class AppModule {}
