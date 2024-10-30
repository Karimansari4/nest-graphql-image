/* import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
  // app.use('/graphql', graphqlUploadExpress({ maxFileSize: 100000, maxFiles: 10 }))
  app.use('/graphql', graphqlUploadExpress({ maxFileSize: 5 * 1024 * 1024, maxFiles: 10 }));
  await app.listen(3000);
}
bootstrap();
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { graphqlUploadExpress } from 'graphql-upload';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
  app.use(graphqlUploadExpress({ maxFileSize: 10 * 1024 * 1024, maxFiles: 10 })); // Adjust size as needed
  await app.listen(3000);
}
bootstrap();
