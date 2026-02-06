import "./style.css";
import categories from "./categories.json";

///-------------------- FILTRERING --------------------///
const incomeDropdown = document.getElementById(
  "incomeDropdown",
) as HTMLSelectElement;
const expensesDropdown = document.getElementById(
  "expensesDropdown",
) as HTMLSelectElement;

if (incomeDropdown) {
  categories.incomes.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.value;
    option.textContent = category.text;
    incomeDropdown.appendChild(option);
  });
}

if (expensesDropdown) {
  categories.expenses.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.value;
    option.textContent = category.text;
    expensesDropdown.appendChild(option);
  });
}

///-------------------- RADIOBUTTON LOGIK --------------------///
const chooseIncomeBtn = document.getElementById(
  "chooseIncomeBtn",
) as HTMLInputElement;
const chooseExpenseBtn = document.getElementById(
  "chooseExpenseBtn",
) as HTMLInputElement;

if (incomeDropdown) incomeDropdown.disabled = true;
if (expensesDropdown) expensesDropdown.disabled = true;

chooseIncomeBtn?.addEventListener("change", () => {
  if (!incomeDropdown || !expensesDropdown) return;
  incomeDropdown.disabled = false;
  expensesDropdown.disabled = true;
  expensesDropdown.selectedIndex = 0;
});

chooseExpenseBtn?.addEventListener("change", () => {
  if (!incomeDropdown || !expensesDropdown) return;
  expensesDropdown.disabled = false;
  incomeDropdown.disabled = true;
  incomeDropdown.selectedIndex = 0;
});

///-------------------- ARRAYER --------------------///
const incomeEntries: {
  type: string;
  category: string;
  amount: number;
  description: string;
}[] = [];
const expenseEntries: {
  type: string;
  category: string;
  amount: number;
  description: string;
}[] = [];

const amountInput = document.getElementById("amountInput") as HTMLInputElement;
const descriptionInput = document.getElementById(
  "descriptionInput",
) as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;

const incomeDiv = document.getElementById("incomeEntries") as HTMLDivElement;
const expenseDiv = document.getElementById("outgoingEntries") as HTMLDivElement;
const resultDiv = document.getElementById("resultEntrie") as HTMLDivElement;

///-------------------- LÄGG TILL POST --------------------///
addBtn?.addEventListener("click", () => {
  const amount = Number(amountInput.value);
  const description = descriptionInput.value.trim();

  let type = "";
  let category = "";

  if (chooseIncomeBtn?.checked) {
    type = "inkomst";
    category = incomeDropdown.options[incomeDropdown.selectedIndex].text;
  }

  if (chooseExpenseBtn?.checked) {
    type = "utgift";
    category = expensesDropdown.options[expensesDropdown.selectedIndex].text;
  }

  if (!type || !category || !description || isNaN(amount) || amount === 0) {
    alert("Fyll i alla fält!");
    return;
  }

  const entry = { type, category, amount, description };

  if (type === "inkomst") incomeEntries.push(entry);
  if (type === "utgift") expenseEntries.push(entry);

  renderEntries();

  // Rensa formulär
  amountInput.value = "";
  descriptionInput.value = "";
  incomeDropdown.selectedIndex = 0;
  expensesDropdown.selectedIndex = 0;
});

///-------------------- RENDER FUNKTION --------------------///
function renderEntries() {
  // Töm divarna
  incomeDiv.innerHTML = "<h3>INKOMSTER</h3>";
  expenseDiv.innerHTML = "<h3>UTGIFTER</h3>";

  // Totalsummor
  let totalIncome = 0;
  let totalExpense = 0;

  // Rendera inkomster
  incomeEntries.forEach((item, index) => {
    totalIncome += item.amount;

    const row = document.createElement("div");
    row.classList.add("entry");
    row.style.color = "green"; // inkomster gröna

    row.innerHTML = `
      ${item.category} | ${item.amount} kr | ${item.description}
      <button class="deleteBtn">Ta bort</button>
    `;

    const btn = row.querySelector(".deleteBtn") as HTMLButtonElement;
    btn.addEventListener("click", () => {
      incomeEntries.splice(index, 1);
      renderEntries();
    });

    incomeDiv.appendChild(row);
  });

  // Rendera utgifter
  expenseEntries.forEach((item, index) => {
    totalExpense += item.amount;

    const row = document.createElement("div");
    row.classList.add("entry");
    row.style.color = "red"; // utgifter röda

    row.innerHTML = `
      ${item.category} | ${item.amount} kr | ${item.description}
      <button class="deleteBtn">X</button>
    `;

    const btn = row.querySelector(".deleteBtn") as HTMLButtonElement;
    btn.addEventListener("click", () => {
      expenseEntries.splice(index, 1);
      renderEntries();
    });

    expenseDiv.appendChild(row);
  });

  // Visa totalsumma med färg på saldo
  if (resultDiv) {
    const saldo = totalIncome - totalExpense;
    resultDiv.innerHTML = `
      
      <div class="inOutEntries">
      <p class="green">Inkomster: ${totalIncome} kr</p>
      <p class="red">Utgifter: ${totalExpense} kr</p>
      </div>
      <h3>TOTALER</h3>
      <p>Saldo: <span id="saldoValue">${saldo} kr</span></p>
    `;

    const saldoSpan = document.getElementById("saldoValue") as HTMLSpanElement;
    saldoSpan.style.color = saldo >= 0 ? "green" : "red";
  }
}
