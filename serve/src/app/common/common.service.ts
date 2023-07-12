import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {

    /**
     * 处理本地文件
     */
    handleLocalFile(file: Express.Multer.File) {
        console.log(file)
    }


    /**
     * 存储签名
     */
    handleSign() {

    }


}
