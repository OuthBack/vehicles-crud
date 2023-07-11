import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VehiclesModule } from './modules/vehicles/vehicles.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Vehicles API')
    .setDescription('The vehicles API description')
    .setVersion('1.0')
    .addTag('vehicles')
    .build();

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  });
  app.setGlobalPrefix('api');

  const vehicleDocument = SwaggerModule.createDocument(app, options, {
    include: [VehiclesModule],
  });

  SwaggerModule.setup('', app, vehicleDocument);

  await app.listen(3000);
}
bootstrap();
