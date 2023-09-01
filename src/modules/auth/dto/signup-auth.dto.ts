import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class SignupAuthDto {
  @ApiProperty({
    description: 'user full name',
    example: 'Udil surmemew',
  })
  @IsNotEmpty()
  @MaxLength(32)
  name: string;

  @ApiProperty({
    description: 'user username',
    example: 'udil123',
  })
  @IsNotEmpty()
  @MaxLength(32)
  username: string;

  @ApiProperty({
    description: 'user password',
    example: '12345',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'user role that can be obtain from role table',
    example: 1,
  })
  @IsNotEmpty()
  roleId: number;
}
