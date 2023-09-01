import { ApiProperty } from '@nestjs/swagger';

export class signUpPresenter {
  @ApiProperty({
    description: 'message',
    example: 'User has been created!',
  })
  message: string;
}
