import { Repository } from "typeorm";
import { RatingEntity } from "../entity/rating.entity";

export type RatingRepository = Repository<RatingEntity>