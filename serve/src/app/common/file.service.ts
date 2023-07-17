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
        console.log(file);
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
            url: res.object,
            id: res.id
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
        let res: any = await this.fileRepository.findOne({
            where: {
                id
            }
        })
        if(!res){
            return null;
        }
        // 根据文件类型 改造文件信息
        res.url = this.handleGetFileUrl(res);
        return res;
    }

    /**
       * 获取文件url
       */
    async getFileUrl(id: number) {
        let res: any = await this.fileRepository.findOne({
            where: {
                id
            },
            select: {
                object: true,
                id: true,
                type: true
            },
        })
        // 根据文件类型 改造文件信息
        return this.handleGetFileUrl(res);
    }

    handleGetFileUrl(fileData: any): string {
        let url: string = "";
        if (fileData.type == 'local') {
            url = fileData.object
        }
        return url;
    }
    // --------------------------------------------------------------------------------------------- 存储处理


}
