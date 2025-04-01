import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";

async function bootstrap() {
  dotenv.config(); // Load env vars
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001); // separate port
}

bootstrap();
