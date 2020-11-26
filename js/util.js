"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const const_1 = require("./const");
const uuid_1 = require("uuid");
const store_1 = require("./store");
class Utils {
    static initialData(budgetVM) {
        const_1.UIElement.DATE_LABEL_ELEMENT.textContent = this.getCurrentMonth();
        this.setViewData(budgetVM);
        const_1.UIElement.ADD_BTN_ELEMENT.addEventListener("click", () => {
            this.addTrans(this.getTransData());
        });
        document.addEventListener("click", (e) => {
            this.initListener(e);
        });
    }
    static getCurrentMonth() {
        const now = new Date(), monthIndex = now.getMonth(), year = now.getFullYear(), monthList = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return `${monthList[monthIndex]} ${year}`;
    }
    static initListener(e) {
        const element = e.target;
        if (element.classList.contains(const_1.UIElementString.DELETE_BTN)) {
            store_1.store.dispatch({
                type: const_1.ACTION.DELETE_TRANS,
                payload: element.parentNode.parentNode.parentNode.parentNode.getAttribute("data-transaction-id"),
            });
            element.parentNode.parentNode.parentNode.parentNode.remove();
            this.setViewData({
                budget: store_1.getTotalBudget(),
                totalIncome: store_1.getTotalAmountIncomeOrExpense(const_1.TRANSACTION_TYPE.INCOME),
                totalExpense: store_1.getTotalAmountIncomeOrExpense(const_1.TRANSACTION_TYPE.EXPENSE),
                percentage: store_1.getPercentageForAllExpense() === 0
                    ? "---"
                    : store_1.getPercentageForAllExpense() + "%",
            });
        }
    }
    static getCurrentDateTime() {
        const now = new Date(), date = now.getDate(), monthIndex = now.getMonth(), year = now.getFullYear(), monthList = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        return `${monthList[monthIndex]} ${date}, ${year}`;
    }
    static getTransData() {
        return {
            id: uuid_1.v4(),
            amount: parseFloat(const_1.UIElement.TRANS_AMOUNT_ELEMENT.value),
            description: const_1.UIElement.TRANS_DESC_ELEMENT.value,
            date: this.getCurrentDateTime(),
            type: Math.sign(parseFloat(const_1.UIElement.TRANS_AMOUNT_ELEMENT.value)) === 1
                ? "income"
                : "expense",
        };
    }
    static setViewData(budgetVM) {
        const_1.UIElement.BUDGET_VAL_ELEMENT.textContent = budgetVM.budget.toString();
        const_1.UIElement.INCOME_VAL_ELEMENT.textContent = budgetVM.totalIncome.toString();
        const_1.UIElement.EXPENSE_VAL_ELEMENT.textContent = budgetVM.totalExpense.toString();
        const_1.UIElement.PERCENTAGE_VAL_ELEMENT.textContent = budgetVM.percentage.toString();
    }
    static addTrans(trans) {
        if (trans.amount && trans.description) {
            let transView, elementContainer;
            store_1.store.dispatch({
                type: const_1.ACTION.ADD_TRANS,
                payload: trans,
            });
            if (trans.type === "income") {
                elementContainer = const_1.UIElement.INCOME_CONTAINER_ELEMENT;
                transView = `<div class="item" data-transaction-id=$id>
        <div class="item__description">$description</div>
        <div class="right">
          <div class="item__value">$value</div>
          <div class="item__delete">
            <button class="item__delete--btn">
              <i class="ion-ios-close-outline"></i>
            </button>
          </div>
        </div>
        <div class="item__date">$date</div>
        </div>`;
            }
            else if (trans.type === "expense") {
                elementContainer = const_1.UIElement.EXPENSE_CONTAINER_ELEMENT;
                transView = ` <div class="item" data-transaction-id=$id>
        <div class="item__description">$description</div>
        <div class="right">
          <div class="item__value">$value</div>
          <div class="item__percentage">$percentage</div>
          <div class="item__delete">
            <button class="item__delete--btn">
              <i class="ion-ios-close-outline"></i>
            </button>
          </div>
        </div>
        <div class="item__date">$date</div>
      </div>`;
            }
            elementContainer.insertAdjacentHTML("beforeend", transView
                .replace("$id", trans.id)
                .replace("$description", trans.description)
                .replace("$value", trans.amount.toFixed(2))
                .replace("$percentage", store_1.getPercentageForSingleExpense(parseFloat(trans.amount.toFixed(2))) +
                "%")
                .replace("$date", trans.date));
            const_1.UIElement.TRANS_AMOUNT_ELEMENT.value = "";
            const_1.UIElement.TRANS_DESC_ELEMENT.value = "";
            this.setViewData({
                budget: store_1.getTotalBudget(),
                totalIncome: store_1.getTotalAmountIncomeOrExpense(const_1.TRANSACTION_TYPE.INCOME),
                totalExpense: store_1.getTotalAmountIncomeOrExpense(const_1.TRANSACTION_TYPE.EXPENSE),
                percentage: store_1.getPercentageForAllExpense() === 0
                    ? "---"
                    : store_1.getPercentageForAllExpense() + "%",
            });
        }
    }
}
exports.Utils = Utils;
