import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingEntity } from 'src/core/entity/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { catchError, successRes } from 'src/infrastructure/response';
import { RatingRepository } from 'src/core/repository/rating.repository';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepo: RatingRepository,
  ) {}

  async create(createRatingDto: CreateRatingDto) {
    try {
      const rating = this.ratingRepo.create(createRatingDto);
      await this.ratingRepo.save(rating);

      return successRes(rating, 201);
    } catch (error) {
      return catchError(error);
    }
  }

  async findAll() {
    try {
      const ratings = await this.ratingRepo.find();
      return successRes(ratings);
    } catch (error) {
      return catchError(error);
    }
  }

  async findOne(id: string) {
    try {
      const rating = await this.ratingRepo.findOne({ where: { id } });
      if (!rating) {
        throw new NotFoundException('Rating not found!');
      }
      return successRes(rating);
    } catch (error) {
      return catchError(error);
    }
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    try {
      const rating = await this.ratingRepo.findOne({ where: { id } });
      if (!rating) {
        throw new NotFoundException('Rating not found!');
      }

      await this.ratingRepo.update(id, updateRatingDto);
      const updatedRating = await this.ratingRepo.findOne({ where: { id } });

      return successRes(updatedRating);
    } catch (error) {
      return catchError(error);
    }
  }

  async remove(id: string) {
    try {
      const rating = await this.ratingRepo.findOne({ where: { id } });
      if (!rating) {
        throw new NotFoundException('Rating not found!');
      }

      await this.ratingRepo.delete({ id });
      return successRes({});
    } catch (error) {
      return catchError(error);
    }
  }
}
