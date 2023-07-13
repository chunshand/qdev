import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common'

/**
 * http异常
 */
@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    // const request = ctx.getRequest()
    const status = exception.getStatus()
    const exceptionResponse = exception.getResponse()
    let r = {
      code: status,
      message: exceptionResponse?.message || exception.message,
      error: `${status >= 500 ? 'Service Error' : 'Client Error'}`,
      success: false
    }
    response.status(status).json(r)
  }
}
