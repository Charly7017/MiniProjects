const inputDescription = document.querySelector("#tfDescription");
const inputAmount = document.querySelector("#tfAmount");
const form = document.querySelector(".transaction-form__form");
const ul = document.querySelector(".transaction-list__items");
const incomeShow = document.querySelector(".stats__value--income");
const expenseShow = document.querySelector(".stats__value--expense");
const balanceShow = document.querySelector(".balance__amount");

let contIncome = 0;
let contExpense = 0;
let arrTransactions = [];
let idCounter = 0;
let transactionObj = {};

getDataFromSessionStorage();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (inputDescription.value.trim().length === 0 || inputAmount.value.trim().length === 0) {
    alert("Both fields must have a value");
    return;
  }

  const transactionli = addTransaction(inputDescription.value, inputAmount.value);
  console.log(transactionli);

  ul.prepend(transactionli);
  form.reset();
});

function getDataFromSessionStorage() {
  idCounter = parseInt(sessionStorage.getItem("idCounter")) || 0;
  contIncome = parseFloat(sessionStorage.getItem("income")) || 0;
  contExpense = parseFloat(sessionStorage.getItem("expense")) || 0;

  incomeShow.textContent = "$" + contIncome.toFixed(2);
  expenseShow.textContent = "$" + contExpense.toFixed(2);
  balanceShow.textContent = "$" + (contIncome - contExpense).toFixed(2);


  const savedTransactions = JSON.parse(sessionStorage.getItem("allTransactions")) || [];
  arrTransactions = savedTransactions;

  savedTransactions.forEach(element => {
    const li = document.createElement("li");
    li.classList.add("transaction-list__item");
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.dataset.id = element.id;

    if(element.type === "Income"){
        li.style.color = "green";
    }
    else{
        li.style.color = "red";
    }

    li.innerHTML = `
      <span style="margin-right: 3rem">${element.description}</span>
      <span>
        $${parseFloat(element.amount).toFixed(2)}
        <button class="deleteTransactionBtn">x</button>
      </span>
    `;

    const btnDelete = li.querySelector(".deleteTransactionBtn");
    btnDelete.addEventListener("click", (e) => deleteTransaction(e));

    ul.appendChild(li);
  });
}

function addTransaction(description, amount) {
  const li = document.createElement("li");
  li.classList.add("transaction-list__item");
  li.style.display = 'flex';
  li.style.justifyContent = 'space-between';

  const numericAmount = parseFloat(amount);

  li.innerHTML = `
    <span style="margin-right: 3rem">${description}</span>
    <span>
      $${numericAmount.toFixed(2)}
      <button class="deleteTransactionBtn">x</button>
    </span>
  `;

  li.dataset.id = ++idCounter;
  sessionStorage.setItem("idCounter", idCounter);

  const btnDelete = li.querySelector(".deleteTransactionBtn");
  btnDelete.addEventListener("click", (e) => deleteTransaction(e));
  
  let transactionObj = {
    id: idCounter,
    description,
    amount: numericAmount,
  };

  checkValue(numericAmount,transactionObj);

  arrTransactions.unshift(transactionObj);
  sessionStorage.setItem("allTransactions", JSON.stringify(arrTransactions));

  if(transactionObj.type === "Income"){
    li.style.color = "green";
  }
  else{
    li.style.color = "red";
  }

  return li;
}

function deleteTransaction(e) {
  const liToDelete = e.target.closest(".transaction-list__item");
  const idToDelete = parseInt(liToDelete.dataset.id);
  const deleted = arrTransactions.find(p => p.id === idToDelete);
  if (deleted) {
    if (deleted.amount > 0) contIncome -= deleted.amount;
    else contExpense -= Math.abs(deleted.amount);

    sessionStorage.setItem("income", contIncome);
    sessionStorage.setItem("expense", contExpense);
    const balance = contIncome - contExpense;
    sessionStorage.setItem("balance", balance);


    incomeShow.textContent = "$" + contIncome.toFixed(2);
    expenseShow.textContent = "$" + contExpense.toFixed(2);
    balanceShow.textContent = "$" + balance.toFixed(2);
  }

  arrTransactions = arrTransactions.filter(p => p.id !== idToDelete);
  sessionStorage.setItem("allTransactions", JSON.stringify(arrTransactions));
  
  liToDelete.remove();
}

function checkValue(amount,transactionObj) {
  if (amount > 0) {
    contIncome += amount;
    sessionStorage.setItem("income", contIncome);
    incomeShow.textContent = "$" + contIncome.toFixed(2);
    transactionObj.type = "Income";
  } else {
    contExpense += Math.abs(amount);
    sessionStorage.setItem("expense", contExpense);
    expenseShow.textContent = "$" + contExpense.toFixed(2);
    transactionObj.type = "Expense";
  }

  const balance = contIncome - contExpense;
  sessionStorage.setItem("balance", balance);
  balanceShow.textContent = "$" + balance.toFixed(2);
}
