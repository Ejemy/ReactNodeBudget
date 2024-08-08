
import { modifyNum } from "../../../shared/utils/utilities";

export const handleTransactionChange = (data, target, key) => {
    let copy = {...data};
    console.log("handleTransactionChange", copy)
    switch (key) {
        case "date":
            copy.date = target;
            break;
        case "description":
            copy.description = target;
            break;
        case "category":
            copy.category = target;
            break;
        case "expense":
            copy.expense = modifyNum(target);
            break;
        case "income":
            copy.income = target;
            break;
    }
    return copy;
}

export const checkBlanks = (a,c,d,e) => {
    if(!a){
        alert("Enter a date.")
        return false;
    } else if (!c){
        alert("Choose a category.")
        return false;
    } else if(d=="¥0" && e=="¥0"){
        alert("Please enter expense or income.")
        return false;
    } else if(e>0 && d>0) {
        alert("Do not fill in both expense and income forms.")
        return false;
    } else {
        return true;
    }
}