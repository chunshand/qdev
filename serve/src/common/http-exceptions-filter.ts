import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()
        const status = exception.getStatus()
        const exceptionResponse = exception.getResponse()
        response.status(status).json({
            code: status,
            error: exceptionResponse?.message || exception.message,
            msg: `${status >= 500 ? 'Service Error' : 'Client Error'}`
        })
    }
}
