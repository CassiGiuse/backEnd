const values = document.getElementsByClassName("formField");
const spesaSecs = document.getElementById("spesaSecs");

let spesaItems = [];
let valoreSpesa = 0;
let numSpese = 0;
let counter = 1;

function setup() {
  const itemsRow = getItem("Counter");
  for (let i = 1; i < itemsRow; i++) {
    newRow();
  }
  saveSumSpesa();
  loadData();

}

function saveData() {
  for (let i of values) {
    if (i.value != null && i.value !== "") {
      storeItem(i.id, i.value);
    }
    if (!isNaN(i.value) && i.value != null && i.value !== "") {
      spesaItems.push(Number(i.value));
      storeItem("spesaSum", spesaItems);
    }
  }
  saveSumSpesa();
}

function deleteAll() {
  clearStorage();
  location.reload();
  cond = !cond;
}

function saveSumSpesa() {
  let SumSpesa = 0;
  const vect = getItem('spesaSum');
  for(let i of vect) {
    SumSpesa += i;
  }
  storeItem("sumSpesa", SumSpesa);

  let valoreSpesa = getItem("sumSpesa").toFixed(2);
  let spese = document.getElementById("spese");
  spese.textContent = "€" + valoreSpesa;
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
}
