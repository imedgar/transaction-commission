import { Module } from "@nestjs/common";
import { CommissionsService } from "./commissions.service";
import { HttpModule } from "@nestjs/axios";
import { CommonModule } from "../common/common.module";

@Module({
  providers: [CommissionsService],
  exports: [CommissionsService],
  imports: [HttpModule, CommonModule],
})
export class CommissionsModule {}
