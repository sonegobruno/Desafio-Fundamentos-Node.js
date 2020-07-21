import Transaction from '../models/Transaction';
import CreateTransactionDTO from '../dtos/CreateTransactionDto';
import Balance from '../models/Balance';

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (acc: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            acc.income += transaction.value;
            break;

          case 'outcome':
            acc.outcome += transaction.value;
            break;

          default:
            break;
        }

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transactions = new Transaction({
      title,
      type,
      value,
    });

    this.transactions.push(transactions);

    return transactions;
  }
}

export default TransactionsRepository;