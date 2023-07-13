import { File } from '@/entity/file.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ImageSize from "image-size"

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

    } catch (error) {
      console.log(error);
    }

    let res = await this.fileRepository.save(saveData)

    return {
      url: res.object,
      id: res.id
    }
    // fs.writeFileSync('./hah.jpg', file.buffer);
  }


  /**
   * 存储签名
   */
  handleSign() {

  }

  /**
   * 获取文件信息
   */
  async getFileInfo(id: number) {
    let res: any = await this.fileRepository.findOne({
      where: {
        id
      }
    })
    // 根据文件类型 改造文件信息
    res.url = this.handleGetFileUrl(res);
    return res;
  }

  handleGetFileUrl(fileData: any): string {
    let url: string = "";
    if (fileData.type == 'local') {
      url = fileData.object
    }
    return url;
  }


}
