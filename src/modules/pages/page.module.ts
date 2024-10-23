import { Module } from "@nestjs/common";
import { AuthModule } from "src/modules/auth/auth.module"; 
import { LoggingModule } from "src/modules/logging/logging.module"; 
import { ConsoleLogger } from "src/modules/logging/loggers/console.logger"; 

import { PagesController } from "./pages.controller"; 
import { PageService } from "./pages.service"; 
import { PageRepository } from "./Page.repository"; 

@Module({
  imports: [
    AuthModule, 
    LoggingModule.register(new ConsoleLogger()), 
  ],
  controllers: [PagesController], 
  providers: [PageService, PageRepository], 
  exports: [PageRepository], 
})
export class PageModule {}
