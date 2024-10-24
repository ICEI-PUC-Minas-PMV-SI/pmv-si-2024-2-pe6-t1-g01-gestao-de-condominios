import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dtos/create-feed.dto';
import { JwtSessionGuard } from 'src/auth/guards/jwt-auth.guard';
import { FeedDto } from './dtos/feed.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UpdateFeedDto } from './dtos/update-feed.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/entities/user.entity';
import { Request } from 'express';

@Serialize(FeedDto)
@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Post()
  @UseGuards(JwtSessionGuard)
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } }))
  async create(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body() body: CreateFeedDto,
    @Req() req: Request
  ) {
    const currentUser = req.user as User;

    return await this.feedService.create(body, file, currentUser);
  }

  @Get()
  @UseGuards(JwtSessionGuard)
  async findAll() {
    return await this.feedService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtSessionGuard)
  async findOne(@Param('id') id: string) {
    return await this.feedService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtSessionGuard)
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body() body: UpdateFeedDto,
    @Req() req: Request
  ) {
    const currentUser = req.user as User;

    return this.feedService.update(+id, body, file, currentUser);
  }

  @Delete(':id')
  @UseGuards(JwtSessionGuard)
  remove(@Param('id') id: string) {
    return this.feedService.remove(+id);
  }
}
  