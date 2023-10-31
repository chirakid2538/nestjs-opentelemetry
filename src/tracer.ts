import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const options = {
  url: String(process.env.OTEL_EXPORTER_URL),
  // optional interceptor
  getExportRequestHeaders: () => {
    return {};
  },
};
const exporter = new ZipkinExporter(options);

export const otelSDK = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'apis',
  }),
  spanProcessor: new BatchSpanProcessor(exporter),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new NestInstrumentation(),
  ],
});

process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => console.log('[opentelemetry][info] sdk shut down successfully'),
      (err) => console.log('[opentelemetry][error] shutting down sdk', err),
    )
    .finally(() => process.exit(0));
});
