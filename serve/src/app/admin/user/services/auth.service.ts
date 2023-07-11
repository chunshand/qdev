import { Auth } from '@/entity/auth.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private adminAuthRepository: TreeRepository<Auth>
  ) {


  }

  /**
   * 创建
   */
  create(adminAuth: any) {
    return this.adminAuthRepository.save(adminAuth);
  }
  /**
   * 删除
   */
  /**
   * 编辑
   */
  /**
   * 获取
   */

}
