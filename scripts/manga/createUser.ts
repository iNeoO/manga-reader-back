import { prompt } from 'enquirer';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export default async () => {
  const schema = [
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?',
    },
    {
      type: 'input',
      name: 'username',
      message: 'What is your username?',
    },
    {
      type: 'password',
      name: 'password',
      message: 'What is your password?',
    },
  ];

  const prisma = new PrismaClient();

  async function main() {
    const {
      email,
      username,
      password,
    }: { email: string; username: string; password: string } = await prompt(
      schema,
    );

    const saltOrRounds = +process.env.SALT_ROUNDS;
    const hash = await bcrypt.hash(password, saltOrRounds);
    await prisma.user.create({
      data: { email, username, password: hash },
    });
  }

  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
