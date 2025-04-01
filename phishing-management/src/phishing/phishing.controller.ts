import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  UnauthorizedException,
} from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import axios from "axios";
import { JwtService } from "@nestjs/jwt";
import { PhishingAttempt } from "./schemas/phishing.schema";

interface JwtPayload {
  username: string;
}

interface SendResponse {
  data: { email: string; status: string };
}

@Controller("attempts")
export class PhishingController {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private attemptModel: Model<PhishingAttempt>,
    private jwtService: JwtService
  ) {}

  private getUserFromToken(authHeader: string): JwtPayload {
    try {
      const token = authHeader?.replace("Bearer ", "");
      return this.jwtService.verify<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException("Invalid or missing token");
    }
  }

  @Post("send")
  async send(
    @Body() body: { email: string },
    @Headers("authorization") auth: string
  ) {
    const user = this.getUserFromToken(auth);

    const response: SendResponse = await axios.post(
      `http://localhost:3001/phishing/send?userName=${user?.username}`,
      {
        email: body.email,
      }
    );

    return response.data;
  }

  @Get()
  async all(@Headers("authorization") auth: string) {
    const user = this.getUserFromToken(auth);

    return this.attemptModel
      .find({ username: user.username })
      .sort({ createdAt: -1 });
  }
}
