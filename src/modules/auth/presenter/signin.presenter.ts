import { ApiProperty } from '@nestjs/swagger';

export class SignInPresenter {
  @ApiProperty({
    description: 'Authorization token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjMsIm5hbWUiOiJHdWFkYWx1cGUgTW9ociIsInJvbGUiOnsiaWQiOjMsIm5hbWUiOiJEb2t0ZXIgUG9saSBVbXVtIiwiZGVzY3JpcHRpb24iOm51bGwsImNyZWF0ZWRBdCI6IjIwMjMtMDktMDFUMDQ6MDY6MTkuNTkwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDktMDFUMDQ6MDY6MTkuNTkwWiJ9LCJpYXQiOjE2OTM1NjY2MTIsImV4cCI6MTc5MzU3MDIxMn0.CFC5CUzXdW1SghwFVQ_mRecv0XvnySpjns6SzAlMtqk',
  })
  token: string;
}
