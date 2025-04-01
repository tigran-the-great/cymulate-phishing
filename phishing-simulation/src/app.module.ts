import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PhishingModule } from "./phishing/phishing.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/phishing"),
    PhishingModule,
  ],
})
export class AppModule {}
