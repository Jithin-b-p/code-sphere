import { Request, Response } from "express";
import { CreateProblemSchema } from "./problems.schema";
import { AuthRequest } from "../auth/auth.middleware";
import * as service from "./problems.service";


export async function listProblems(req: Request, res: Response) {
    
    const page = Math.max(1, Number(req.query.page) ?? 1);
    const perPage = Math.min(100, Number(req.query.perPage) ?? 20);
    
    const result = await service.listProblems({page, perPage});

    return res.json(result);
}

export async function getProblem(req: Request, res: Response) {
   
    const slug = req.params.slug;
    const problem = await service.getProblemBySlug(slug);
    if(!problem) return res.status(404).json({message: "Problem not found"});
    return res.status(200).json(problem);
}

export async function createProblem(req: AuthRequest, res: Response) {

    const parse = CreateProblemSchema.safeParse(req.body);
    if(!parse.success) return res.status(400).json({message: "invalid input", error: parse.error.format()});

    const createdById = req.user?.userId;

    try {
        const problem = await service.createProblem(parse.data, createdById);
        return res.status(201).json(problem);
    }catch(err) {
        return res.status(500).json({message: "Internal server error"});
    }
}