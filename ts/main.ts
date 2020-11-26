import { TRANSACTION_TYPE, UIElement } from "./const";
import {
  getPercentageForAllExpense,
  getTotalAmountIncomeOrExpense,
  getTotalBudget,
} from "./store";
import { Utils } from "./util";

const bootstrap = () => {
  console.log("Start Budget Calculator Application");
  Utils.initialData({
    budget: getTotalBudget(),
    totalIncome: getTotalAmountIncomeOrExpense(TRANSACTION_TYPE.INCOME),
    totalExpense: getTotalAmountIncomeOrExpense(TRANSACTION_TYPE.EXPENSE),
    percentage:
      getPercentageForAllExpense() === 0
        ? "---"
        : getPercentageForAllExpense() + "%",
  });
};

bootstrap();
