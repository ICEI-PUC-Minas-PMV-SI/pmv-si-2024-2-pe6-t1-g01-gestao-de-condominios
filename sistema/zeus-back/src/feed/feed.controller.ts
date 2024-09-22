import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { FeedService } from './feed.service';
  import { CreateFeedDto } from './dtos/create-feed.dto';
  import { JwtSessionGuard } from 'src/auth/guards/jwt-auth.guard';
  import { UpdateFeedDto } from './dtos/update-feed.dto';
  import { FeedDto } from './dtos/feed.dto';
  import { Serialize } from 'src/interceptors/serialize.interceptor';
  
  @Serialize(FeedDto)
  @Controller('feed')
  export class FeedController {
    constructor(private feedService: FeedService) {}
  
    @Post()
    async create(@Body() body: CreateFeedDto) {
      return await this.feedService.create(body.number, body.block);
    }
  
    @Get()
    async findAll() {
      return await this.feedService.findAll();
    }
  
    @Get(':id')
    @UseGuards(JwtSessionGuard)
    async findOne(@Param('id') id: string) {
      return await this.feedService.findOne(+id);
    }
  
    @Get()
    @UseGuards(JwtSessionGuard)
    findByNumber(@Query('number') number: number) {
      return this.feedService.findByNumber(number);
    }
  
    @Put(':id')
    @UseGuards(JwtSessionGuard)
    update(@Param('id') id: string, @Body() body: UpdateFeedDto) {
      return this.feedService.update(+id, body);
    }
  
    @Delete(':id')
    @UseGuards(JwtSessionGuard)
    remove(@Param('id') id: string) {
      return this.feedService.remove(+id);
    }
  }
  