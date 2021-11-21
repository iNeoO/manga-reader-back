import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MangaModule } from './manga/manga.module';
import { ChapterModule } from './chapter/chapter.module';
import { PageModule } from './page/page.module';
import { ChapterReadModule } from './chapterRead/chapterRead.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    MangaModule,
    ChapterModule,
    PageModule,
    ChapterReadModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
