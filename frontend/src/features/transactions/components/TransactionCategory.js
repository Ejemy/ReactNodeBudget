

function TransactionCategory({ budget, change, index, savings }) {

    return (
      <select
        name="dropdown"
        className="options"
        value={budget.category}
        onChange={(event) => change(event, index)}
      >
        <option value="income" className="paycheck">
          Income
        </option>
        {budget.map((budget, index) => (
          <option key={index} id="transaction-category" value={budget.category}>
            {budget.category}
          </option>
        ))}
        {savings.map((savings, index)=> (
          <option key={index} value={savings.category}>
            {savings.category}
          </option>
        ))}
      </select>
    );
  }


  export {TransactionCategory}