import { IsArray, IsNumber, IsString } from 'class-validator';

export class AddUserHolidaysDTO {
    @IsNumber()
    year: number;

    @IsString()
    countryCode: string;

    @IsArray()
    holidays: string[];
}

export class AddUserHolidaysToCalendar extends AddUserHolidaysDTO {
    userId: number;
}
