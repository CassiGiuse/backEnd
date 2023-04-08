const values = document.getElementsByClassName("guadField");
const guadSecs = document.getElementById("guadSecs");

let guadItems = [];
let valoreGuad = 0;
let numGuad = 0;
let counterGuad = 1;

function setup() {
  const itemsRowG = localStorage.getItem("CounterGuad");
  for (let i = 1; i < itemsRowG; i++) {
    newRowGuad();
  }

  saveSumGuad();
  loadDataGuad();
}

function saveDataGuad() {
  const uniqueValues = new Map();
  guadItems = [];
  for (let i of values) {
    if (i.value != null && i.value !== "") {
      storeItem(i.id, i.value);
    }
    if (!isNaN(i.value) && i.value != null && i.value !== "") {
      const numValue = Number(i.value);
      if (!uniqueValues.has(i.id) || uniqueValues.get(i.id) !== numValue) {
        const existingItem = guadItems.find((item) => item.id === i.id);
        if (!existingItem) {
          guadItems.push({ id: i.id, value: numValue });
        } else {
          existingItem.value = numValue;
        }
        uniqueValues.set(i.id, numValue);
      }
    }
  }

  storeItem("guadSum", JSON.stringify(guadItems));
  saveSumGuad();
}

function deleteAll() {
  if (
    confirm(
      "Stai per cancellare tutti gli elementi salvati nella memoria. Continuare operazione?"
    )
  ) {
    clearStorage();
    location.reload();
  }
}

function saveSumGuad() {
  let sumGuad = 0;
  let sumGabb = 0;
  let i = 0;
  const savedGuadItems = JSON.parse(getItem("guadSum")) || [];
  for (let item of savedGuadItems) {
    if (item.id == `guadProd${i}`) {
      const input = document.getElementById(item.id);
      if (input) {
        input.value = item.value;
      }
      sumGuad += item.value;
      i++;
    } else {
      sumGabb += item.value;
    }
  }
  storeItem("sumGuad", sumGuad.toFixed(2));
  storeItem("sumGabb", sumGabb);
}

function loadDataGuad() {
  for (let i of values) {
    let valoreRecuperato = getItem(i.id);
    if (valoreRecuperato !== null) {
      i.value = valoreRecuperato;
    }
  }
  saveSumGuad();
}

function newRowGuad() {
  var tableGuad = document.getElementById("guadSecs");
  var newRow = document.createElement("div");
  newRow.className = "tableGuad";
  newRow.innerHTML = `
  <div class="tableGuad">
    <div class="tableHead">
      <h3>Acquirente</h3>
      <h3>Guadagni</h3>
      <h3>Data</h3>
      <h3>Gabbiette vendute</h3>
    </div>
    <div class="tableCell">
      <input class="formField guadField" type="text" id="nomeGuad${counterGuad}">
      <input class="formField guadField" type="number" id="guadProd${counterGuad}">
      <input class="formField guadField" type="date" id="dataGuad${counterGuad}">
      <input class="formField guadField" type="number" id="gabbVend${counterGuad}">
    </div>
  </div>
  `;
  var prevDiv = document.querySelector(".tableGuad:last-of-type");
  tableGuad.insertBefore(newRow, prevDiv.nextSibling);
  var hr = document.createElement("hr");
  tableGuad.insertBefore(hr, newRow);
  counterGuad++;
  localStorage.setItem("CounterGuad", counterGuad);
  loadDataGuad();
  saveDataGuad();
}
