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

// När man klickar på inkomst button => dropdown aktiveras
incomeBtn?.addEventListener("click", () => {
  if (!dropdownIn || !dropdownExp) return;

  dropdownIn.disabled = false; // aktivera inkomstdropdown
  dropdownExp.disabled = true; // stäng utgiftsdropdown
});

// När man klickar på utgifts button => dropdown aktiveras
expenseBtn?.addEventListener("click", () => {
  if (!dropdownIn || !dropdownExp) return;

  dropdownExp.disabled = false; // aktivera utgiftsdropdown
  dropdownIn.disabled = true; // stäng inkomstdropdown
});
