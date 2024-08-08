import { modifyNum, addComas } from "../../../shared/utils/utilities.js";



function Row({
  save,
  index,
  data,
  transaction,
  budget,
  checkValue,
  handleTransactionChange,
  savings
}) {
  let hidden = "";
  if (save) {
    hidden = "hidden";
  }
  return (
    <div className="row-transaction" id={index}>
      <input style={{ "visibility": hidden }} type="checkbox" id={index} value="checked" defaultChecked={data.check} className="checkbox" onClick={(event) => checkValue(event, transaction)} />
      <input
        placeholder="Date"
        className="date"
        type="date"
        value={data.date/*.toString().slice(0, 10)*/}
        id="transaction-date"
        onChange={(event) => {
          if (save) {
            handleTransactionChange(data, event.target.value, "date")
          }
        }}

      />
      <input
      maxLength = "25"
        placeholder="Memo"
        className="trans-name"
        id="transaction-memo"
        value={data.description}
        onChange={(event) => {
          if (save) {
            handleTransactionChange(data, event.target.value, "description")
          }
        }}
      />
      <select
        name="dropdown"
        className="options"
        value={data.category}
        id="transaction-category"
        onChange={(event) => {
          if (save) {
            handleTransactionChange(data, event.target.value, "category")
          }
        }
        }
      >
        <option value="income" className="paycheck">
          Income
        </option>
        {budget.map((budget, index) => (
          <option key={index}  value={budget.category}>
            {budget.category}
          </option>
        ))}
        {savings.map((savings, index) => (
          <option key={index} value={savings.category}>
            {savings.category}
          </option>
        ))}
      </select>
      <input
      maxLength = "10"
        placeholder="Expenditure"
        className="expend"
        value={"¥" + addComas(modifyNum(data.expense).toLocaleString())}
        id="transaction-expense"
        onChange={(event) => {
          if (save) {
            handleTransactionChange(data, event.target.value, "expense")
          }
        }}
      />
      <input
      maxLength = "10"
        placeholder="Income"
        className="income"
        value={"¥" + addComas(modifyNum(data.income).toLocaleString())}
        id="transaction-income"
        onChange={(event) => {
          if (save) {
            handleTransactionChange(data, event.target.value, "income")
          }
        }}
      />

    </div>
  );
}


export { Row }