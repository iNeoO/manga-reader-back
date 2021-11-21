import { User as UserModel } from '@prisma/client';

export type UserWIthoutPassword = Omit<UserModel, 'password'>;