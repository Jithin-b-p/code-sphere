/* eslint-disable no-console */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  const admin = await prisma.user.upsert({
    where: { email: 'admin@codesphere.dev' },
    update: {},
    create: {
      email: 'admin@codesphere.dev',
      password: '$2b$12$replace_with_real_hash',
      role: 'ADMIN',
      name: 'Admin User',
    },
  })

  console.log('✅ Admin user ready')

  const problems = [
    {
      title: 'Two Sum',
      slug: 'two-sum',
      description: 'Given an array of integers, return indices of two numbers such that they add up to a specific target.',
      difficulty: 'EASY',
      timeLimitMs: 1000,
      memoryMb: 256,
      createdById: admin.id,
      testCases: {
        create: [
          { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
          { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
        ],
      },
    },
    {
      title: 'Reverse String',
      slug: 'reverse-string',
      description: 'Write a function that reverses a string.',
      difficulty: 'EASY',
      timeLimitMs: 500,
      memoryMb: 128,
      createdById: admin.id,
      testCases: {
        create: [
          { input: '"hello"', output: '"olleh"' },
        ],
      },
    },
  ]

  for (const problem of problems) {
    await prisma.problem.upsert({
      where: { slug: problem.slug },
      update: {},
      create: problem,
    })
  }

  console.log('✅ Problems seeded')

  console.log('✅ Seed completed')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
