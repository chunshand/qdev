import { IsString, MinLength, MaxLength, IsOptional } from "class-validator"

export class CreateUserDto {
  @IsString()
  @MinLength(5, { message: "密码格式错误" })
  @MaxLength(25, { message: "密码格式错误" })
  username: string
  @IsOptional()
  @MinLength(5, { message: "密码格式错误" })
  @MaxLength(25, { message: "密码格式错误" })
  password: string
  admin?: boolean
  super?: boolean
}
