import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ArticleService, Article, ArticleSearchOptions } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // Endpoint untuk membuat artikel baru
  @Post()
  create(@Body() createArticleDto: CreateArticleDto): Article {
    return this.articleService.create(createArticleDto);
  }

  // Endpoint untuk mendapatkan semua artikel dengan filter opsional
  @Get()
  findAll(
    @Query('title') title?: string,
    @Query('author') author?: string,
    @Query('isPublished') isPublished?: boolean,
  ): Article[] {
    const options: ArticleSearchOptions = {};
    
    if (title) options.title = title;
    if (author) options.author = author;
    if (isPublished !== undefined) options.isPublished = isPublished === true;
    
    return this.articleService.findAll(options);
  }

  // Endpoint untuk mendapatkan artikel yang dipublikasi
  // PENTING: Rute spesifik harus didefinisikan sebelum rute dengan parameter
  @Get('status/published')
  findPublished(): Article[] {
    return this.articleService.findPublished();
  }

  // Endpoint untuk mendapatkan artikel berdasarkan penulis
  // PENTING: Rute spesifik harus didefinisikan sebelum rute dengan parameter
  @Get('author/:author')
  findByAuthor(@Param('author') author: string): Article[] {
    return this.articleService.findByAuthor(author);
  }

  // Endpoint untuk mendapatkan artikel berdasarkan ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Article {
    return this.articleService.findOne(id);
  }

  // Endpoint untuk mengupdate artikel
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Article {
    return this.articleService.update(id, updateArticleDto);
  }

  // Endpoint untuk menghapus artikel
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.articleService.remove(id);
  }
}
