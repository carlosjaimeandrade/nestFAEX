import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post()
    async auth(@Body() body: AuthDto) {
        const token = await this.authService.auth(body.email, body.password)

        return {
            token,
            expiresIn: '1d'
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async me(@Req() req: any) {
        return {
            user: req.user
        }
    }
}
