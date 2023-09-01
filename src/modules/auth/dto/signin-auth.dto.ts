import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SigninAuthDto {
  @ApiProperty({
    description: "User's username that has been registered",
    example: 'mr_t1t5',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: "User's credential in order to access the api",
    example: 'randompassword',
  })
  @IsNotEmpty()
  password: string;
}
