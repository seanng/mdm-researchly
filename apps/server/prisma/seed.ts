import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'a@a.com',
    // password is asdfasdf
    password: '$2b$08$KYHGJA48j4RW2Liy.gtNoOy21m0xVoWikkC89WMaIMPAGDNVURni2',
  },
  {
    email: 'b@b.com',
    // password is asdfasdf
    password: '$2b$08$KYHGJA48j4RW2Liy.gtNoOy21m0xVoWikkC89WMaIMPAGDNVURni2',
  },
  {
    email: 'c@c.com',
    // password is asdfasdf
    password: '$2b$08$KYHGJA48j4RW2Liy.gtNoOy21m0xVoWikkC89WMaIMPAGDNVURni2',
  },
  {
    email: 'd@d.com',
    // password is asdfasdf
    password: '$2b$08$KYHGJA48j4RW2Liy.gtNoOy21m0xVoWikkC89WMaIMPAGDNVURni2',
  },
  {
    email: 'e@e.com',
    // password is asdfasdf
    password: '$2b$08$KYHGJA48j4RW2Liy.gtNoOy21m0xVoWikkC89WMaIMPAGDNVURni2',
  },
  {
    email: 'f@f.com',
    // password is asdfasdf
    password: '$2b$08$KYHGJA48j4RW2Liy.gtNoOy21m0xVoWikkC89WMaIMPAGDNVURni2',
  },
  {
    email: 'john_smith@gmail.com',
    // password is asdfasdf
    password: '$2b$08$KYHGJA48j4RW2Liy.gtNoOy21m0xVoWikkC89WMaIMPAGDNVURni2',
  },
];

async function dropCollections() {
  await prisma.user.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.link.deleteMany();
  await prisma.usersOnCollections.deleteMany();
}

async function main() {
  console.log(`Dropping Collections ...`);
  await dropCollections();
  console.log(`Start seeding ...`);

  for (const u of userData) {
    const user = await prisma.user.create({
      data: {
        ...u,
        collections: {
          create: [
            {
              role: 'ADMIN',
              collection: {
                create: {
                  name: `${u.email}'s collection`,
                },
              },
            },
            {
              role: 'ADMIN',
              collection: {
                create: {
                  name: `${u.email}'s 2nd collection`,
                },
              },
            },
          ],
        },
      },
    });

    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
