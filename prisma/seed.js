// import { PrismaClient, Role, Difficulty } from '@prisma/client'

const { PrismaClient, Role, Difficulty } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  await prisma.user.create({
    data: {
      email: 'admin@codesphere.dev',
      password: 'dev-only-placeholder',
      role: Role.ADMIN,
      name: 'Admin User',
    },
  })

  await prisma.problem.create({
    data: {
      title: 'Two Sum',
      statement: 'Return indices of the two numbers such that they add up to target.',
      difficulty: Difficulty.EASY,
      testCases: {
        create: [
          { input: '[2,7,11,15],9', output: '[0,1]' },
          { input: '[3,2,4],6', output: '[1,2]' },
        ],
      },
    },
  })

  console.log('✅ Seed completed')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
