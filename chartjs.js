const table = document.querySelector("#dataInput tbody");
const chartCanvas = document.getElementById("chartCanvas");
let chart;

// Táblázat inicializálása 5×5
for (let i = 0; i < 5; i++) {
  let row = document.createElement("tr");
  for (let j = 0; j < 5; j++) {
    let cell = document.createElement("td");
    let input = document.createElement("input");
    input.type = "number";
    input.value = Math.floor(Math.random() * 100);
    input.style.width = "60px";
    cell.appendChild(input);
    row.appendChild(cell);
  }
  table.appendChild(row);
}

function drawChart() {
  const values = [];
  const labels = [];

  // Csak az első sorból olvasunk be adatokat
  const firstRowInputs = table.querySelectorAll("tr:nth-child(1) input");
  firstRowInputs.forEach((input, index) => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) {
      values.push(val);
      labels.push(`Oszlop ${index + 1}`);
    }
  });

  if (chart) chart.destroy();

  chart = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Első sor értékei",
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
