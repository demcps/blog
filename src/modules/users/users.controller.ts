import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { getUser } from "src/shared/decorators/req-user.decorator";
import CheckRoleGuard from "src/shared/guards/check-roles.guard";
import { User } from "src/shared/interfaces/user.interface";
import { RoleDto } from "./dtos/role.dto";
import { UsersService } from "./users.service";
import { ResponseInterceptor } from "../../shared/interceptors/response.interceptor";
import { authGuard } from "../../shared/guards/auth.guard";

@ApiBearerAuth()
@UseInterceptors(ResponseInterceptor)
@UseGuards(authGuard(false))
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: "get profile",
  })
  @ApiTags("Current User")
  @Get("/@me")
  profile(@getUser<User>() user: User) {
    return this.usersService.getProfile(user);
  }

  @ApiOperation({
    summary: "update user role by UserId",
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiTags("Manage User")
  @Put("/role/:userId")
  @UseGuards(CheckRoleGuard(["ADMIN"]))
  updateRole(
    @Param("userId") userId: string,
    @Body() roleDto: RoleDto
  ): Promise<any> {
    return this.usersService.updateRole(Number(userId), roleDto.name);
  }
  @ApiOperation({
    summary: "Get all users",
  })
  @ApiTags("Manage User")
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll(); 
  }
  @ApiTags("Manage User")
  @Delete(":userId")
  @UseGuards(CheckRoleGuard(["ADMIN"]))
  async deleteUser(@Param("userId") userId: string): Promise<void> {
    return this.usersService.deleteUser(Number(userId));
  }
}
