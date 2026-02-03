import "./style.css";

//Hämtar alla mina element från html//
// Hämta elementen från HTML
const incomeInput = document.getElementById("incomeSum");
const addBtn = document.getElementById("addIncomeBtn");
const resultInput = document.getElementById("calculateIncome");

// När man klickar på knappen
let total = 0;

addBtn.addEventListener("click", function () {
  const value = Number(incomeInput.value);

  if (!value) {
    alert("Skriv in ett tal!");
    return;
  }

  total += value;
  resultInput.value = total;
  incomeInput.value = "";
});


/*
[] 2. Uppgift: lägg till ifylld siffra från input-fält Summa  (id="expenseSum") genom att trycka på "Lägg till-knappen
("id="addExpenseBtn"). Siffran ska då dyka upp i input-fält "Utgående:" (id="calculateExpense")