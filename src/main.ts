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
///---------AKTIVERING MED RADIOBTNS-------///
///-----------------------------------------///

const chooseIncomeBtn = document.getElementById("chooseIncomeBtn"); //Inkomst radio-button

// Alla dropdowns disabled från början
if (incomeDropdown) incomeDropdown.disabled = true;
if (expensesDropdown) expensesDropdown.disabled = true;

//Radiobuttons låses upp en i taget

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

///-----------------------------------------///
///---------RESULTAT FIELDSET---------------///
///-----------------------------------------///

///-----------inkomst-array------------------///
const incomeEntries = [];

const amountInput = document.getElementById("amountInput"); //här skriver användaren sitt tal
const descriptionInput = document.getElementById("descriptionInput"); //här skriver användaren beskrivningen
const addBtn = document.getElementById("addBtn"); //hämtar knappen "Lägg till"

addBtn.addEventListener("click", () => {
  const amount = Number(amountInput.value);
  const description = descriptionInput.value.trim();

  let type = "";
  let category = "";

  if (chooseIncomeBtn.checked) {
    type = "inkomst";
    category = incomeDropdown.options[incomeDropdown.selectedIndex].text;
  }

  if (chooseExpenseBtn.checked) {
    type = "utgift";
    category = expensesDropdown.options[expensesDropdown.selectedIndex].text;
  }

  if (!type || !category || !description || isNaN(amount) || amount === 0) {
    alert("Fyll i alla fält");
    return;
  }

  const entry = {
    type,
    category,
    amount,
    description,
  };

  incomeEntries.push(entry);

  renderEntries();

  // Rensa formulär
  amountInput.value = "";
  descriptionInput.value = "";
  incomeDropdown.selectedIndex = 0;
  expensesDropdown.selectedIndex = 0;
});

const entriesDiv = document.getElementById("incomeEntries");

function renderEntries() {
  entriesDiv.innerHTML = "";

  incomeEntries.forEach((item) => {
    const row = document.createElement("div");
    row.classList.add("entry");

    row.innerHTML = `
      <strong>${item.type.toUpperCase()}</strong> |
      ${item.category} |
      ${item.amount} kr |
      ${item.description}
    `;

    entriesDiv.appendChild(row);
  });
}
