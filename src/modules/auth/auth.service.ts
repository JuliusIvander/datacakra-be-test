import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupAuthDto } from './dto/signup-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    const isUserAuthorized = await bcrypt.compare(password, user?.password);
    if (!isUserAuthorized) {
      throw new UnauthorizedException();
    }

    const payload = { _id: user.id, name: user.name, role: user.role };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(userData: SignupAuthDto): Promise<any> {
    await this.userService.create(userData);
    return {
      message: 'User has been created!',
    };
  }
}
