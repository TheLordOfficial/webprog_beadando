function loadData() {
    fetch("adatok.json")
      .then(res => res.json())
      .then(data => {
        const out = document.getElementById("output");
        out.innerHTML = "<h2>Felhasználók:</h2>";
  
        const table = document.createElement("table");
        table.border = "1";
        const headRow = table.insertRow();
        ["Név", "Kor", "Email"].forEach(text => {
          const th = document.createElement("th");
          th.textContent = text;
          headRow.appendChild(th);
        });
  
        data.forEach(user => {
          const row = table.insertRow();
          row.insertCell().textContent = user.nev;
          row.insertCell().textContent = user.kor;
          row.insertCell().textContent = user.email;
        });
  
        out.appendChild(table);
      })
      .catch(err => {
        document.getElementById("output").textContent = "Hiba történt: " + err;
      });
  }
  