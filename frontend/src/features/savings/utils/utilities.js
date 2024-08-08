import { modifyNum, parseNumber } from "../../../shared/utils/utilities.js";

export const handleSavingsAmountInput = (event, savings, id) => {
  const tempSavings = savings.slice();
  for (let i = 0; i < tempSavings.length; i++) {
    if (tempSavings[i].id === id) {
      const arr = [...event.target.value];
      const filterArr = [];
      const boxstr = modifyNum(arr, filterArr);
      const str = boxstr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      event.target.value = "¥" + str;

      tempSavings[i].savingsamount = parseFloat(boxstr);

      //calculateTotal(tempSavings, nextBudgetVal);
    }
  }
  return tempSavings;
};

export const handleSavingsName = (event, index, savings) => {

  const tempSavings = savings.slice();
  tempSavings[index].category = event.target.value
  return tempSavings;
};


export const calculateSavingsTotals = (savings, transactions) => {
  let total = 0;
  for (let i in transactions) {
    let expense = parseNumber(transactions[i].expense);
    let income = parseNumber(transactions[i].income);

    if (transactions[i].category === savings.category && savings.category !== "") {
      total -= expense;
      total += income;
    }
  }
  return total;
}