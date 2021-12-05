import { PrismaClient } from '@prisma/client';
// import { MultiSelect } from 'enquirer';
// TODO, MultiSelect not typed, atm

const prisma = new PrismaClient();

const main = async () => {
  // const mangas = await prisma.manga.findMany();
  // const prompt = new MultiSelect({
  //   name: 'value',
  //   message: 'Pick manga to delete',
  //   choices: mangas.map((manga) => ({
  //     name: manga.name,
  //     value: manga.id,
  //   })),
  //   result(names) {
  //     console.log(names);
  //     console.log(this.map(names));
  //     return this.map(names);
  //   },
  // });
  // const answer = await prompt.run();
  // console.log(answer);
};

export default () => {
  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
