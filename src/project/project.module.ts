import { Module } from "@nestjs/common";
import { AuthModule } from "src/modules/auth/auth.module"; 
import { LoggingModule } from "src/modules/logging/logging.module"; 
import { ConsoleLogger } from "src/modules/logging/loggers/console.logger"; 

import { ProjetcController } from "./project.controller"; 
import { ProjectService } from "./project.service"; 
import { ProjetcRepository } from "./Project.repository"; 

@Module({
  imports: [
    AuthModule, 
    LoggingModule.register(new ConsoleLogger()), 
  ],
  controllers: [ProjetcController], 
  providers: [ProjectService, ProjetcRepository], 
  exports: [ProjetcRepository], 
})
export class ProjectModule {}
