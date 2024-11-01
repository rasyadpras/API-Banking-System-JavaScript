const { PrismaClient } = require("@prisma/client");
const ResponseError = require("../responses/response-error");
const { inputGender, inputIdentityType } = require("../utils/input-enum");
const { convertToLocalDate } = require("../utils/converter");
const prisma = new PrismaClient();

async function getAllProfilesService(city) {
    const payload = {};

    if (city) {
        payload.city = city;
    }

    return prisma.profiles.findMany({
        where: payload,
        orderBy: {
            id: "asc",
        },
        select: {
            id: true,
            full_name: true,
            gender: true,
            birth_date: true,
            identity_type: true,
            identity_number: true,
            address: true,
            city: true,
            province: true,
            country: true,
            phone_number: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    status_account: true,
                    roles: { select: { role: true } },
                    created_at: true,
                    updated_at: true,
                }
            },
            bank_accounts: {
                select: {
                    id: true,
                    branch: {
                        select: {
                            id: true,
                            branch_code: true,
                            branch_name: true,
                            region: true,
                            address: true,
                        }
                    },
                    account_number: true,
                    bank_account_type: true,
                    status_bank_account: true,
                    cards: {
                        select: {
                            id: true,
                            card_type: true,
                            card_number: true,
                            principal: true,
                            status_card: true,
                        }
                    },
                    created_at: true,
                    updated_at: true,
                }
            },
            created_at: true,
            updated_at: true,
        }
    });
}

async function getProfileByIdService(id) {
    const profile = await prisma.profiles.findUnique({
        where: { id },
        select: {
            id: true,
            full_name: true,
            gender: true,
            birth_date: true,
            identity_type: true,
            identity_number: true,
            address: true,
            city: true,
            province: true,
            country: true,
            phone_number: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    status_account: true,
                    roles: { select: { role: true } },
                    created_at: true,
                    updated_at: true,
                }
            },
            bank_accounts: {
                select: {
                    id: true,
                    branch: {
                        select: {
                            id: true,
                            branch_code: true,
                            branch_name: true,
                            region: true,
                            address: true,
                        }
                    },
                    account_number: true,
                    bank_account_type: true,
                    status_bank_account: true,
                    cards: {
                        select: {
                            id: true,
                            card_type: true,
                            card_number: true,
                            principal: true,
                            status_card: true,
                        }
                    },
                    created_at: true,
                    updated_at: true,
                }
            },
            created_at: true,
            updated_at: true,
        }
    });

    if (!profile) {
        throw new ResponseError(404, "Not Found", "Profile not found");
    }
    return profile;
}

async function updateProfileService(id, updateProfileReq) {
    const {
        full_name,
        gender,
        birth_date,
        identity_type,
        identity_number,
        address,
        city,
        province,
        country,
        phone_number
    } = updateProfileReq;

    const profile = await prisma.profiles.findUnique({ where: { id } });
    if (!profile) {
        throw new ResponseError(404, "Not Found", "Profile not found");
    }

    await prisma.profiles.update({
        where: { id },
        data: {
            full_name,
            gender: inputGender(gender),
            birth_date: convertToLocalDate(birth_date),
            identity_type: inputIdentityType(identity_type),
            identity_number,
            address,
            city,
            province,
            country,
            phone_number,
        }
    });

    return prisma.profiles.findUnique({
        where: { id },
        select: {
            id: true,
            full_name: true,
            gender: true,
            birth_date: true,
            identity_type: true,
            identity_number: true,
            address: true,
            city: true,
            province: true,
            country: true,
            phone_number: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    status_account: true,
                    roles: { select: { role: true } },
                    created_at: true,
                    updated_at: true,
                }
            },
            bank_accounts: {
                select: {
                    id: true,
                    branch: {
                        select: {
                            id: true,
                            branch_code: true,
                            branch_name: true,
                            region: true,
                            address: true,
                        }
                    },
                    account_number: true,
                    bank_account_type: true,
                    status_bank_account: true,
                    cards: {
                        select: {
                            id: true,
                            card_type: true,
                            card_number: true,
                            principal: true,
                            status_card: true,
                        }
                    },
                    created_at: true,
                    updated_at: true,
                }
            },
            created_at: true,
            updated_at: true,
        }
    });
}

module.exports = { getAllProfilesService, getProfileByIdService, updateProfileService };
