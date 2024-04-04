import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  success: boolean;
  error: null;
  timestamps: Date;
  statusCode: number;
  path: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const now = Date.now();
    console.log(`Start send the response...`);
    
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();
    const statusCode: number = response.statusCode;
    const path: string = request.url;

    return next.handle().pipe(
      map((data: T) => ({
        success: true,
        data,
        timestamps: new Date(),
        statusCode,
        path,
        error: null,
      })),
      tap(() => {
        console.log(
          `End send the response. Time taken: ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
