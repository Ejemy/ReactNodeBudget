import { modifyNum, parseNumber } from "../../../shared/utils/utilities.js";

export const handleCategoryName = (event, id, budget) => {
  const nextBudget = budget.slice();
  for (let i = 0; i < nextBudget.length; i++) {
    if (nextBudget[i].id === id) {
      nextBudget[i].category = event.target.value;
    }
  }
  return nextBudget;
};



export const handleBudgetAmountInput = (event, budget, id) => {
  const nextBudgetVal = budget.slice();
  let val = event.target.value;
  for (let i = 0; i < nextBudgetVal.length; i++) {
    if (nextBudgetVal[i].id === id) {
      
      //event.target.value = "¥" + modifyNum(val);
      nextBudgetVal[i].budgetamount = parseFloat(modifyNum(val))
    }
  }

  //calculateAndDisplaySpent(nextBudgetVal, tempSavings);
  return nextBudgetVal;
  //calculateTotal(tempSavings, nextBudgetVal);
};


//   // Calculating SPENT in budget
//   calculateSpentandSetBV(nextBudgetVal, nextTransaction);
//   setSavings(tempSavings);
//   setAutotrans(tempAuto);
// }

export const amountRemainingColor = (transaction, budgetItem) => {
  let defaultColor = "black";
  const left = amountRemainingInBudgetCategory(transaction, budgetItem)
  if (left < 0) {
    defaultColor = "red"
  } else {
    defaultColor = "black"
  }
  return defaultColor;
}


export const amountRemainingInBudgetCategory = (transaction, budgetItem) => {
  let spent = parseFloat(budgetItem.budgetamount);
  for (let x in transaction) {

    let expense = parseNumber(transaction[x].expense)
    let income = parseNumber(transaction[x].income)
    if (transaction[x].category === budgetItem.category) {
      if (expense > 0) { // && calculatePayperiod(transaction[x])
        spent -= expense
      } else if (expense > 0 && budgetItem.persist === true) {
        spent -= expense
        if (income > 0) {
          spent += income
        }
      }
    }
    return spent;
  }
}