import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import config from 'src/config';

@Injectable()
export class Token {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(payload: object) {
    const access_token = await this.jwtService.signAsync(payload, {
      secret: config.ACCESS_TOKEN_KEY,
      expiresIn: config.ACCESS_TOKEN_TIME,
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: config.REFRESH_TOKEN_KEY,
      expiresIn: config.REFRESH_TOKEN_TIME,
    });

    return { access_token, refresh_token };
  }

  async verifyAccessToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: config.ACCESS_TOKEN_KEY,
    });
  }

  async verifyRefreshToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: config.REFRESH_TOKEN_KEY,
    });
  }
}
