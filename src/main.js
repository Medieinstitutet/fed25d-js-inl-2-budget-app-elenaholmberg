import "./style.css";

// Hämta elementen från HTML
const incomeInput = document.getElementById("incomeSum");
const addBtn = document.getElementById("addIncomeBtn");
const resultInput = document.getElementById("calculateIncome");

// När man klickar på knappen

let totalIncome = 0; //värdet ska nollas efter varje gång

addBtn.addEventListener("click", function () {
  const value = Number(incomeInput.value);
  /*input-fält är alltid sträng så jag måste göra om till Number. 
  Const value =... betyder att vi sparar om siffran i en variabel. Variabeln döper jag till value.*/

  totalIncome += value;
  resultInput.value = totalIncome;
  incomeInput.value = "";
});

const expenseInput = document.getElementById("#expenseSum");
const addBtn2 = document.getElementById("#addExpenseBtn");
const resultInput2 = document.getElementById("calculateExpense");

let totalExpense = 0;
