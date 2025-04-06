import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Mengaktifkan validasi global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Menghapus properti yang tidak terdefinisi dalam DTO
    forbidNonWhitelisted: true, // Menolak request dengan properti yang tidak terdefinisi
    transform: true, // Mengubah tipe data input secara otomatis
  }));
  
  // Mengaktifkan CORS
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
