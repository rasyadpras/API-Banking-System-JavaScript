const { PrismaClient } = require("@prisma/client");
const ResponseError = require("../responses/response-error");
const prisma = new PrismaClient();

async function createBranchService(createBranchReq) {
    const { branch_code, branch_name, region, address } = createBranchReq;

    const branch = await prisma.bank_branches.findUnique({ where: { branch_code } });
    if (branch) {
        throw new ResponseError(409, "Conflict", "Branch code already exists");
    }

    return prisma.bank_branches.create({
        data: {
            branch_code,
            branch_name,
            region,
            address,
        },
    });
}

async function getAllBranchesService(region) {
    const payload = {};

    if (region) {
        payload.region = region;
    }

    return prisma.bank_branches.findMany({
        where: payload,
        orderBy: {
            id: "asc",
        },
        select: {
            id: true,
            branch_code: true,
            branch_name: true,
            region: true,
            address: true,
            created_at: true,
            updated_at: true,
        },
    });
}

async function updateBranchService(id, updateBranchReq) {
    const { branch_name, address } = updateBranchReq;

    const branch = await prisma.bank_branches.findUnique({ where: { id } });
    if (!branch) {
        throw new ResponseError(404, "Not Found", "Branch not found");
    }

    await prisma.bank_branches.update({
        where: { id },
        data: {
            branch_name,
            address,
        },
    });

    return prisma.bank_branches.findUnique({
        where: { id },
        select: {
            id: true,
            branch_code: true,
            branch_name: true,
            region: true,
            address: true,
            created_at: true,
            updated_at: true,
        },
    });
}

module.exports = { createBranchService, getAllBranchesService, updateBranchService };
