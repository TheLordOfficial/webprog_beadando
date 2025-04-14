let data = [];

const tableBody = document.querySelector("#dataTable tbody");
const addForm = document.getElementById("addForm");
const searchInput = document.getElementById("search");
const headers = document.querySelectorAll("th[data-sort]");
let sortKey = null;
let sortAsc = true;

addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const city = document.getElementById("city").value.trim();
  const email = document.getElementById("email").value.trim();

  if (
    !name || !city || !email ||
    name.length > 30 || city.length > 30 || email.length > 50 ||
    isNaN(age) || age < 0 || age > 120
  ) {
    alert("Hibás adatok!");
    return;
  }

  data.push({ name, age, city, email });
  addForm.reset();
  renderTable();
});

searchInput.addEventListener("input", function () {
  renderTable(this.value.toLowerCase());
});

headers.forEach(th => {
  th.addEventListener("click", () => {
    const key = th.dataset.sort;
    if (sortKey === key) {
      sortAsc = !sortAsc;
    } else {
      sortKey = key;
      sortAsc = true;
    }
    renderTable(searchInput.value.toLowerCase());
  });
});

function renderTable(filter = "") {
  tableBody.innerHTML = "";
  let filtered = data.filter(d =>
    Object.values(d).some(val =>
      val.toString().toLowerCase().includes(filter)
    )
  );

  if (sortKey) {
    filtered.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
      return 0;
    });
  }

  filtered.forEach((d, i) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${d.name}</td>
      <td>${d.age}</td>
      <td>${d.city}</td>
      <td>${d.email}</td>
      <td>
        <button onclick="editRow(${i})" class="btn btn-sm btn-warning">✏️</button>
        <button onclick="deleteRow(${i})" class="btn btn-sm btn-danger">🗑️</button>
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
  const newEmail = prompt("Email:", item.email);

  if (
    newName && newCity && newEmail &&
    newName.length <= 30 && newCity.length <= 30 && newEmail.length <= 50 &&
    !isNaN(newAge) && newAge >= 0 && newAge <= 120
  ) {
    data[index] = {
      name: newName.trim(),
      age: parseInt(newAge),
      city: newCity.trim(),
      email: newEmail.trim()
    };
    renderTable(searchInput.value.toLowerCase());
  } else {
    alert("Hibás adat.");
  }
}
