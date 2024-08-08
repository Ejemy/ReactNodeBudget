import "./styles/App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";

import { Budget } from "./features/budget/components/Budget.js";
import { Row } from "./features/transactions/components/Row.js";
import { Savings } from "./features/savings/components/Savings.js"

import { useState, useEffect, useCallback } from "react";
import {
  handleCategoryName,
  handleBudgetAmountInput,
} from "./features/budget/utils/utilities.js";
import setState from "./shared/utils/setState.js";
import { newItem, deleteItem, checkValue, randomId } from "./shared/utils/utilities.js";
import { handleSavingsAmountInput, handleSavingsName } from "./features/savings/utils/utilities.js";
import { checkBlanks, handleTransactionChange } from "./features/transactions/utils/utilities.js";
const API_URL = "https://crispy-guacamole-r5vv99759pvh4pg.github.dev/";

export default function App() {
  const date = new Date();

  const [budget, setBudget] = useState(
    Array({
      type: "budget",
      id: "abc123",
      category: "",
      budgetamount: 0,
      spentamount: 0,
      date: date.toISOString(),
      check: false,
    })
  );

  //budgeted total i think
  const [total, setTotal] = useState(0);

  const [transaction, setTransaction] = useState(
    Array({
      type: "transaction",
      id: "123abc",
      description: "",
      date: date.toISOString(),
      category: "",
      expense: 0,
      income: 0,
      check: false
    })
  );

  const [newTransaction, setNewTransaction] = useState(
    {
      id: "",
      description: "",
      date: date.toISOString(),
      category: "",
      expense: 0,
      income: 0,
      check: false
    }
  )

  const [firstload, setFirstload] = useState(true);
  const [deleteBool, setDeletebool] = useState([false, []]);

  const [savings, setSavings] = useState(
    Array({
      type: "savings",
      id: "1a2b3c",
      category: "",
      savingsamount: 0,
      total: 0,
      date: date.toISOString(),
      check: false,
    })
  );

  const [statistics, setStatistics] = useState({});


  useEffect(() => {
    fetch("/load", {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("/load FETCH");
        if (data.categories[0]) {
          console.log(data.categories)
          setState(data.categories, setBudget);
        }
        if (data.transactions[0]) {
          setState(data.transactions, setTransaction)
        }
        if (data.savings[0]) {
          setState(data.savings, setSavings)
        }
      });
  }, []);

  useEffect(() => {
    console.log("useEffect for update budget")

    fetch("/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budget),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Budget was updated: ", data)
      })

  }, [budget])



  return (
    <div className="App">
      <FontAwesomeIcon
        icon={faTrash}
        className="delete-button-container"
        onClick={(e) => {
          setState(deleteItem(e, budget), setBudget)
          setState(deleteItem(e, transaction), setTransaction)
          setState(deleteItem(e, savings), setSavings)
        }}
      />
      {/* <Delete
        deleteItem={(e) => {
          setState(deleteItem(e, budget), setBudget);
          setState(deleteItem(e, transaction), setTransaction);
          setState(deleteItem(e, savings), setSavings);
        }
        }
      /> */}
      <div className="budget">
        <h1>Budget</h1>
        <div className="budget-titles">
          <FontAwesomeIcon
            icon={faSquarePlus}
            className="newbutton"
            onClick={() => { setState(newItem(budget), setBudget) }}
          />

          <h3 className="cat-title">Category</h3>
          <h3 className="budget-title">Budgeted</h3>
          <h3 className="remain-title">Remaining</h3>
        </div>

        {budget.map((value, index) => (
          <Budget
            budgetItem={value}
            index={index}
            handleCategoryName={(x, y, z) =>
              setState(handleCategoryName(x, y, z), setBudget)
            }
            handleInput={(x, y, z) =>
              setState(handleBudgetAmountInput(x, y, z), setBudget)
            }
            budget={budget}
            transaction={transaction}
            key={index}
            checkValue={(event) => setState(checkValue(event, budget), setBudget)}
          />
        ))}
      </div>
      <div className="transactions">
        <h1>Transactions</h1>
        <div className="titles">
          <h3 className="expend-title">Expense</h3>
          <h3 className="income-title">Income</h3>
        </div>
        <div className="save-transaction">
          <FontAwesomeIcon
            icon={faFloppyDisk}
            className="newbutton"
            onClick={() => {
              const copy = transaction.slice();
              const date = document.getElementById("transaction-date").value;
              const memo = document.getElementById("transaction-memo").value;
              const category = document.getElementById("transaction-category").value;
              const expense = document.getElementById("transaction-expense").value;
              const income = document.getElementById("transaction-income").value;
              if (checkBlanks(date, category, expense, income)) {
                const newt = {
                  id: randomId(),
                  date: date,
                  description: memo,
                  category: category,
                  expense: expense,
                  income: income,
                  check: false,
                }
                copy.push(newt)
                setState(copy, setTransaction);
                setState({
                  id: "",
                  description: "",
                  date: "",
                  category: "",
                  expense: 0,
                  income: 0,
                  check: false
                }, setNewTransaction);
              }

            }}
          />
          <div className="new-transaction-container">
            <Row
              save={true}
              transaction={transaction}
              budget={budget}
              savings={savings}
              handleTransactionChange={(x, y, z) => setState(handleTransactionChange(x, y, z), setNewTransaction)}
              data={newTransaction}
            />
          </div>

        </div>
        {transaction.map((event, index) => (
          <Row
            key={index}
            checkValue={(event) => setState(checkValue(event, transaction), setTransaction)}
            data={event}
            index={index}
            transaction={transaction}
            budget={budget}
            savings={savings}

          />
        ))}
      </div>
      <div className="savings">
        <h1>Savings</h1>
        <div className="savings-titles">
          <FontAwesomeIcon
            icon={faSquarePlus}
            className="newbutton"
            onClick={() => { setState(newItem(savings), setSavings) }}
          />
          <h3 className="name-title">Name</h3>
          <h3 className="total-title">Total</h3>
        </div>
        {savings.map((value, index) => (
          <Savings
            savingsItem={value}
            index={index}
            savingsCallback={(x, y, z) => setState(handleSavingsAmountInput(x, y, z), setSavings)}
            savingsname={(x, y, z) => setState(handleSavingsName(x, y, z), setSavings)}
            savings={savings}
            checkValue={(event) => setState(checkValue(event, savings), setSavings)}
            transactions={transaction}

          />
        ))}
      </div>
    </div>
  );
}