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

export enum FileState {
    // 默认状态
    Default = "default",
    // 上传中
    UPING = "uping",
    // 上传完毕
    UPDONE = "updone",
    // 上传报错
    UPERROR = 'uperror'
}


export enum Status {
    // 默认状态
    Default = "default",
    // 永久存储
    LONGTERM = "longterm",
    // 短期存储
    SHORTTERM = "shortterm",
}

/**
 * 文件表
 */
@Entity()
export class File extends Base {

    @Column({
        comment: "文件object"
    })
    object: string;

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

    // ---------------------------------------------- image
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

    // 暂时不使用
    @Column({
        comment: "缩略图",
        default: ""
    })
    thumbnail: string;
    // ---------------------------------------------- image end

    @Column({
        comment: "文件大小",
        default: 0
    })
    size: number;

    @Column({
        comment: "文件状态",
        enum: FileState,
        default: FileState.Default
    })
    fileState: FileState;

    @Column({
        comment: "文件md5",
    })
    fileMd5: string;


    @Column({
        comment: "状态",
        default: Status.Default,
        enum: Status
    })
    status: Status;

    @Column({
        comment: '过期时间，只作用于短期',
        default: Date.now
    })
    ExpirationTime: Date;

    // --------------------------------------------------------------- 以下为
    @Column({
        comment: "标签"
    })
    tag: string;


    @Column({
        comment: "备注"
    })
    mark: string;
}