import { JwtModule as _JwtModule } from "@nestjs/jwt"
export const JwtModule = _JwtModule.register({
  global: true,
  secret: "chunshand",
  signOptions: {
    expiresIn: '7d'
  }
})