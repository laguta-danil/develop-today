import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CountryModule } from './modules/counties-api/country.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), CountryModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
