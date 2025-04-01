import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class PhishingAttempt extends Document {
  @Prop()
  email: string;

  @Prop()
  status: string;

  @Prop()
  username: string;
}

export const PhishingSchema = SchemaFactory.createForClass(PhishingAttempt);
