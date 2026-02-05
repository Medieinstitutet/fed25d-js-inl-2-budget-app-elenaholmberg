import "./style.css";

import categories from "./categories.json";

///---------------------------------------///
///--------------INKOMST------------------///
///---------------------------------------///

//filtrering
const incomeDropdown = document.querySelector("#incomeDropdown");
if (incomeDropdown) {
  categories.incomes.forEach((category) => {
    incomeDropdown.innerHTML += `<option value="${category.value}">${category.text}</option>`;
  });
}

//vid klick av radiobutton
const incomeBtn = document.querySelector<HTMLInputElement>("#chooseIncomeBtn");
const dropdownIn = document.querySelector<HTMLSelectElement>("#incomeDropdown");

const expenseBtn =
  document.querySelector<HTMLInputElement>("#chooseExpenseBtn");
const dropdownExp =
  document.querySelector<HTMLSelectElement>("#expensesDropdown");

// Alla dropdowns disabled från början
if (dropdownIn) dropdownIn.disabled = true;
if (dropdownExp) dropdownExp.disabled = true;

// När man klickar på inkomstdropdown
incomeBtn?.addEventListener("click", () => {
  if (!dropdownIn || !dropdownExp) return;

  dropdownIn.disabled = false; // aktivera inkomstdropdown
  dropdownExp.disabled = true; // stäng utgiftsdropdown
});

// När man klickar på utgiftsdropdown
expenseBtn?.addEventListener("click", () => {
  if (!dropdownIn || !dropdownExp) return;

  dropdownExp.disabled = false; // aktivera utgiftsdropdown
  dropdownIn.disabled = true; // stäng inkomstdropdown
});

///---------------------------------------///
///--------------UTGIFT------------------///
///---------------------------------------///

//filtrering
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
///--- När man klickar på radiobutton----///

let totalIncome = 0;

addBtn.addEventListener("click", function () {
  const value = Number(incoming.value);
  /*input-fält är alltid sträng, så jag måste göra om till Number. 
  Const value =... betyder att vi sparar om siffran i en variabel. Variabeln döper jag till value.
  dvs value är värdet "incoming" fast i nummer-format.*/

  if (!chooseIncomeBtn.checked) return;
  if (isNaN(value) || value === 0) return;

  totalIncome = totalIncome + value; //    betyder: ta det som redan finns i totalIncome och lägg till det nya värdet
});
