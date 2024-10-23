import { Module } from "@nestjs/common";
import { AuthModule } from "src/modules/auth/auth.module"; 
import { LoggingModule } from "src/modules/logging/logging.module"; 
import { ConsoleLogger } from "src/modules/logging/loggers/console.logger"; 

import { IntegrationsController } from "./Integrations.controller"; 
import { IntegrationsService } from "./Integrations.service"; 
import { IntegrationsRepository } from "./Integrations.repository"; 

@Module({
  imports: [
    AuthModule, 
    LoggingModule.register(new ConsoleLogger()), 
  ],
  controllers: [IntegrationsController], 
  providers: [IntegrationsService, IntegrationsRepository], 
  exports: [IntegrationsRepository], 
})
export class IntegrationsModule {}
