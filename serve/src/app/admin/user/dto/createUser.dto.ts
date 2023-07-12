export class CreateUserDto {
  username: string
  password: string
  admin?: boolean
  super?: boolean
}