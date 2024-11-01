const { PrismaClient, Roles, AccountUserStatus } = require("@prisma/client");
const bcrypt = require("bcrypt");
const ResponseError = require("../responses/response-error");
const { inputGender, inputIdentityType } = require("../utils/input-enum");
const { convertToLocalDate } = require("../utils/converter");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

async function registerService(registerReq) {
    const {
        email,
        password,
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
    } = registerReq;

    const existUser = await prisma.users.findUnique({ where: { email } });
    if (existUser) {
        throw new ResponseError(400, "Bad Request", "Email already exists");
    }

    const hashPass = await bcrypt.hash(password, 10);

    const customerRole = await prisma.roles.findUnique({ where: { role: "customer" } });
    if (!customerRole) {
        await prisma.roles.create({
            data: {
                role: Roles.administrator
            }
        });
    }

    return prisma.users.create({
        data: {
            email,
            password: hashPass,
            roles: {
                connect: { id: customerRole.id }
            },
            profiles: {
                create: {
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
                },
            },
        }
    });
}

async function loginService(loginReq) {
    const { email, password } = loginReq;

    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
        throw new ResponseError(404, "Not Found", "E-mail not registered");
    }

    if (user.login_attempts >= 5) {
        throw new ResponseError(423, "Locked", "Account is locked due to too many failed login attempts");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        await prisma.users.update({
            where: { id: user.id },
            data: { login_attempts: user.login_attempts + 1 }
        });
        throw new ResponseError(401, "Unauthorized", "Password is incorrect");
    }

    const token = jwt.sign({ email: user.email, user_id: user.user_id }, process.env.SECRET_KEY);
    const data = prisma.users.findUnique({
        where: { email },
        select: {
            email: true,
            roles: {select: {role: true}},
        }
    });

    return { token, data };
}

async function addRoleService(id, addRoleReq) {
    const { role } = addRoleReq;

    const user = await prisma.users.findUnique({ where: { id } });
    if (!user) {
        throw new ResponseError(404, "Not Found", "User not found");
    }

    let addRole;
    if (role.toLowerCase() === "admin") {
        addRole = Roles.administrator;
    } else if (role.toLowerCase() === "staff") {
        addRole = Roles.officer;
    } else {
        throw new ResponseError(400, "Bad Request", "Value of role must be 'admin' or 'staff'");
    }

    const existRole = await prisma.roles.findUnique({ where: { role: addRole } });
    if (!existRole) {
        await prisma.roles.create({
            data: { role: addRole }
        });
    }

    await prisma.users.update({
        where: { id },
        data: {
            roles: {
                connect: { id: role.id }
            }
        }
    });

    return prisma.users.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            roles: { select: { role: true } },
            status_account: true,
            created_at: true,
            updated_at: true,
            profile: {
                select: {
                    id: true,
                    full_name: true,
                    gender: true,
                }
            }
        }
    });
}

async function forgotPasswordService(id, forgotPasswordReq) {
    const { password } = forgotPasswordReq;

    const user = await prisma.users.findUnique({ where: { id } });
    if (!user) {
        throw new ResponseError(404, "Not Found", "User not found");
    }

    const hashPass = await bcrypt.hash(password, 10);
    const match = await bcrypt.compare(hashPass, user.password);
    if (match) {
        throw new ResponseError(400, "Bad Request", "New password must be different from the current password");
    }

    return prisma.users.update({
        where: { id },
        data: { password: hashPass }
    });
}

async function resetPasswordService(id, resetPasswordReq) {
    const { old_password, new_password } = resetPasswordReq;

    const user = await prisma.users.findUnique({ where: { id } });
    if (!user) {
        throw new ResponseError(404, "Not Found", "User not found");
    }

    const hashOldPass = await bcrypt.hash(old_password, 10);
    const match = await bcrypt.compare(hashOldPass, user.password);
    if (!match) {
        throw new ResponseError(400, "Bad Request", "Old password not match");
    }

    const hashNewPass = await bcrypt.hash(new_password, 10);
    const matchNew = await bcrypt.compare(hashNewPass, hashOldPass);
    if (matchNew) {
        throw new ResponseError(400, "Bad Request", "New password must be different from the old password");
    }

    return prisma.users.update({
        where: { id },
        data: { password: hashNewPass }
    });
}

async function verifyAccountService(id) {
    const user = await prisma.users.findUnique({ where: { id } });
    if (!user) {
        throw new ResponseError(404, "Not Found", "User not found");
    }

    if (user.status_account === AccountUserStatus.active) {
        throw new ResponseError(400, "Bad Request", "Your account is already active");
    }
    if (user.status_account === AccountUserStatus.locked) {
        throw new ResponseError(400, "Bad Request", "Your account has been locked");
    }

    return prisma.users.update({
        where: { id },
        data: { status_account: AccountUserStatus.active }
    });
}

async function unlockAccountService(id) {
    const user = await prisma.users.findUnique({ where: { id } });
    if (!user) {
        throw new ResponseError(404, "Not Found", "User not found");
    }

    if (user.status_account === AccountUserStatus.active) {
        throw new ResponseError(400, "Bad Request", "Your account is already active");
    }

    return prisma.users.update({
        where: { id },
        data: { status_account: AccountUserStatus.active }
    });
}

module.exports = {
    registerService,
    loginService,
    addRoleService,
    forgotPasswordService,
    resetPasswordService,
    verifyAccountService,
    unlockAccountService,
};
