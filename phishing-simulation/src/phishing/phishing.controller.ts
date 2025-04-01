import { Controller, Post, Param, Get, Body, Query } from "@nestjs/common";
import { PhishingService } from "./phishing.service";

@Controller("phishing")
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Post("send")
  async send(
    @Body() body: { email: string },
    @Query() userDate: { userName: string }
  ) {
    return this.phishingService.sendEmail(body.email, userDate.userName);
  }

  @Get("click/:id")
  async click(@Param("id") id: string) {
    await this.phishingService.recordClick(id);
    return "You’ve been phished! 😈";
  }
}
