import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PhishingController } from "./phishing.controller";
import { PhishingAttempt, PhishingSchema } from "./schemas/phishing.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingSchema },
    ]),
    JwtModule.register({ secret: "secret123" }),
  ],
  controllers: [PhishingController],
})
export class PhishingModule {}
