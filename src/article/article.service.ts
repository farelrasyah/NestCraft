import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

// Interface untuk tipe data Article
export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  isPublished: boolean;
  createdAt: Date;
}

// Interface untuk opsi pencarian artikel
export interface ArticleSearchOptions {
  title?: string;
  author?: string;
  isPublished?: boolean;
}

@Injectable()
export class ArticleService implements OnModuleInit {
  // Array untuk menyimpan artikel (simulasi database)
  private articles: Article[] = [];
  private idCounter = 1;

  // Metode yang akan dijalankan saat modul diinisialisasi
  onModuleInit() {
    // Menambahkan beberapa artikel contoh
    this.addSampleArticles();
  }

  // Metode untuk menambahkan artikel contoh
  private addSampleArticles() {
    const sampleArticles: CreateArticleDto[] = [
      {
        title: 'Memulai dengan NestJS',
        content: 'NestJS adalah framework Node.js yang progresif untuk membangun aplikasi server-side yang efisien, andal, dan dapat diskalakan.',
        author: 'Farel Rasyah',
        isPublished: true
      },
      {
        title: 'Membuat REST API dengan NestJS',
        content: 'Tutorial lengkap tentang cara membuat RESTful API menggunakan NestJS dengan penjelasan step-by-step untuk pemula.',
        author: 'Farel Rasyah',
        isPublished: true
      },
      {
        title: 'Validasi Data dengan Class Validator',
        content: 'Menjelaskan cara menggunakan class-validator untuk memvalidasi input data pada aplikasi NestJS Anda.',
        author: 'NestJS Team',
        isPublished: false
      }
    ];

    // Tambahkan artikel contoh ke array articles
    sampleArticles.forEach(article => this.create(article));
    
    console.log(`${sampleArticles.length} artikel contoh telah ditambahkan`);
  }

  // Membuat artikel baru
  create(createArticleDto: CreateArticleDto): Article {
    const newArticle = {
      id: this.idCounter++,
      ...createArticleDto,
      createdAt: new Date(),
    };
    this.articles.push(newArticle);
    return newArticle;
  }

  // Mendapatkan semua artikel dengan opsi pencarian dan pengurutan
  findAll(options?: ArticleSearchOptions): Article[] {
    let filteredArticles = [...this.articles];
    
    // Filter berdasarkan opsi pencarian
    if (options) {
      if (options.title) {
        filteredArticles = filteredArticles.filter(article => 
          article.title.toLowerCase().includes(options.title!.toLowerCase())
        );
      }
      
      if (options.author) {
        filteredArticles = filteredArticles.filter(article => 
          article.author.toLowerCase().includes(options.author!.toLowerCase())
        );
      }
      
      if (options.isPublished !== undefined) {
        filteredArticles = filteredArticles.filter(article => 
          article.isPublished === options.isPublished
        );
      }
    }
    
    // Urutkan artikel dari yang terbaru
    return filteredArticles.sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  // Mendapatkan artikel berdasarkan ID
  findOne(id: number): Article {
    const article = this.articles.find(article => article.id === id);
    if (!article) {
      throw new NotFoundException(`Artikel dengan ID ${id} tidak ditemukan`);
    }
    return article;
  }

  // Mengupdate artikel
  update(id: number, updateArticleDto: UpdateArticleDto): Article {
    const articleIndex = this.articles.findIndex(article => article.id === id);
    if (articleIndex === -1) {
      throw new NotFoundException(`Artikel dengan ID ${id} tidak ditemukan`);
    }

    // Update artikel dengan mempertahankan properti yang tidak diubah
    this.articles[articleIndex] = {
      ...this.articles[articleIndex],
      ...updateArticleDto,
    };

    return this.articles[articleIndex];
  }

  // Menghapus artikel
  remove(id: number): void {
    const articleIndex = this.articles.findIndex(article => article.id === id);
    if (articleIndex === -1) {
      throw new NotFoundException(`Artikel dengan ID ${id} tidak ditemukan`);
    }
    this.articles.splice(articleIndex, 1);
  }
  
  // Mendapatkan artikel berdasarkan penulis
  findByAuthor(author: string): Article[] {
    return this.findAll({ author });
  }
  
  // Mendapatkan artikel yang sudah dipublikasi
  findPublished(): Article[] {
    return this.findAll({ isPublished: true });
  }
}