import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feed } from '../entities/feed.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed) private repo: Repository<Feed>,
  ) {}

  // create(number: number, block?: string) {
  //   const feed = this.repo.create({
  //     number,
  //     block: block ?? null,
  //   });

  //   return this.repo.save(feed);
  // }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const feed = await this.repo.findOne({
      where: { id },
    });

    if (!feed) {
      throw new NotFoundException('Feed não encontrado.');
    }

    return feed;
  }

  // findByNumber(number: number) {
  //   return this.repo.find({ where: { number } });
  // }

  async update(id: number, attrs: Partial<Feed>) {
    const feed = await this.findOne(id);
    if (!feed) {
      throw new NotFoundException('Feed de notícia não encontrado.');
    }
    Object.assign(feed, attrs);
    return this.repo.save(feed);
  }

  async remove(id: number) {
    const feed = await this.findOne(id);
    if (!feed) {
      throw new NotFoundException('Apartamento não encontrado.');
    }
    return this.repo.remove(feed);
  }
}
