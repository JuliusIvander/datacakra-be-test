import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupAuthDto } from '../auth/dto/signup-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { username },
      relations: ['role'],
    });
  }

  create(userData: SignupAuthDto): Promise<User> {
    const user = new User();
    user.name = userData.name;
    user.username = userData.username;
    user.password = bcrypt.hashSync(
      userData.password,
      parseInt(process.env.SALT),
    );
    user.roleId = userData.roleId;
    return this.userRepository.save(user);
  }
}
