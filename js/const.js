"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSACTION_TYPE = exports.ACTION = exports.UIElement = exports.UIElementString = void 0;
exports.UIElementString = {
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
exports.UIElement = {
    DATE_LABEL_ELEMENT: document.querySelector(exports.UIElementString.DATE_LABEL),
    BUDGET_VAL_ELEMENT: document.querySelector(exports.UIElementString.BUDGET_VAL),
    INCOME_VAL_ELEMENT: document.querySelector(exports.UIElementString.INCOME_VAL),
    EXPENSE_VAL_ELEMENT: document.querySelector(exports.UIElementString.EXPENSE_VAL),
    PERCENTAGE_VAL_ELEMENT: document.querySelector(exports.UIElementString.PERCENTAGE_VAL),
    TRANS_DESC_ELEMENT: document.querySelector(exports.UIElementString.TRANS_DESC),
    TRANS_AMOUNT_ELEMENT: document.querySelector(exports.UIElementString.TRANS_AMOUNT),
    ADD_BTN_ELEMENT: document.querySelector(exports.UIElementString.ADD_BTN),
    INCOME_CONTAINER_ELEMENT: document.querySelector(exports.UIElementString.INCOME_CONTAINER),
    EXPENSE_CONTAINER_ELEMENT: document.querySelector(exports.UIElementString.EXPENSE_CONTAINER),
    DELETE_BTN_ELEMENT: document.querySelector(exports.UIElementString.DELETE_BTN),
};
exports.ACTION = {
    ADD_TRANS: "ADD_TRANS",
    DELETE_TRANS: "DELETE_TRANS",
};
exports.TRANSACTION_TYPE = {
    INCOME: "income",
    EXPENSE: "expense",
};
