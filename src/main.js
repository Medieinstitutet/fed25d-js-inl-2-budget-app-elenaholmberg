import "./style.css";

///----------------------------------------///
///-------------------IN-------------------///
///-----------------------------------------///

// Hämta elementen från HTML  //varför döper man inte variabeln till samma som tillhörande id?
const incomeInput = document.getElementById("incomeSum"); //här skriver användaren sitt tal
const addBtn = document.getElementById("addIncomeBtn"); //Lägg till-knappen
const resultInput = document.getElementById("calculateIncome"); //Hit flyttas talet

// När man klickar på knappen

let totalIncome = 0; //värdet ska nollas efter varje gång

addBtn.addEventListener("click", function () {
  const value = Number(incomeInput.value);
  /*input-fält är alltid sträng, så jag måste göra om till Number. 
  Const value =... betyder att vi sparar om siffran i en variabel. Variabeln döper jag till value.
  dvs value är samma som incomeInput som i html heter #incomeSum (=>#incomeSum =>incomeInput =>value */

  totalIncome = totalIncome + value; //förstår inte helt vad denna rad är, gör eller kommer ifrån?

  resultInput.value = totalIncome;
  incomeInput.value = "";
});

///----------------------------------------///
///-------------------UT-------------------///
///-----------------------------------------///

const expenseInput = document.getElementById("expenseSum");
const addBtn2 = document.getElementById("addExpenseBtn");
const resultInput2 = document.getElementById("calculateExpense");

let totalExpense = 0;

addBtn2.addEventListener("click", function () {
  const value = Number(expenseInput.value);

  totalExpense = totalExpense + value;

  resultInput2.value = totalExpense;
  expenseInput.value = "";
});

///-----------------------------------///
///--------------UTRÄKNING------------///
///-----------------------------------///

const calculateIncome = document.getElementById("calculateIncome"); //hämtar värdet från inputen i html
const eraseIncomeBtn = document.getElementById("eraseIncomeBtn");

eraseIncomeBtn.addEventListener("click", function () {
  const value = Number(calculateIncome.value);

  calculateIncome.value = totalExpense;
});
