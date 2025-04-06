import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty({ message: 'Judul tidak boleh kosong' })
  @IsString({ message: 'Judul harus berupa teks' })
  @MinLength(3, { message: 'Judul minimal 3 karakter' })
  title: string;

  @IsNotEmpty({ message: 'Konten tidak boleh kosong' })
  @IsString({ message: 'Konten harus berupa teks' })
  @MinLength(10, { message: 'Konten minimal 10 karakter' })
  content: string;

  @IsNotEmpty({ message: 'Penulis tidak boleh kosong' })
  @IsString({ message: 'Penulis harus berupa teks' })
  author: string;

  @IsBoolean({ message: 'Status publikasi harus berupa boolean' })
  isPublished: boolean;
}