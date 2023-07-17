import { PartialType } from '@nestjs/swagger';
import { CreateLoginLogDto } from './create-login-log.dto';

export class UpdateLoginLogDto extends PartialType(CreateLoginLogDto) {}
