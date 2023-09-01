import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInPresenter } from './presenter/signin.presenter';
import { signUpPresenter } from './presenter/signup-presenter';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Response when user is given authorization',
    type: SignInPresenter,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SigninAuthDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @ApiCreatedResponse({
    description: 'Response when user is registered',
    type: signUpPresenter,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() signUpDto: SignupAuthDto) {
    return this.authService.signUp(signUpDto);
  }
}
