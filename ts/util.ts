import { ACTION, TRANSACTION_TYPE, UIElement, UIElementString } from "./const";
import { BudgetVM } from "./view-model";
import { v4 as uuidv4 } from "uuid";
import { Transaction } from "./model";
import {
  getPercentageForAllExpense,
  getPercentageForSingleExpense,
  getTotalAmountIncomeOrExpense,
  getTotalBudget,
  store,
} from "./store";

export class Utils {
  static initialData(budgetVM: BudgetVM) {
    // Set Initial Data to View
    UIElement.DATE_LABEL_ELEMENT.textContent = this.getCurrentMonth();
    this.setViewData(budgetVM);
    // Add Event Listener to View
    UIElement.ADD_BTN_ELEMENT.addEventListener("click", () => {
      this.addTrans(this.getTransData());
    });
    document.addEventListener("click", (e) => {
      this.initListener(e);
    });
  }

  static getCurrentMonth(): string {
    const now = new Date(),
      monthIndex = now.getMonth(),
      year = now.getFullYear(),
      monthList = [
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

  // FOR DELETE METHOD
  static initListener(e) {
    const element = e.target;
    if (element.classList.contains(UIElementString.DELETE_BTN)) {
      // Dispatch action delete transaction
      store.dispatch({
        type: ACTION.DELETE_TRANS,
        payload: element.parentNode.parentNode.parentNode.parentNode.getAttribute(
          "data-transaction-id"
        ),
      });
      element.parentNode.parentNode.parentNode.parentNode.remove();
      // Update View Data
      this.setViewData({
        budget: getTotalBudget(),
        totalIncome: getTotalAmountIncomeOrExpense(TRANSACTION_TYPE.INCOME),
        totalExpense: getTotalAmountIncomeOrExpense(TRANSACTION_TYPE.EXPENSE),
        percentage:
          getPercentageForAllExpense() === 0
            ? "---"
            : getPercentageForAllExpense() + "%",
      });
    }
  }

  static getCurrentDateTime(): string {
    const now = new Date(),
      date = now.getDate(),
      monthIndex = now.getMonth(),
      year = now.getFullYear(),
      monthList = [
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

  static getTransData(): Transaction {
    return {
      id: uuidv4(),
      amount: parseFloat(UIElement.TRANS_AMOUNT_ELEMENT.value),
      description: UIElement.TRANS_DESC_ELEMENT.value,
      date: this.getCurrentDateTime(),
      type:
        Math.sign(parseFloat(UIElement.TRANS_AMOUNT_ELEMENT.value)) === 1
          ? "income"
          : "expense",
    };
  }

  static setViewData(budgetVM: BudgetVM): void {
    UIElement.BUDGET_VAL_ELEMENT.textContent = budgetVM.budget.toString();
    UIElement.INCOME_VAL_ELEMENT.textContent = budgetVM.totalIncome.toString();
    UIElement.EXPENSE_VAL_ELEMENT.textContent = budgetVM.totalExpense.toString();
    UIElement.PERCENTAGE_VAL_ELEMENT.textContent = budgetVM.percentage.toString();
  }

  static addTrans(trans: Transaction) {
    if (trans.amount && trans.description) {
      let transView, elementContainer;
      // Dispatch action add transaction
      store.dispatch({
        type: ACTION.ADD_TRANS,
        payload: trans,
      });

      // Initial Data in list
      if (trans.type === "income") {
        elementContainer = UIElement.INCOME_CONTAINER_ELEMENT;
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
      } else if (trans.type === "expense") {
        elementContainer = UIElement.EXPENSE_CONTAINER_ELEMENT;
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

      elementContainer.insertAdjacentHTML(
        "beforeend",
        transView
          .replace("$id", trans.id)
          .replace("$description", trans.description)
          .replace("$value", trans.amount.toFixed(2))
          .replace(
            "$percentage",
            getPercentageForSingleExpense(parseFloat(trans.amount.toFixed(2))) +
              "%"
          )
          .replace("$date", trans.date)
      );

      // Clean up form fields
      UIElement.TRANS_AMOUNT_ELEMENT.value = "";
      UIElement.TRANS_DESC_ELEMENT.value = "";

      // Update View Data
      this.setViewData({
        budget: getTotalBudget(),
        totalIncome: getTotalAmountIncomeOrExpense(TRANSACTION_TYPE.INCOME),
        totalExpense: getTotalAmountIncomeOrExpense(TRANSACTION_TYPE.EXPENSE),
        percentage:
          getPercentageForAllExpense() === 0
            ? "---"
            : getPercentageForAllExpense() + "%",
      });
    }
  }
}
