import { CategoryAmount, CategoryName, AmountBox } from "./Category.js";

function Budget({
    budgetItem,
    index,
    handleCategoryName,
    handleInput,
    handleDelete,
    budget,
    transaction,
    calcP,
    settings,
    checkValue
  }) {
    return (
      <div className="row-budget">
        <input maxLength = "10" type="checkbox" id={index} value="checked" checked={budgetItem.check} className="checkbox" onChange={(event) => checkValue(event, budget)} />
        <div className="categorydiv">
          <CategoryName
            key={index}
            idval={index}
            val={budgetItem}
            id={budgetItem.id}
            categname={(eventData) => {
              handleCategoryName(eventData, budgetItem.id, budget);
            }}
            checkValue={(event) => {
              checkValue(event, budget)
            }}
          />
        </div>
        <div className="categoryamount" id="inputamount">
          <CategoryAmount
            key={index}
            idval={index}
            val={budgetItem.budgetamount}
            id={budgetItem.id}
            parentCallback={(event) => handleInput(event, budget, budgetItem.id)}
          />
        </div>
        <div className="amount-box" id="amountdiv">
          <AmountBox
            key={index}
            idval={index}
            budgetItem={budgetItem}
            Spent={budgetItem.spentamount}
            transaction={transaction}
            calcP={calcP}
            pd={settings}
          />
        </div>
        
      </div>
    );
  }


  export { Budget }
  