import { File } from '@/entity/file.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ImageSize from "image-size"

/**
 * 文件存儲 Service
 */
@Injectable()
export class FileService {
    constructor(
        @InjectRepository(File)
        private fileRepository: Repository<File>
    ) {

    }
    // --------------------------------------------------------------------------------------------- 存储处理
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

        } catch (_) {

        }

        let res = await this.fileRepository.save(saveData)

        return {
            object: res.object,
            id: res.id,
        }
    }


    /**
     * 存储签名
     */
    handleSign() {

    }

    /**
     * 获取文件信息 带有url
     */
    async getFileInfo(id: number) {
        return this.fileRepository.findOne({
            where: {
                id
            }
        })
    }

    // --------------------------------------------------------------------------------------------- 存储处理


}
