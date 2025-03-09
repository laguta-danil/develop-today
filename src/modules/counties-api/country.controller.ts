import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryInfo, CountryList } from './country.types';

@Controller('country')
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    @Get('available')
    getAvailableCountries(): Promise<CountryList> {
        return this.countryService.getAvailableCountries();
    }

    @Get('info/:countryCode')
    async getCountryInfo(
        @Param('countryCode') countryCode: string,
    ): Promise<CountryInfo> {
        return this.countryService.getCountryInfo(countryCode);
    }
}
