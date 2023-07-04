import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: '账号',
    type: String
  })
  username: string;

  @ApiProperty({
    description: '密码',
    type: String
  })
  password: string;
}