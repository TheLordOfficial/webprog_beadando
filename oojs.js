class Felhasznalo {
    constructor(nev, kor, email) {
      this.nev = nev;
      this.kor = kor;
      this.email = email;
    }
  
    toString() {
      return `${this.nev} (${this.kor}) - ${this.email}`;
    }
  }
  
  const felhasznalok = [];
  
  function hozzaad() {
    const nev = document.getElementById("nev").value;
    const kor = parseInt(document.getElementById("kor").value);
    const email = document.getElementById("email").value;
  
    if (!nev || isNaN(kor) || !email) {
      alert("Töltsd ki az összes mezőt!");
      return;
    }
  
    const uj = new Felhasznalo(nev, kor, email);
    felhasznalok.push(uj);
    frissitLista();
  }
  
  function frissitLista() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    felhasznalok.forEach(f => {
      const li = document.createElement("li");
      li.textContent = f.toString();
      lista.appendChild(li);
    });
  }
  