import "./style.css";

import categories from "./categories.json";

///---------------------------------------///
///--------------FILTRERING---------------///
///---------------------------------------///
const incomeDropdown = document.querySelector("#incomeDropdown");
if (incomeDropdown) {
  categories.incomes.forEach((category) => {
    incomeDropdown.innerHTML += `<option value="${category.value}">${category.text}</option>`;
  });
}

const expensesDropdown = document.querySelector("#expensesDropdown");
if (expensesDropdown) {
  categories.expenses.forEach((category) => {
    expensesDropdown.innerHTML += `<option value="${category.value}">${category.text}</option>`;
  });
}

///----------------------------------------///
///-------------------IN-------------------///
///-----------------------------------------///

const incoming = document.getElementById("incoming"); //här skriver användaren sitt tal
const chooseIncomeBtn = document.getElementById("chooseIncomeBtn"); //Inkomst radio-button
const addBtn = document.getElementById("addBtn"); //knappen flyttar ner summan i nästa fieldset
const incomeInput = document.getElementById("incomeInput");

// Alla dropdowns disabled från början
if (incomeDropdown) incomeDropdown.disabled = true;
if (expensesDropdown) expensesDropdown.disabled = true;

//Radiobuttons låses upp en i tagetconst chooseExpenseBtn = document.getElementById("chooseExpenseBtn");

chooseIncomeBtn?.addEventListener("change", () => {
  if (!incomeDropdown || !expensesDropdown) return;

  incomeDropdown.disabled = false;
  expensesDropdown.disabled = true;
  expensesDropdown.selectedIndex = 0;

  chooseExpenseBtn.disabled = false;
});

chooseExpenseBtn?.addEventListener("change", () => {
  if (!incomeDropdown || !expensesDropdown) return;

  expensesDropdown.disabled = false;
  incomeDropdown.disabled = true;
  incomeDropdown.selectedIndex = 0;

  chooseIncomeBtn.disabled = false;
});
