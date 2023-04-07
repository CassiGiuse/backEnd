const values = document.getElementsByClassName("formField");
const spesaSecs = document.getElementById("spesaSecs");
const prodInput = document.getElementById("prodGabb");
const vendInput = document.getElementById("vendGabb");

let spesaItems = [];
let valoreSpesa = 0;
let numSpese = 0;
let counter = 1;

function setup() {
  const itemsRowS = getItem("Counter");
  for (let i = 1; i < itemsRowS; i++) {
    newRow();
  }

  prodInput.value = getItem("gabbProd");
  vendInput.value = getItem("gabbVend");

  valoreGuad = getItem("sumGuad");
  let guad = document.getElementById("guadagni");
  guad.textContent = "€" + valoreGuad;

  saveSumSpesa();
  loadProf();
  loadData();
}

function loadProf() {
  const boxProf = document.getElementsByClassName("most")[0];
  const spesa = getItem("sumSpesa");
  const guad = getItem("sumGuad");

  const prof = guad - spesa;
  storeItem("profitto", prof);

  let profitto = document.getElementById("profitto");
  profitto.textContent = "€" + prof;

  if (prof > 0) {
    boxProf.style.color = "var(--yesMoney)";
  } else if (prof == 0) {
    boxProf.style.color = "var(--profCol)";
  } else {
    boxProf.style.color = "var(--noMoney)";
  }
}

function saveData() {
  const uniqueValues = new Map();
  for (let i of values) {
    if (i.value != null && i.value !== "") {
      storeItem(i.id, i.value);
    }
    if (!isNaN(i.value) && i.value != null && i.value !== "") {
      const numValue = Number(i.value);
      if (!uniqueValues.has(i.id) || uniqueValues.get(i.id) !== numValue) {
        const existingItem = spesaItems.find((item) => item.id === i.id);
        if (!existingItem) {
          spesaItems.push({ id: i.id, value: numValue });
        } else {
          existingItem.value = numValue;
        }
        uniqueValues.set(i.id, numValue);
      }
    }
  }
  spesaItems = Array.from(new Set(spesaItems));
  storeItem("spesaSum", spesaItems);
  saveSumSpesa();
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

function saveSumSpesa() {
  let sumSpesa = 0;
  for (let item of spesaItems) {
    sumSpesa += item.value;
  }
  storeItem("sumSpesa", sumSpesa.toFixed(2));
  valoreSpesa = getItem("sumSpesa");
  let spese = document.getElementById("spese");
  spese.textContent = "€" + valoreSpesa;
  loadProf();
}

function loadData() {
  for (let i of values) {
    let valoreRecuperato = getItem(i.id);
    if (valoreRecuperato !== null) {
      i.value = valoreRecuperato;
    }
  }
  saveSumSpesa();
}

function newRow() {
  var tableSpesa = document.getElementById("spesaSecs");
  var newRow = document.createElement("div");
  newRow.className = "tableSpesa";
  newRow.innerHTML = `
    <div class="tableHead">
      <h3>Nome</h3>
      <h3>Spesa</h3>
      <h3>Data</h3>
      <h3>Commento</h3>
    </div>
    <div class="tableCell">
      <input class="formField" type="text" id="nomeProd${counter}">
      <input class="formField" type="number" id="spesaProd${counter}">
      <input class="formField" type="date" id="dataProd${counter}">
      <textarea class="formField" id="commentoProd${counter}"></textarea>
    </div>
  `;
  var prevDiv = document.querySelector(".tableSpesa:last-of-type");
  tableSpesa.insertBefore(newRow, prevDiv.nextSibling);
  var hr = document.createElement("hr");
  tableSpesa.insertBefore(hr, newRow);
  counter++;
  storeItem("Counter", counter);
  loadData();
  saveData();
}

function saveGabb() {
  const prodValue = prodInput.value;
  const vendValue = vendInput.value;

  if (prodValue !== null && vendValue !== null) {
    if (vendValue <= prodValue) {
      storeItem("gabbProd", prodInput.value);
      storeItem("gabbVend", vendInput.value);
    } else {
      alert(
        `Impossibile caricare valori. Le gabbiette vendute (${vendValue}) sono maggiori di quelle prodotte (${prodValue})`
      );
      prodInput.value = getItem("gabbProd");
      vendInput.value = getItem("gabbVend");
    }
  }
}
