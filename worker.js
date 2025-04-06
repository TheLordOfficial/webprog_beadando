// Szimulált számolás
let sum = 0;
for (let i = 0; i < 1e7; i++) {
  sum += i;
}
postMessage("Összeg: " + sum);
