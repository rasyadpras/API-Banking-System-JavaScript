const { PrismaClient } = require('@prisma/client');
const nanoid = require('nanoid');
const { ResponseTemplate } = require('../utils/ResponseTemplate');
const prisma = new PrismaClient();

async function addTransaction(req, res) {
  const {
    amount, source_account_number, destination_account_number,
  } = req.body;
  const payload = {
    id: `trx-${nanoid(10)}`,
    amount: parseFloat(amount),
    source_account_number,
    destination_account_number,
  };

  try {
    const trx = await prisma.transactions.create({ data: payload });
    await prisma.accounts.update({
      where: {
        source_account_number,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });
    await prisma.accounts.update({
      where: {
        destination_account_number,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });
    const resp = ResponseTemplate(trx, 'success', null);
    return res.status(201).json(resp);
  } catch (error) {
    const resp = ResponseTemplate(null, 'Internal Server Error', null);
    return res.status(500).json(resp);
  }
}

async function getTransactions(req, res) {
  const { source_account_number, destination_account_number } = req.query;
  const payload = {};

  if (source_account_number) {
    payload.source_account_number = source_account_number;
  }
  if (destination_account_number) {
    payload.destination_account_number = destination_account_number;
  }

  try {
    const trx = await prisma.accounts.findMany({
      where: payload,
      orderBy: {
        transaction_date: 'asc',
      },
    });
    const resp = ResponseTemplate(trx, 'success', null);
    return res.status(200).json(resp);
  } catch (error) {
    const resp = ResponseTemplate(null, 'Internal Server Error', null);
    return res.status(500).json(resp);
  }
}

async function getTransactionbyId(req, res) {
  const { id } = req.params;

  try {
    const trx = prisma.accounts.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        amount: true,
        source_account_number: true,
        transaction_from: {
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
        },
        transaction_to: {
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
        },
        transaction_date: true,
      },
    });
    if (!trx) {
      const resp = ResponseTemplate(null, 'Not Found', null);
      return res.status(404).json(resp);
    }
    const resp = ResponseTemplate(trx, 'success', null);
    return res.status(200).json(resp);
  } catch (error) {
    const resp = ResponseTemplate(null, 'Internal Server Error', null);
    return res.status(500).json(resp);
  }
}

module.exports = {
  addTransaction,
  getTransactions,
  getTransactionbyId,
};
