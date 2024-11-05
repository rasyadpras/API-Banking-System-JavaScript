const {
    createBranchService,
    getAllBranchesService,
    updateBranchService,
} = require("../services/branch-service");
const CreateBranchRequest = require("../dto/create-branch");
const UpdateBranchRequest = require("../dto/update-branch");
const ResponseSuccess = require("../responses/response-success");

async function createBranch(req, res, next) {
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
                branch_id: branch.id,
                code: branch.branch_code,
                branch_name: branch.branch_name,
                region: branch.region,
                address: branch.address,
                created_at: branch.created_at,
                updated_at: branch.updated_at
            }
        );
        return res.status(201).json(resp);
    } catch (e) {
        next(e);
    }
}

async function getAllBranches(req, res, next) {
    try {
        const { region } = req.query;
        const branches = await getAllBranchesService(region);
        const resp = new ResponseSuccess(
            200,
            "OK",
            branches.map(branch => ({
                branch_id: branch.id,
                code: branch.branch_code,
                branch_name: branch.branch_name,
                region: branch.region,
                address: branch.address,
                created_at: branch.created_at,
                updated_at: branch.updated_at
            }))
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

async function updateBranch(req, res, next) {
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
                branch_id: branch.id,
                code: branch.branch_code,
                branch_name: branch.branch_name,
                region: branch.region,
                address: branch.address,
                created_at: branch.created_at,
                updated_at: branch.updated_at
            }
        );
        return res.status(200).json(resp);
    } catch (e) {
        next(e);
    }
}

module.exports = { createBranch, getAllBranches, updateBranch };
