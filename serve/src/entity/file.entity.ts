import { Column, Entity } from "typeorm";
import { Base } from "./base";

export enum FileType {
    // 本地
    LOCAL = "local",
    // 阿里云对象存储
    OSS = "oss",
    // 腾讯云对象存储
    COS = "cos"
}
/**
 * 文件表
 */
@Entity()
export class File extends Base {

    @Column({
        comment: "文件key"
    })
    key: string;

    @Column({
        comment: "类型",
        type: "enum",
        enum: FileType,
        default: FileType.LOCAL
    })
    type: FileType;

    @Column({
        comment: "文件类型",
        default: ""
    })
    fileType: string;

    @Column({
        comment: "图片宽",
        default: 0
    })
    width: number;

    @Column({
        comment: "图片高",
        default: 0
    })
    height: number;

    @Column({
        comment: "文件大小",
        default: 0
    })
    size: number;


    @Column({
        comment: "标签"
    })
    tag: string;


    @Column({
        comment: "备注"
    })
    mark: string;
}