import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PhishingAttempt } from "./schemas/phishing.schema";

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private attemptModel: Model<PhishingAttempt>
  ) {}

  async sendEmail(email: string) {
    const attempt = new this.attemptModel({ email, status: "sent" });
    await attempt.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "exampleemali@gmail.com", // testing data update it with real one if you want to test
        pass: "applicationpassword", // testing data update it with real one if you want to test
      },
    });

    const phishingLink = `http://localhost:3001/phishing/click/${attempt._id}`;

    await transporter.sendMail({
      from: "exampleemali@gmail.com",
      to: email,
      subject: "Security Alert!",
      html: `<p>Check this out: <a href="${phishingLink}">Click Here</a></p>`,
    });

    return attempt;
  }

  async recordClick(id: string) {
    return this.attemptModel.findByIdAndUpdate(id, { status: "clicked" });
  }
}
