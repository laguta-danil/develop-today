import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
    imports: [HttpModule.register({})],
    providers: [CountryService],
    controllers: [CountryController],
})
export class CountryModule {}
