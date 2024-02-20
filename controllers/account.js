const { PrismaClient } = require('@prisma/client');
const nanoid = require('nanoid');
const { ResponseTemplate } = require('../utils/ResponseTemplate');
const prisma = new PrismaClient();

async function addAccount(req, res) {
  const {
    account_number, user_id, balance, status,
  } = req.body;
  const accountId = `acc-${nanoid(10)}`;
  const payload = {
    id: accountId,
    account_number,
    user_id,
    balance,
    status,
  };

  try {
    const acc = await prisma.accounts.create({ data: payload });
    const resp = ResponseTemplate(acc, 'success', null);
    return res.status(201).json(resp);
  } catch (error) {
    const resp = ResponseTemplate(null, 'Internal Server Error', null);
    return res.status(500).json(resp);
  }
}

async function getAccounts(req, res) {
  const { status } = req.query;
  const payload = {};

  if (status) {
    payload.status = status;
  }

  try {
    const acc = await prisma.accounts.findMany({
      where: payload,
      orderBy: {
        id: 'asc',
      },
      select: {
        id: true,
        account_number: true,
        user_id: true,
        user: {
          select: {
            email: true,
            username: true,
            role: true,
            profiles: true,
          },
        },
        balance: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });
    const resp = ResponseTemplate(acc, 'success', null);
    return res.status(200).json(resp);
  } catch (error) {
    const resp = ResponseTemplate(null, 'Internal Server Error', null);
    return res.status(500).json(resp);
  }
}

async function getAccountbyId(req, res) {
  const { id } = req.params;

  try {
    const acc = prisma.accounts.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        account_number: true,
        user_id: true,
        user: {
          select: {
            email: true,
            username: true,
            role: true,
            profiles: true,
          },
        },
        balance: true,
        status: true,
        created_at: true,
        updated_at: true,
      },
    });
    if (!acc) {
      const resp = ResponseTemplate(null, 'Not Found', null);
      return res.status(404).json(resp);
    }
    const resp = ResponseTemplate(acc, 'success', null);
    return res.status(200).json(resp);
  } catch (error) {
    const resp = ResponseTemplate(null, 'Internal Server Error', null);
    return res.status(500).json(resp);
  }
}

async function updateAccount(req, res) {
  const {
    account_number, balance, status,
  } = req.body;
  const { id } = req.params;
  const payload = {};

  if (!account_number && !balance && !status) {
    const resp = ResponseTemplate(null, 'Bad Request', null);
    return res.status(400).json(resp);
  }

  if (account_number) {
    payload.account_number = account_number;
  }
  if (balance) {
    payload.balance = balance;
  }
  if (status) {
    payload.status = status;
  }

  try {
    const findAcc = await prisma.accounts.findUnique({
      where: {
        id,
      },
    });
    if (!findAcc) {
      const resp = ResponseTemplate(null, 'Not Found', null);
      return res.status(404).json(resp);
    }

    const acc = await prisma.accounts.update({
      where: {
        id,
      },
      data: payload,
    });
    const resp = ResponseTemplate(acc, 'updated', null);
    return res.status(200).json(resp);
  } catch (error) {
    const resp = ResponseTemplate(null, 'Internal Server Error', null);
    return res.status(500).json(resp);
  }
}

module.exports = {
  addAccount,
  getAccounts,
  getAccountbyId,
  updateAccount,
};
