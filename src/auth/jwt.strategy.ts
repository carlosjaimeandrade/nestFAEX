import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from 'src/users/repository/users.respository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'aopskdopasdikas9dkam9dadjkmas90dkja09dka09dk09asjkd90',
    });
  }

  async validate(payload: any) {
    const userRegister = await this.usersRepository.findOne({
      email: payload.email
    })

    if (!userRegister) {
      throw new UnauthorizedException('Unauthorized');
    }
    const user = {
      id: userRegister.id,
      email: userRegister.email,
      name: userRegister.name,
    }
    return user
  }
}
