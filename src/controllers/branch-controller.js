const {
    createBranchService,
    getAllBranchesService,
    updateBranchService,
} = require("../services/branch-service");
const CreateBranchRequest = require("../dto/create-branch");
const UpdateBranchRequest = require("../dto/update-branch");
const ResponseSuccess = require("../responses/response-success");
const ResponseError = require("../responses/response-error");

async function createBranch(req, res) {
    try {
        const createBranchReq = new CreateBranchRequest(
            req.body.branch_code,
            req.body.branch_name,
            req.body.region,
            req.body.address
        );

        const branch = await createBranchService(createBranchReq);
        const resp = new ResponseSuccess(
            201,
            "Created",
            {
                branchId: branch.id,
                code: branch.branch_code,
                branchName: branch.branch_name,
                region: branch.region,
                address: branch.address,
                createdAt: branch.created_at,
                updatedAt: branch.updated_at
            }
        );
        return res.status(201).json(resp);
    } catch (e) {
        if (e instanceof ResponseError) {
            return res.status(e.status).json({
                statusCode: e.status,
                message: e.message,
                error: e.error
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                message: "Internal Server Error",
                error: e.message
            });
        }
    }
}

async function getAllBranches(req, res) {
    try {
        const { region } = req.query;
        const branches = await getAllBranchesService(region);
        const resp = new ResponseSuccess(
            200,
            "OK",
            branches.map(branch => ({
                branchId: branch.id,
                code: branch.branch_code,
                branchName: branch.branch_name,
                region: branch.region,
                address: branch.address,
                createdAt: branch.created_at,
                updatedAt: branch.updated_at
            }))
        );
        return res.status(200).json(resp);
    } catch (e) {
        if (e instanceof ResponseError) {
            return res.status(e.status).json({
                statusCode: e.status,
                message: e.message,
                error: e.error
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                message: "Internal Server Error",
                error: e.message
            });
        }
    }
}

async function updateBranch(req, res) {
    try {
        const { id } = req.params;
        const updateBranchReq = new UpdateBranchRequest(
            req.body.branch_name,
            req.body.address
        );

        const branch = await updateBranchService(id, updateBranchReq);
        const resp = new ResponseSuccess(
            200,
            "OK",
            {
                branchId: branch.id,
                code: branch.branch_code,
                branchName: branch.branch_name,
                region: branch.region,
                address: branch.address,
                createdAt: branch.created_at,
                updatedAt: branch.updated_at
            }
        );
        return res.status(200).json(resp);
    } catch (e) {
        if (e instanceof ResponseError) {
            return res.status(e.status).json({
                statusCode: e.status,
                message: e.message,
                error: e.error
            });
        } else {
            return res.status(500).json({
                statusCode: 500,
                message: "Internal Server Error",
                error: e.message
            });
        }
    }
}

module.exports = { createBranch, getAllBranches, updateBranch };
