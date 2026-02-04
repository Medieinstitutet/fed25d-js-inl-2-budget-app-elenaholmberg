import "./style.css";

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
