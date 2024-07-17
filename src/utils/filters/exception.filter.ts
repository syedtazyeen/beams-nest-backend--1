import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const message = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message;

    response.status(status).json({
      statusCode: status,
      message: message || 'An error occurred',
      data: null,
      timestamp: new Date().toISOString(),
    });
  }
}