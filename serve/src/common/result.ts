import { ApiProperty } from '@nestjs/swagger'
export class ResultData<T> {
    constructor(code = 200, message?: string, data?: any) {
        this.code = code
        this.message = message || 'ok'
        this.data = data || null
    }
    @ApiProperty({ type: 'number', default: 200, description: "状态" })
    code: number

    @ApiProperty({ type: 'string', default: 'ok', description: "消息" })
    message: string

    @ApiProperty({ type: 'any', default: null, description: "数据" })
    data: T

    @ApiProperty({ type: 'boolean', default: false, description: "是否成功" })
    success: boolean
}