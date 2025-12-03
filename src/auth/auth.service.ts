import { Injectable, UnauthorizedException} from '@nestjs/common';
import { UsersRepository } from 'src/users/repository/users.respository';
import { BcryptHelper } from 'src/users/helpers/bcrypt.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usersRepository: UsersRepository,
        private bcrypt: BcryptHelper,
        private jwtService: JwtService,
    ) { }

    async auth(email: string, password: string) {
        const user = await this.usersRepository.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isValid = await this.bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            email: user.email
        }

        return this.jwtService.sign(payload);
    }
}
