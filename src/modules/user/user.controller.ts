import { Body, Controller, Param, Post } from "@nestjs/common";
import { AddUserHolidaysDTO } from "./user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/:userId/calendar/holidays')
    addHolidaysToCalendar(
        @Param('userId') userId: number,
        @Body() body: AddUserHolidaysDTO
    ) {
        return this.userService.addHolidaysToCalendar({ userId, ...body });
    }

}