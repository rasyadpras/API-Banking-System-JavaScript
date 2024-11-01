const { PrismaClient, Roles, AccountUserStatus } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function initializeRoles() {
    for (const role of Object.values(Roles)) {
        await prisma.roles.upsert({
            where: { role },
            update: {},
            create: { role },
        });
    }
}

async function initSuperAdmin() {
    const { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } = process.env;

    await initializeRoles();

    const currentSuperAdmin = await prisma.users.findUnique({
        where: { email: SUPER_ADMIN_EMAIL }
    });
    if (currentSuperAdmin) return;

    const roles = await prisma.roles.findMany({
        where: { role: { in: Object.values(Roles) } }
    });

    const hashedPassword = await bcrypt.hash(SUPER_ADMIN_PASSWORD, 10);

    await prisma.users.create({
        data: {
            email: SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            roles: {
                connect: roles.map(role => ({ id: role.id }))
            },
            status_account: AccountUserStatus.active,
            is_verified: true,
        }
    });
}

module.exports = { initSuperAdmin };
