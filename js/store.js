"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPercentageForSingleExpense = exports.getPercentageForAllExpense = exports.getTotalBudget = exports.getTotalAmountIncomeOrExpense = exports.getExpenseList = exports.getIncomeList = exports.store = void 0;
const const_js_1 = require("./const.js");
class ActionType {
}
const initialState = {
    incomeList: [],
    expenseList: [],
};
function createStore(reducer, initialState) {
    let state = initialState;
    function getState() {
        return state;
    }
    function dispatch(action) {
        state = reducer(state, action);
    }
    return { getState, dispatch };
}
exports.store = createStore(reducer, initialState);
function reducer(state, action) {
    switch (action.type) {
        case const_js_1.ACTION.ADD_TRANS:
            if (action.payload.type === const_js_1.TRANSACTION_TYPE.INCOME) {
                return Object.assign(Object.assign({}, state), { incomeList: [].concat(state.incomeList, action.payload) });
            }
            else if (action.payload.type === const_js_1.TRANSACTION_TYPE.EXPENSE) {
                return Object.assign(Object.assign({}, state), { expenseList: [].concat(state.expenseList, action.payload) });
            }
            break;
        case const_js_1.ACTION.DELETE_TRANS:
            const expenseIndex = state.expenseList.findIndex((expense) => expense.id === action.payload);
            const incomeIndex = state.incomeList.findIndex((income) => income.id === action.payload);
            let newList = [];
            if (expenseIndex !== -1) {
                newList = [
                    ...state.expenseList.slice(0, expenseIndex),
                    ...state.expenseList.slice(expenseIndex + 1),
                ];
                return Object.assign(Object.assign({}, state), { expenseList: newList });
            }
            else if (incomeIndex !== -1) {
                newList = [
                    ...state.incomeList.slice(0, incomeIndex),
                    ...state.incomeList.slice(incomeIndex + 1),
                ];
                return Object.assign(Object.assign({}, state), { incomeList: newList });
            }
            break;
        default:
            return state;
    }
}
function getIncomeList() {
    return exports.store.getState().incomeList;
}
exports.getIncomeList = getIncomeList;
function getExpenseList() {
    return exports.store.getState().expenseList;
}
exports.getExpenseList = getExpenseList;
function getTotalAmountIncomeOrExpense(type) {
    if (type === const_js_1.TRANSACTION_TYPE.INCOME) {
        return exports.store
            .getState()
            .incomeList.map((income) => income.amount)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
    else if (type === const_js_1.TRANSACTION_TYPE.EXPENSE) {
        return exports.store
            .getState()
            .expenseList.map((expense) => expense.amount)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
    return -1;
}
exports.getTotalAmountIncomeOrExpense = getTotalAmountIncomeOrExpense;
function getTotalBudget() {
    const totalIncome = exports.store
        .getState()
        .incomeList.map((income) => income.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totalExpense = exports.store
        .getState()
        .expenseList.map((expense) => expense.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return totalIncome + totalExpense;
}
exports.getTotalBudget = getTotalBudget;
function getPercentageForAllExpense() {
    if (exports.store.getState().incomeList.length === 0 ||
        exports.store.getState().expenseList.length === 0) {
        return 0;
    }
    else {
        const totalIncome = exports.store
            .getState()
            .incomeList.map((income) => income.amount)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const totalExpense = exports.store
            .getState()
            .expenseList.map((expense) => expense.amount)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return Math.round((Math.abs(totalExpense) / totalIncome) * 100);
    }
}
exports.getPercentageForAllExpense = getPercentageForAllExpense;
function getPercentageForSingleExpense(amountExpense) {
    if (exports.store.getState().incomeList.length === 0 ||
        exports.store.getState().expenseList.length === 0) {
        return 0;
    }
    else {
        const totalIncome = exports.store
            .getState()
            .incomeList.map((income) => income.amount)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return Math.round((Math.abs(amountExpense) / totalIncome) * 100);
    }
}
exports.getPercentageForSingleExpense = getPercentageForSingleExpense;
