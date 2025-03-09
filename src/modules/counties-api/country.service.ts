import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CountryBorderInfo, CountryInfo, CountryList } from './country.types';

@Injectable()
export class CountryService {
    constructor(private readonly httpService: HttpService) {}

    async getAvailableCountries(): Promise<CountryList> {
        try {
            const countries = await this.httpService.axiosRef.get(
                '${process.env.NAGER_API_URL}v3/AvailableCountries',
            );

            return countries.data;
        } catch (error) {
            throw new BadRequestException(error.message || 'Getting countries error');
        }
    }

    async getCountryInfo(countryCode: string): Promise<CountryInfo> {
        try {
            const [countryMainInfo, countriesPopulationList, countriesFlagList] =
                await Promise.all([
                    this.countryMainInfo(countryCode),
                    this.getCountriesPopulationList(),
                    this.getCountriesFlagList(),
                ]);

            const officialName = countryMainInfo.officialName;
            const countriesPopulationListData = countriesPopulationList.data;

            const countryInfoResult = countriesPopulationListData.reduce(
                (result, country) => {
                    if (country.country === officialName) {
                        result.countryPopulationInfo.push(...country.populationCounts);
                    }

                    return result;
                },
                {
                    countryName: officialName,
                    countryBorderInfo: countryMainInfo.borders,
                    countryPopulationInfo: [],
                    flagImg: '',
                },
            );

            const filteredFlags = countriesFlagList.data.filter(
                (country) => country.name === officialName,
            );
            countryInfoResult.flagImg =
                filteredFlags.length > 0 ? filteredFlags[0].flag : '';

            return countryInfoResult;
        } catch (error) {
            throw new BadRequestException(
                error.message ||
                `Getting country info error or country cod doesn't exist`,
            );
        }
    }

    async addHolidaysToCalendar({
        userId,
        countryCode,
        year,
    }: {
        userId: number;
        countryCode: string;
        year: number;
    }) {
        const holidays = await this.getUserHolidays(countryCode, year);

        holidays.map((response) => {
            const filteredHolidays = response.filter((holiday: any) =>
                holidays.length ? holidays.includes(holiday.localName) : true,
            );

            // Пример сохранения праздников в "базу данных"
            const savedHolidays = filteredHolidays.map((holiday: any) => ({
                userId,
                date: holiday.date,
                name: holiday.localName,
            }));

            return { userId, holidays: savedHolidays };
        });
    }

    private async getUserHolidays(countryCode: string, year: number) {
        try {
            const holidays = await this.httpService.axiosRef.get(
                `${process.env.NAGER_API_URL}v3/PublicHolidays/${year}/${countryCode}`,
            );

            return holidays.data;
        } catch (error) {
            throw new BadRequestException(
                error.message || 'Getting country holidays error',
            );
        }
    }

    private async countryMainInfo(
        countryCode: string,
    ): Promise<CountryBorderInfo> {
        try {
            const countryInfo = await this.httpService.axiosRef.get(
                `${process.env.NAGER_API_URL}v3/CountryInfo/${countryCode}`,
            );

            return countryInfo.data;
        } catch (error) {
            throw new BadRequestException(
                error.message || 'Getting country borders error',
            );
        }
    }

    private async getCountriesPopulationList() {
        try {
            const countryInfo = await this.httpService.axiosRef.get(
                `${process.env.NAGER_API_URL}v0.1/countries/population`,
            );

            return countryInfo.data;
        } catch (error) {
            throw new BadRequestException(
                error.message || 'Getting country population error',
            );
        }
    }

    private async getCountriesFlagList() {
        try {
            const countryInfo = await this.httpService.axiosRef.get(
                `${process.env.NAGER_API_URL}v0.1/countries/flag/images`,
            );

            return countryInfo.data;
        } catch (error) {
            throw new BadRequestException(
                error.message || 'Getting country population error',
            );
        }
    }
}
