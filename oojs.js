// Autó osztály
class Car {
  constructor(brand, model, year, color) {
      this.brand = brand;
      this.model = model;
      this.year = year;
      this.color = color;
  }

  // Metódus, amely visszaadja az autó információit
  getCarInfo() {
      return `${this.year} ${this.brand} ${this.model} (${this.color})`;
  }

  // Metódus, amely hozzáadja az autót a dokumentumhoz
  displayCar() {
      const carDiv = document.createElement("div");
      carDiv.textContent = this.getCarInfo();
      document.getElementById("car-list").appendChild(carDiv);
  }
}

// ElektromosAutó osztály, amely az Autó osztályt örökli
class ElectricCar extends Car {
  constructor(brand, model, year, color, batteryCapacity) {
      super(brand, model, year, color); // Az ősosztály konstruktorának meghívása
      this.batteryCapacity = batteryCapacity; // Elektromos autó egyedi jellemzője
  }

  // Az elektromos autó saját információinak megjelenítése
  getCarInfo() {
      return `${super.getCarInfo()} - Akkumulátor kapacitás: ${this.batteryCapacity} kWh`;
  }

  // Elektromos autó megjelenítése
  displayCar() {
      const carDiv = document.createElement("div");
      carDiv.textContent = this.getCarInfo();
      carDiv.style.color = "green"; // Elektromos autók zöld színnel jelennek meg
      document.getElementById("car-list").appendChild(carDiv);
  }
}

// Példányosítás és autók hozzáadása
const car1 = new Car("Toyota", "Corolla", 2020, "Fehér");
const car2 = new ElectricCar("Tesla", "Model 3", 2021, "Fekete", 75);
const car3 = new Car("Ford", "Focus", 2018, "Kék");
const car4 = new ElectricCar("Nissan", "Leaf", 2022, "Zöld", 40);
const car5 = new Car("BMW", "3 Series", 2019, "Piros");
const car6 = new ElectricCar("Audi", "e-tron", 2023, "Ezüst", 95);
const car7 = new Car("Volkswagen", "Golf", 2020, "Sárga");

// Autók megjelenítése a weboldalon
car1.displayCar();
car2.displayCar();
car3.displayCar();
car4.displayCar();
car5.displayCar();
car6.displayCar();
car7.displayCar();