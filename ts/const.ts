export const UIElementString = {
  BUDGET_VAL: ".budget__value",
  INCOME_VAL: ".budget__income--value",
  EXPENSE_VAL: ".budget__expenses--value",
  PERCENTAGE_VAL: ".budget__expenses--percentage",

  TRANS_DESC: ".add__description",
  TRANS_AMOUNT: ".add__value",
  ADD_BTN: ".add__btn",

  INCOME_CONTAINER: ".income__list",
  EXPENSE_CONTAINER: ".expenses__list",

  DELETE_BTN: "ion-ios-close-outline",
  DATE_LABEL: ".budget__title--month",
};

export const UIElement = {
  DATE_LABEL_ELEMENT: document.querySelector(UIElementString.DATE_LABEL),
  BUDGET_VAL_ELEMENT: document.querySelector(UIElementString.BUDGET_VAL),
  INCOME_VAL_ELEMENT: document.querySelector(UIElementString.INCOME_VAL),
  EXPENSE_VAL_ELEMENT: document.querySelector(UIElementString.EXPENSE_VAL),
  PERCENTAGE_VAL_ELEMENT: document.querySelector(
    UIElementString.PERCENTAGE_VAL
  ),
  TRANS_DESC_ELEMENT: document.querySelector(
    UIElementString.TRANS_DESC
  ) as HTMLInputElement,
  TRANS_AMOUNT_ELEMENT: document.querySelector(
    UIElementString.TRANS_AMOUNT
  ) as HTMLInputElement,
  ADD_BTN_ELEMENT: document.querySelector(UIElementString.ADD_BTN),
  INCOME_CONTAINER_ELEMENT: document.querySelector(
    UIElementString.INCOME_CONTAINER
  ),
  EXPENSE_CONTAINER_ELEMENT: document.querySelector(
    UIElementString.EXPENSE_CONTAINER
  ),
  DELETE_BTN_ELEMENT: document.querySelector(UIElementString.DELETE_BTN),
};

export const ACTION = {
  ADD_TRANS: "ADD_TRANS",
  DELETE_TRANS: "DELETE_TRANS",
};

export const TRANSACTION_TYPE = {
  INCOME: "income",
  EXPENSE: "expense",
};
