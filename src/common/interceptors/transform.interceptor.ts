import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { trace } from '@opentelemetry/api';


export interface Response<T> {
	data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
		const span = trace.getActiveSpan();
		const traceId = span.spanContext().traceId;
		return next.handle().pipe(map(data => ({ data, traceId })));
	}
}
