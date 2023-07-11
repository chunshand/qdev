import { ApiProperty } from '@nestjs/swagger'
export class ResultData<T> {
    constructor(code = 200, message?: string, data?: any) {
        this.code = code
        this.message = message || 'ok'
        this.data = data || null
    }
    @ApiProperty({ type: 'number', default: 200 })
    code: number

    @ApiProperty({ type: 'string', default: 'ok' })
    message: string

    @ApiProperty({ type: 'any', default: null })
    data: T
}