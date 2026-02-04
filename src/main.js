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

///Inkommande///
const calculateIncome = document.getElementById("calculateIncome"); //hämtar värdet från inputen i html
const eraseIncomeBtn = document.getElementById("eraseIncomeBtn");

let totalIncomeErase = 0;

eraseIncomeBtn.addEventListener("click", function () {
  const value = Number(calculateIncome.value);

  calculateIncome.value = totalIncomeErase;
});

///Utgående///

const calculateExpense = document.getElementById("calculateExpense");
const eraseExpenseBtn = document.getElementById("eraseExpenseBtn");

let totalExpenseErase = 0;

eraseExpenseBtn.addEventListener("click", function () {
  const value = Number(calculateExpense.value);

  calculateExpense.value = totalExpenseErase;
});

///Totalt///

const totalSum = document.getElementById("totalSum"); // Hämta TOTALT-inputen från HTML
// Detta är rutan där summan (inkomst - utgift) ska visas

// Skapa en funktion som räknar totalen
function updateTotal() {
  // Räkna ut skillnaden mellan de totala inkomsterna och de totala utgifterna
  // totalIncome och totalExpense är variabler som du uppdaterar när användaren klickar på knappar
  const result = totalIncome - totalExpense;

  // Sätt resultatet i TOTALT-rutan så användaren ser summan
  totalSum.value = result;
}
//updateTotal är ett ord som jag själv väljer. I denna funktionen ska allt räknas ihop
