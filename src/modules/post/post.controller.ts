import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";

import { getUser } from "src/shared/decorators/req-user.decorator";
import CheckRoleGuard from "src/shared/guards/check-roles.guard";
import { CreatePostDto } from "./dtos/createPost.dto";
import { searchPostDto } from "./dtos/search.dto";
import { UpdatePostDto } from "./dtos/updatePost.dto";

import { PostService } from "./post.service";
import { ResponseInterceptor } from "../../shared/interceptors/response.interceptor";
import { authGuard } from "../../shared/guards/auth.guard";
import * as process from "process";
const wit = () => new Promise((res) => setTimeout(res, 3000));
@ApiTags("Post")
@UseInterceptors(ResponseInterceptor)
@Controller("posts")
export class PostController {
  constructor(private postService: PostService) {}

  @ApiOperation({
    summary: "get public Posts",
  })
  @ApiQuery({ name: "title", required: false })
  @ApiQuery({ name: "content", required: false })
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "limit", required: false })
  @Get()
  async getPublicPosts(@Query() query: searchPostDto) {
    try {
      await wit();  
      return await this.postService.getPublicPosts(query);
    } catch (error) {
      console.error('Error al obtener los posts públicos:', error);
      throw new InternalServerErrorException('No se pudieron obtener los posts públicos');
    }
  }
  
  @ApiOperation({ summary: "get post by Id" })
  @ApiParam({ name: "id", required: true })
  @Get("/:id")
  async getPost(@Param("id") id: string) {
    return this.postService.singlePost(Number(id));
  }

  @ApiOperation({
    summary: "create post",
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiBearerAuth()
  @Post("/")
  @UseGuards(CheckRoleGuard(["ADMIN", "MANAGE_POSTS"]))
  @UseGuards(authGuard(false))
  async createPost(
    @getUser("id") userId: number,
    @Body() createPostDto: CreatePostDto
  ) {
    return this.postService.create(3, createPostDto);
  }

  @ApiOperation({
    summary: "update post by Id",
    description: `Required Permission: 'ADMIN'`,
  })
  @ApiBearerAuth()
  @Patch(":id")
  @UseGuards(CheckRoleGuard(["ADMIN", "MANAGE_POSTS"]))
  @UseGuards(authGuard(false))
  async updatePost(
    @getUser("id") userId: number,
    @Param("id") id: string,
    @Body() createPostDto: UpdatePostDto
  ) {
    return this.postService.update(userId, Number(id), createPostDto);
  }

  @ApiOperation({
    summary: "delete post by Id",
    description: `Required Permission: 'ADMIN'`,
  })
  @Delete(":id")
  @ApiBearerAuth()
  @UseGuards(CheckRoleGuard(["ADMIN", "MANAGE_POSTS"]))
  @UseGuards(authGuard(false))
  async deletePost(@getUser("id") userId: number, @Param("id") id: string) {
    return this.postService.delete(userId, Number(id));
  }
}
