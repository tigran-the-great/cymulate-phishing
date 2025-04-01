/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from "@nestjs/common";
import nodemailer from "nodemailer";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PhishingAttempt } from "./schemas/phishing.schema";

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private attemptModel: Model<PhishingAttempt>
  ) {}

  async sendEmail(email: string, userName: string) {
    try {
      const attempt = await this.attemptModel.insertOne({
        email,
        status: "sent",
        username: userName,
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const phishingLink = `http://localhost:3001/phishing/click/${attempt.id}`;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Security Alert!",
        html: `<p>Check this out: <a href="${phishingLink}">Click Here</a></p>`,
      });

      return attempt;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("SendMail Error:", err.message);
      } else {
        console.error("Unknown error sending email");
      }
    }
  }

  async recordClick(id: string) {
    try {
      const attempt = await this.attemptModel.findByIdAndUpdate(id, {
        status: "clicked",
      });
      return attempt;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("recordClick Error:", error.message);
      } else {
        console.error("Unknown error sending email");
      }
    }
  }
}
