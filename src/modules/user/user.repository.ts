import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma.service';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(): Promise<User> {
        return this.prisma.user.create({});
    }

    async getUser(userId: number): Promise<User> {
        return this.prisma.user.findFirst({ where: { id: Number(userId) } })
    }

    async createUserEvents(userId: number, eventDate: string, eventName: string): Promise<void> {
        await this.prisma.events.create({ data: { userId: userId, eventDate: eventDate, name: eventName } })
    }
}
