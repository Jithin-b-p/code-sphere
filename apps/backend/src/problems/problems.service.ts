import slugify from "slugify";
import { CreateProblemType } from "./problems.schema";
import { prisma } from "../prisma";

export async function listProblems({page = 1, perPage = 20}: {page?: number; perPage?: number}) {

    const skip = (page - 1) * perPage;

    const [items, total] = await Promise.all([
        prisma.problem.findMany({
            skip: skip,
            orderBy: {createdAt: 'desc'},
            select: {id: true, title: true, slug: true, difficulty: true, createdAt: true},
            take: perPage,
        }),
        prisma.problem.count()
    ]);

    return {items, total, page, perPage};
} 

export async function getProblemBySlug(slug: string) {

    return await prisma.problem.findUnique({where: {slug}, include: {testCases: true}});
}

export async function createProblem(data: CreateProblemType, createdById?: number) {

    const baseSlug = slugify(data.title, {lower: true, strict: true});
    let slug = baseSlug;

    let counter = 1;

    while(await prisma.problem.findUnique({where: {slug}})) {
        counter += 1;
        slug = `${slug}-${counter}`;
    }

    const created = await prisma.problem.create({
        data: {
            title: data.title,
            slug,
            description: data.description,
            difficulty: data.difficulty,
            timeLimitMs: data.timeLimitMs ?? 1000,
            memoryMb: data.memoryMb ?? 256,
            createdById,
            testCases: data.testCases ? {create : data.testCases} : undefined,
        },
        include : {
            testCases: true
        }
    });

    return created;

}