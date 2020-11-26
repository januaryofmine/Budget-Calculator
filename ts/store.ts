import { ApplicationState, Transaction, TransactionType } from "./model";
import { ACTION, TRANSACTION_TYPE } from "./const.js";

class ActionType {
  type: string;

  payload: any;
}

// INITIAL STATE
const initialState: ApplicationState = {
  incomeList: [],
  expenseList: [],
};

function createStore(reducer, initialState: ApplicationState) {
  let state = initialState;
  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
  }

  return { getState, dispatch };
}

export const store = createStore(reducer, initialState);

// REDUCER
function reducer(state: ApplicationState, action: ActionType) {
  switch (action.type) {
    case ACTION.ADD_TRANS:
      if (action.payload.type === TRANSACTION_TYPE.INCOME) {
        return {
          ...state,
          incomeList: [].concat(state.incomeList, action.payload),
        };
      } else if (action.payload.type === TRANSACTION_TYPE.EXPENSE) {
        return {
          ...state,
          expenseList: [].concat(state.expenseList, action.payload),
        };
      }
      break;
    case ACTION.DELETE_TRANS:
      const expenseIndex = state.expenseList.findIndex(
        (expense) => expense.id === action.payload
      );
      const incomeIndex = state.incomeList.findIndex(
        (income) => income.id === action.payload
      );
      let newList = [];
      if (expenseIndex !== -1) {
        newList = [
          ...state.expenseList.slice(0, expenseIndex),
          ...state.expenseList.slice(expenseIndex + 1),
        ];
        return {
          ...state,
          expenseList: newList,
        };
      } else if (incomeIndex !== -1) {
        newList = [
          ...state.incomeList.slice(0, incomeIndex),
          ...state.incomeList.slice(incomeIndex + 1),
        ];
        return {
          ...state,
          incomeList: newList,
        };
      }
      break;
    default:
      return state;
  }
}

// SELECTOR
export function getIncomeList(): Transaction[] {
  return store.getState().incomeList;
}

export function getExpenseList(): Transaction[] {
  return store.getState().expenseList;
}

export function getTotalAmountIncomeOrExpense(type: string): number {
  if (type === TRANSACTION_TYPE.INCOME) {
    return store
      .getState()
      .incomeList.map((income) => income.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  } else if (type === TRANSACTION_TYPE.EXPENSE) {
    return store
      .getState()
      .expenseList.map((expense) => expense.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  return -1;
}

export function getTotalBudget(): number {
  const totalIncome = store
    .getState()
    .incomeList.map((income) => income.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const totalExpense = store
    .getState()
    .expenseList.map((expense) => expense.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return totalIncome + totalExpense;
}

export function getPercentageForAllExpense() {
  if (
    store.getState().incomeList.length === 0 ||
    store.getState().expenseList.length === 0
  ) {
    return 0;
  } else {
    const totalIncome = store
      .getState()
      .incomeList.map((income) => income.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totalExpense = store
      .getState()
      .expenseList.map((expense) => expense.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return Math.round((Math.abs(totalExpense) / totalIncome) * 100);
  }
}

export function getPercentageForSingleExpense(amountExpense: number) {
  if (
    store.getState().incomeList.length === 0 ||
    store.getState().expenseList.length === 0
  ) {
    return 0;
  } else {
    const totalIncome = store
      .getState()
      .incomeList.map((income) => income.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return Math.round((Math.abs(amountExpense) / totalIncome) * 100);
  }
}
