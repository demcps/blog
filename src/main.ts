import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { Configs } from "./configuration";

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
  });
  const configService: ConfigService<Configs> = new ConfigService();
  const port = configService.get<number>("PORT") || 3000;

  await app.listen(port);
  console.log(`Server running on ${port}`);
})();
