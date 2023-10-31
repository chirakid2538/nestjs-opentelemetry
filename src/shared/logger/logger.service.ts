import { Injectable } from '@nestjs/common';
import { trace, AttributeValue } from '@opentelemetry/api';

type Attributes = Record<string, AttributeValue>;
type Event = { name: string; attributes?: Attributes };
type W = {
  spanName: string;
  events?: Event[];
  attributes?: Attributes;
};

@Injectable()
export class LoggerService {
  async w(params: W) {
    const tracer = trace.getTracer('x');
    const span = tracer.startSpan(params.spanName);

    if (params.events?.length > 0) {
      params.events.map((event) => {
        span.addEvent(event.name, event.attributes);
      });
    }

    if (Object.keys(params?.attributes ?? {}).length > 0) {
      Object.keys(params.attributes).map((attributeKey) =>
        span.setAttribute(attributeKey, params.attributes[attributeKey]),
      );
    }

    span.end();
  }
}
