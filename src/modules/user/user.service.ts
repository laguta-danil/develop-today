import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AddUserHolidaysToCalendar } from './user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly httpService: HttpService, private readonly userRepository: UserRepository) {}

    async addHolidaysToCalendar(data: AddUserHolidaysToCalendar) {
        const { userId, countryCode, year, holidays } = data;

        try {
            const AllHolidaysInTargetYear = await this.getUserHolidays(
                countryCode,
                year,
            );

            const selectedHolidays = AllHolidaysInTargetYear.filter((response) =>
                holidays.includes(response.localName),
            );

            // Needs some improvement, written simply as an example of saving to the database
            const user = await this.userRepository.getUser(userId)

            if (!user) {
                const newUser = await this.userRepository.createUser()

                selectedHolidays.map(async (holiday: any) => {
                    await this.userRepository.createUserEvents(newUser.id, holiday.date, holiday.localName)
                });
                return true
            }

            selectedHolidays.map(async (holiday: any) => {
                await this.userRepository.createUserEvents(user.id, holiday.date, holiday.localName)
            });

            return true
        }
        catch (error) {
            throw new BadRequestException(
                error.message || 'User holidays can not update',
            );
        }
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
}
