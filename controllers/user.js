const { PrismaClient } = require('@prisma/client');
const { nanoid } = require('nanoid');
const { ResponseTemplate } = require('../utils/ResponseTemplate');
const prisma = new PrismaClient();

async function addUser(req, res) {
  const {
    email, username, password, role, fullname, identity_type, identity_number, address,
  } = req.body;
  const userId = `user-${nanoid(10)}`;
  const profileId = `profile-${nanoid(10)}`;
  const payload = {
    id: userId,
    username,
    email,
    password,
    role,
    profiles: {
      create: {
        id: profileId,
        fullname,
        identity_type,
        identity_number,
        address,
      },
    },
  };

  try {
    const user = await prisma.users.create({ data: payload });
    const resp = ResponseTemplate(user, 'success', null);
    return res.status(201).json(resp);
  } catch (error) {
    const resp = ResponseTemplate(null, 'Internal Server Error', null);
    return res.status(500).json(resp);
  }
}

async function getUsers(req, res) {
  const { username, name, email } = req.query;
  const payload = {};

  if (username) {
    payload.username = username;
  }
  if (name) {
    payload.name = name;
  }
  if (email) {
    payload.email = email;
  }

  try {
    const user = await prisma.users.findMany({
      where: payload,
      orderBy: {
        id: 'asc',
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        created_at: true,
        updated_at: true,
        profiles: true,
      },
    });
    const resp = ResponseTemplate(user, 'success', null);
    return res.status(200).json(resp);
  } catch (error) {
    const resp = ResponseTemplate(null, 'Internal Server Error', null);
    return res.status(500).json(resp);
  }
}

async function getUserbyId(req, res) {
  const { id } = req.params;

  try {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        created_at: true,
        updated_at: true,
        profiles: true,
      },
    });
    if (!user) {
      const resp = ResponseTemplate(null, 'Not Found', null);
      return res.status(404).json(resp);
    }
    const resp = ResponseTemplate(user, 'success', null);
    return res.status(200).json(resp);
  } catch (error) {
    const resp = ResponseTemplate(null, 'Internal Server Error', null);
    return res.status(500).json(resp);
  }
}

async function updateUser(req, res) {
  const {
    email, username, password, role, fullname, identity_type, identity_number, address,
  } = req.body;
  const { id } = req.params;
  const payload = {};
  const profilePayload = {};

  if (!email && !username && !password && !role
    && !fullname && !identity_type && !identity_number && !address) {
    const resp = ResponseTemplate(null, 'Bad Request', null);
    return res.status(400).json(resp);
  }

  if (email) {
    payload.email = email;
  }
  if (username) {
    payload.username = username;
  }
  if (password) {
    payload.password = password;
  }
  if (role) {
    payload.role = role;
  }
  if (fullname) {
    profilePayload.fullname = fullname;
  }
  if (identity_type) {
    profilePayload.identity_type = identity_type;
  }
  if (identity_number) {
    profilePayload.identity_number = identity_number;
  }
  if (address) {
    profilePayload.address = address;
  }

  try {
    const findUser = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (!findUser) {
      const resp = ResponseTemplate(null, 'Not Found', null);
      return res.status(404).json(resp);
    }

    const user = await prisma.users.update({
      where: {
        id,
      },
      data: {
        ...payload,
        profiles: {
          update: {
            ...profilePayload,
          },
        },
      },
    });
    const resp = ResponseTemplate(user, 'updated', null);
    return res.status(200).json(resp);
  } catch (error) {
    const resp = ResponseTemplate(null, 'Internal Server Error', null);
    return res.status(500).json(resp);
  }
}

module.exports = {
  addUser,
  getUsers,
  getUserbyId,
  updateUser,
};
