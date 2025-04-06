let data = [];

const tableBody = document.querySelector("#dataTable tbody");
const addForm = document.getElementById("addForm");
const searchInput = document.getElementById("search");

addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const city = document.getElementById("city").value.trim();

  if (!name || !city || name.length > 30 || city.length > 30 || isNaN(age)) {
    alert("Hibás adatok!");
    return;
  }

  data.push({ name, age, city });
  addForm.reset();
  renderTable();
});

searchInput.addEventListener("input", function () {
  renderTable(this.value.toLowerCase());
});

function renderTable(filter = "") {
  tableBody.innerHTML = "";
  let filtered = data.filter(
    d => d.name.toLowerCase().includes(filter)
  );
  filtered.forEach((d, i) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${d.name}</td>
      <td>${d.age}</td>
      <td>${d.city}</td>
      <td>
        <button onclick="editRow(${i})">✏️</button>
        <button onclick="deleteRow(${i})">🗑️</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function deleteRow(index) {
  if (confirm("Biztosan törlöd ezt a sort?")) {
    data.splice(index, 1);
    renderTable(searchInput.value.toLowerCase());
  }
}

function editRow(index) {
  const item = data[index];
  const newName = prompt("Név:", item.name);
  const newAge = prompt("Kor:", item.age);
  const newCity = prompt("Város:", item.city);

  if (
    newName && newCity &&
    newName.length <= 30 && newCity.length <= 30 &&
    !isNaN(newAge)
  ) {
    data[index] = {
      name: newName.trim(),
      age: parseInt(newAge),
      city: newCity.trim()
    };
    renderTable(searchInput.value.toLowerCase());
  } else {
    alert("Hibás adat.");
  }
}

// Rendezés
document.querySelectorAll("th[data-sort]").forEach(th => {
  th.addEventListener("click", () => {
    const key = th.dataset.sort;
    data.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    renderTable(searchInput.value.toLowerCase());
  });
});
