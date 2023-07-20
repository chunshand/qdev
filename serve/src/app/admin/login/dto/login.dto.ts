import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: '账号',
    type: String
  })
  @IsString({ message: "请输入账号" })
  @MinLength(5, { message: "账号格式错误" })
  @MaxLength(25, { message: "密码格式错误" })
  username: string;

  @ApiProperty({
    description: '密码',
    type: String
  })
  @IsString({ message: "请输入密码" })
  @MinLength(5, { message: "密码格式错误" })
  @MaxLength(25, { message: "密码格式错误" })
  password: string;

  @IsString({ message: "请输入验证码" })
  code: string
}
