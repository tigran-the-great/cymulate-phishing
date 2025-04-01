import { Controller, Get, Post, Body, Headers } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import axios from "axios";
import { JwtService } from "@nestjs/jwt";
import { PhishingAttempt } from "./schemas/phishing.schema";

@Controller("attempts")
export class PhishingController {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private attemptModel: Model<PhishingAttempt>,
    private jwtService: JwtService
  ) {}

  private validateToken(token: string) {
    try {
      return this.jwtService.verify(token.replace("Bearer ", ""));
    } catch {
      return null;
    }
  }

  @Post("send")
  async send(
    @Body() body: { email: string },
    @Headers("authorization") auth: string
  ) {
    if (!this.validateToken(auth)) return { message: "Unauthorized" };

    const user = this.validateToken(auth);

    if (!user) return { message: "Unauthorized" };

    const res: { data: { email: string; status: string } } = await axios.post(
      "http://localhost:3001/phishing/send",
      {
        email: body.email,
      }
    );

    const { email, status } = res.data;

    const attempt = new this.attemptModel({
      email,
      status,
      username: user?.username, // ← save username from JWT
    });
    await attempt.save();

    return res.data;
  }

  @Get()
  async all(@Headers("authorization") auth: string) {
    const user = this.validateToken(auth);
    if (!user) return { message: "Unauthorized" };

    return this.attemptModel
      .find({ username: user.username })
      .sort({ createdAt: -1 });
  }
}
