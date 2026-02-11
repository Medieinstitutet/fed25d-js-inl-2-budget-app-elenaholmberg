import "./style.css";
import categories from "./categories.json";

///-------------------- INTERFACE --------------------///
interface IbudgetItems {
  desc: string;
  amount: string;
  type: "expense" | "income";
  category: string;
}

///-------------------- TYPESCRIPT --------------------///
const budgetItems: IbudgetItems[] = [];
const budgetForm: HTMLFormElement | null =
  document.querySelector("#budgetForm");

if (budgetForm) {
  budgetForm.addEventListener("submit", registerBudgetItem);
}

function registerBudgetItem(e: SubmitEvent) {
  e.preventDefault();

  const budgetData = new FormData(budgetForm!);
  const formData = Object.fromEntries(budgetData.entries());

  // Skapa ett korrekt IbudgetItems objekt
  const dataObject: IbudgetItems = {
    type: formData.type as "expense" | "income",
    amount: formData.amount as string,
    desc: formData.description as string,
    category:
      formData.type === "income"
        ? (formData.categoryIncome as string)
        : (formData.categoryExpense as string),
  };

  console.log("FormData som objekt:", dataObject);

  // Lägg till i budgetItems array
  budgetItems.push(dataObject);
  console.log("Alla budgetItems:", budgetItems);

  // Lägg till posten i gränssnittet
  addBudgetEntry();
}

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

// Knappen inaktiverad från början
addBtn.disabled = true;

///-------------------- FORM VALIDITY CHECK --------------------///
function checkFormValidity() {
  let typeSelected = chooseIncomeBtn.checked || chooseExpenseBtn.checked;
  let categorySelected = false;

  if (chooseIncomeBtn.checked) {
    categorySelected = incomeDropdown.selectedIndex > 0;
  } else if (chooseExpenseBtn.checked) {
    categorySelected = expensesDropdown.selectedIndex > 0;
  }

  let amountFilled = amountInput.value.trim() !== "";
  let descriptionFilled = descriptionInput.value.trim() !== "";

  addBtn.disabled = !(
    typeSelected &&
    categorySelected &&
    amountFilled &&
    descriptionFilled
  );
}

///-------------------- EVENTLISTENERS --------------------///
chooseIncomeBtn.addEventListener("change", () => {
  incomeDropdown.disabled = false;
  expensesDropdown.disabled = true;
  expensesDropdown.selectedIndex = 0;
  checkFormValidity();
});

chooseExpenseBtn.addEventListener("change", () => {
  expensesDropdown.disabled = false;
  incomeDropdown.disabled = true;
  incomeDropdown.selectedIndex = 0;
  checkFormValidity();
});

incomeDropdown.addEventListener("change", checkFormValidity);
expensesDropdown.addEventListener("change", checkFormValidity);
amountInput.addEventListener("input", checkFormValidity);
descriptionInput.addEventListener("input", checkFormValidity);

///-------------------- LÄGG TILL POST --------------------///
function addBudgetEntry() {
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
    alert("Fyll i alla fält!");
    return;
  }

  const entry = { type, category, amount, description };
  console.log("Ny post:", entry);

  if (type === "inkomst") incomeEntries.push(entry);
  if (type === "utgift") expenseEntries.push(entry);

  renderEntries();

  // Rensa formulär
  amountInput.value = "";
  descriptionInput.value = "";
  incomeDropdown.selectedIndex = 0;
  expensesDropdown.selectedIndex = 0;

  // Avmarkera radioknappar
  chooseIncomeBtn.checked = false;
  chooseExpenseBtn.checked = false;

  // Inaktivera dropdowns igen
  incomeDropdown.disabled = true;
  expensesDropdown.disabled = true;

  // Kolla om knappen ska stängas av igen
  checkFormValidity();
}

///-------------------- RENDER FUNKTION --------------------///
function renderEntries() {
  // Töm divarna
  incomeDiv.innerHTML = "<h3></h3>";
  expenseDiv.innerHTML = "<h3></h3>";

  // Totalsummor
  let totalIncome = 0;
  let totalExpense = 0;

  // Rendera inkomster
  incomeEntries.forEach((item, index) => {
    totalIncome += item.amount;

    const row = document.createElement("div");
    row.classList.add("entry");
    row.style.color = "green";

    row.innerHTML = `
      ${item.category} | ${item.amount} kr | ${item.description}
      <button class="deleteBtn" type="button">x</button>
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
    row.style.color = "red";

    row.innerHTML = `
      ${item.category} | ${item.amount} kr | ${item.description}
      <button class="deleteBtn" type="button">x</button>
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
      <h4>TOTALT:</h4>
      <p><span id="saldoValue">${saldo} kr</span></p>
    `;

    const saldoSpan = document.getElementById("saldoValue") as HTMLSpanElement;
    saldoSpan.style.color = saldo >= 0 ? "green" : "red";
  }
}
