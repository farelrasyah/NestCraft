import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  @IsString({ message: 'Judul harus berupa teks' })
  @MinLength(3, { message: 'Judul minimal 3 karakter' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Konten harus berupa teks' })
  @MinLength(10, { message: 'Konten minimal 10 karakter' })
  content?: string;

  @IsOptional()
  @IsString({ message: 'Penulis harus berupa teks' })
  author?: string;

  @IsOptional()
  @IsBoolean({ message: 'Status publikasi harus berupa boolean' })
  isPublished?: boolean;
}