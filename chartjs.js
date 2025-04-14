const table = document.querySelector("#dataInput tbody");
const chartCanvas = document.getElementById("chartCanvas");
let chart;

// Táblázat inicializálása 5×5
for (let i = 0; i < 5; i++) {
  let row = document.createElement("tr");

  // Sor feltöltése véletlenszerű adatokkal
  for (let j = 0; j < 5; j++) {
    let cell = document.createElement("td");
    let input = document.createElement("input");
    input.type = "number";
    input.value = Math.floor(Math.random() * 100);
    input.style.width = "60px";
    cell.appendChild(input);
    row.appendChild(cell);
  }

  // Ábrázolás gomb hozzáadása
  let buttonCell = document.createElement("td");
  let button = document.createElement("button");
  button.textContent = "Ábrázolás";
  button.onclick = function() {
    drawChart(i); // Az aktuális sor indexét adjuk át
  };
  buttonCell.appendChild(button);
  row.appendChild(buttonCell);

  table.appendChild(row);
}

function drawChart(rowIndex) {
  const values = [];
  const labels = [];

  // A kiválasztott sor adatainak lekérése
  const rowInputs = table.querySelectorAll(`tr:nth-child(${rowIndex + 1}) input`);
  rowInputs.forEach((input, index) => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) {
      values.push(val);
      labels.push(`Oszlop ${index + 1}`);
    }
  });

  if (chart) chart.destroy(); // Ha már van diagram, töröljük

  chart = new Chart(chartCanvas, {
    type: "line", // Vonaldiagram
    data: {
      labels: labels,
      datasets: [{
        label: `Sor ${rowIndex + 1} értékei`,
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Félig átlátszó háttér
        borderColor: "rgba(54, 162, 235, 1)", // A vonal színe
        borderWidth: 2,
        fill: true // Töltsük ki a vonal alatti részt
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
