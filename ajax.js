const apiUrl = "https://example.com/api"; // API URL

// Adatok lekérése (Read)
function getData() {
  fetch(`${apiUrl}/items`)
    .then(response => response.json())
    .then(data => {
      let output = '';
      let totalHeight = 0;
      let maxHeight = -Infinity;
      let count = data.length;

      data.forEach(item => {
        output += `<p>${item.name}: ${item.height} cm</p>`;
        totalHeight += item.height;
        maxHeight = Math.max(maxHeight, item.height);
      });

      const averageHeight = totalHeight / count;

      document.getElementById('dataDisplay').innerHTML = output;
      document.getElementById('statistics').innerHTML = `
        <p>Összeg: ${totalHeight} cm</p>
        <p>Átlag: ${averageHeight.toFixed(2)} cm</p>
        <p>Legnagyobb: ${maxHeight} cm</p>
      `;
    })
    .catch(error => console.error('Hiba a lekérés során:', error));
}

// Új adat létrehozása (Create)
function createData() {
  const name = document.getElementById("createName").value;
  const height = document.getElementById("createHeight").value;

  // Validáció
  if (name === "" || height === "") {
    alert("A név és magasság mező nem lehet üres!");
    return;
  }

  if (name.length > 30) {
    alert("A név maximum 30 karakter lehet!");
    return;
  }

  const newData = { name, height: parseInt(height) };

  fetch(`${apiUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newData)
  })
    .then(response => response.json())
    .then(data => {
      alert("Új adat hozzáadva!");
      getData();
    })
    .catch(error => console.error('Hiba az új adat hozzáadásakor:', error));
}

// Adat módosítása (Update)
function getDataForId() {
  const id = document.getElementById("updateId").value;

  fetch(`${apiUrl}/items/${id}`)
    .then(response => response.json())
    .then(data => {
      if (data) {
        document.getElementById("updateName").value = data.name;
        document.getElementById("updateHeight").value = data.height;
      } else {
        alert("Az ID nem található!");
      }
    })
    .catch(error => console.error('Hiba a módosítási adat lekérésekor:', error));
}

function updateData() {
  const id = document.getElementById("updateId").value;
  const name = document.getElementById("updateName").value;
  const height = document.getElementById("updateHeight").value;

  if (name === "" || height === "") {
    alert("A név és magasság mező nem lehet üres!");
    return;
  }

  if (name.length > 30) {
    alert("A név maximum 30 karakter lehet!");
    return;
  }

  const updatedData = { name, height: parseInt(height) };

  fetch(`${apiUrl}/items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedData)
  })
    .then(response => response.json())
    .then(data => {
      alert("Adat módosítva!");
      getData();
    })
    .catch(error => console.error('Hiba az adat módosításakor:', error));
}

// Adat törlése (Delete)
function deleteData() {
  const id = document.getElementById("deleteId").value;

  fetch(`${apiUrl}/items/${id}`, {
    method: "DELETE"
  })
    .then(response => {
      if (response.ok) {
        alert("Adat törölve!");
        getData();
      } else {
        alert("Nem található adat ezzel az ID-val!");
      }
    })
    .catch(error => console.error('Hiba az adat törlésekor:', error));
}
