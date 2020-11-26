"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
const store_1 = require("./store");
const util_1 = require("./util");
const bootstrap = () => {
    console.log("Start Budget Calculator Application");
    util_1.Utils.initialData({
        budget: store_1.getTotalBudget(),
        totalIncome: store_1.getTotalAmountIncomeOrExpense(const_1.TRANSACTION_TYPE.INCOME),
        totalExpense: store_1.getTotalAmountIncomeOrExpense(const_1.TRANSACTION_TYPE.EXPENSE),
        percentage: store_1.getPercentageForAllExpense() === 0
            ? "---"
            : store_1.getPercentageForAllExpense() + "%",
    });
};
bootstrap();
