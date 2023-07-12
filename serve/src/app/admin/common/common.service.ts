import { File } from '@/entity/file.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ImageSize from "image-size"
import { User } from '@/entity/user.entity';

@Injectable()
export class CommonService {
    constructor(
        @InjectRepository(File)
        private fileRepository: Repository<File>
    ) {

    }
    /**
     * 处理本地文件
     */
    async handleLocalFile(file: Express.Multer.File, userId: number) {
        // 假如是图片则 获取图片宽高
        let saveData = {
            object: "/uploads/" + file.filename,
            size: file.size,
            userId: userId,
            fileType: file.mimetype,
            width: 0,
            height: 0,
        }
        try {
            let imageSize = ImageSize(file.path)
            saveData.width = imageSize.width;
            saveData.height = imageSize.height;

        } catch (error) {
            console.log(error);
        }

        let res = await this.fileRepository.save(saveData)

        return {
            url: res.object
        }
        // fs.writeFileSync('./hah.jpg', file.buffer);
    }


    /**
     * 存储签名
     */
    handleSign() {

    }


}
