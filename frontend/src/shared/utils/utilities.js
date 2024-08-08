export const modifyNum = (arr) => {
    let filterArr = [];
    if (!arr) {
      return 0
    }
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].match(/\d/)) {
        filterArr.push(arr[j]);
      }
    }
    if (filterArr[0] === "0") {
      filterArr.shift();
    }
    let boxvalstr = filterArr.join("");
    return boxvalstr;
  }
  
  export const addComas = (val) => {
    let newNum;
    if (typeof val === "string") {
      newNum = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else if (!val) {
      newNum = 0;
    } else {
      newNum = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    }
  
    //replace( /\d{1,3}(?=(\d{3})+(?!\d))/g , "$&,")
    return newNum;
  }
  
  export const randomId = () => {
    const abc = "abcdefghijklmnopqrstuvwxyz!#$%";
    const ranNum = Math.floor(Math.random() * 100);
    const ranNum2 = Math.floor(Math.random() * 100);
    const ranLet = abc[Math.floor(Math.random() * abc.length)];
    const ranLet2 = abc[Math.floor(Math.random() * abc.length)];
    const newId = ranNum + ranLet + ranNum2 + ranLet2;
    return newId;
  }
  
  export const newItem = (itemState) => {
    const stateCopy = itemState.slice();
    const newObject = { ...itemState[0] };
    const wipedObject = wipeObject(newObject)
    stateCopy.push(wipedObject)
    return stateCopy;
  }
  
  export const deleteItem = (e, itemState) => {
  
    const stateCopy = itemState.slice();
    const newItemState = []
    for (let i in stateCopy) {
      if (!stateCopy[i].check) {
        newItemState.push(stateCopy[i])
      }
    }
    // if (newItemState.length === stateCopy.length) {
    //   const wipedObject = wipeObject(stateCopy[0])
    //   return [wipedObject];
    // } else {
    return newItemState;
    // }
  }
  
  function wipeObject(newObject) {
    for (const [key] of Object.entries(newObject)) {
      if (typeof newObject[key] == "number") {
        newObject[key] = 0
      } else if (typeof newObject[key] == "boolean") {
        newObject[key] = false;
      }
      else {
        newObject[key] = ""
      }
    }
    newObject.id = randomId();
    newObject.date = new Date().toISOString();
    return newObject;
  }
  
  
  
  function calculateTotal(savingss, boxv) {
    let total = 0;
    for (let x in boxv) {
      total += boxv[x][2];
    }
    for (let z in savingss) {
      //add savings to budgeted total
      total += savingss[z][2];
    }
    return total;
    //setTotal(total);
  }
  
  
  export const calculatePayperiod = (transactionItem) => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const transactionMonth = transactionItem.date.getMonth();
    const transactionYear = transactionItem.date.getFullYear();
    if (transactionMonth === month && transactionYear === year) {
      return true;
    }
    return false;
  }
  
  export const checkValue = (e, itemState) => {
    const stateCopy = itemState.slice();
    for (let i in stateCopy) {
      if (i === e.target.id) {
        stateCopy[i].check = e.target.checked
      }
    }
    return stateCopy;
  }
  
  
  export const parseNumber = (num) => {
    let newNum = parseFloat(num.toString().match(/\d+/g).join(""));
    if (!num) {
      return 0;
    }
    return newNum;
  }
  
  function calculateSpent(nextBudgetVal, nextTransaction) {
    // for (let x in nextBudgetVal) {
    //   let spent = 0;
  
    //   for (let ii in nextTransaction) {
    //     const pp = calculatePayperiod(nextTransaction[ii][2]);
  
    //     console.log("calculate spent and set BV , payperiod? ", pp);
    //     if (
    //       nextBudgetVal[x][1] === nextTransaction[ii][3] && //if categories match, expense is present, and
    //       nextTransaction[ii][4] > 0 &&
    //       pp
    //     ) {
    //       console.log("updating how much spent for...", nextBudgetVal[x][1]);
    //       spent += nextTransaction[ii][4];
    //       console.log("spent is... ", spent);
    //     } else if (
    //       nextBudgetVal[x][1] === nextTransaction[ii][3] && //if categories match, income present, and
    //       nextTransaction[ii][5] > 0 &&
    //       pp
    //     ) {
    //       spent -= nextTransaction[ii][5];
    //       console.log("Calculating how much spent for...", nextBudgetVal[x][1]);
    //       console.log("spent, ", spent);
    //     }
    //   }
    //   nextBudgetVal[x] = [
    //     nextBudgetVal[x][0],
    //     nextBudgetVal[x][1],
    //     nextBudgetVal[x][2],
    //     spent,
    //     nextBudgetVal[x][4],
    //     nextBudgetVal[x][5],
    //   ];
    // }
    // setBudget(nextBudgetVal);
  }