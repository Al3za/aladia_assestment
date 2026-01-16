/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class RpcToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const error = exception?.error || exception;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    response.status(error?.statusCode || 500).json({
      statusCode: error?.statusCode || 500,
      message: error?.message || 'Internal server error',
    });
  }
}
