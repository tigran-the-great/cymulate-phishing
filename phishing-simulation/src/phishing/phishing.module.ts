import { Module } from "@nestjs/common";
import { PhishingService } from "./phishing.service";
import { PhishingController } from "./phishing.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { PhishingAttempt, PhishingSchema } from "./schemas/phishing.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingSchema },
    ]),
  ],
  providers: [PhishingService],
  controllers: [PhishingController],
})
export class PhishingModule {}
