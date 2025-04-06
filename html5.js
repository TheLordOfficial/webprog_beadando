// 1. LocalStorage
function saveToStorage() {
    const val = document.getElementById("storageInput").value;
    localStorage.setItem("myData", val);
    document.getElementById("storageResult").textContent = val;
  }
  document.addEventListener("DOMContentLoaded", () => {
    const val = localStorage.getItem("myData");
    if (val) document.getElementById("storageResult").textContent = val;
  });
  
  // 2. Web Worker
  let worker;
  function startWorker() {
    if (typeof Worker !== "undefined") {
      if (!worker) {
        worker = new Worker("worker.js");
        worker.onmessage = e => {
          document.getElementById("workerResult").textContent = e.data;
          worker.terminate();
          worker = null;
        };
      }
    } else {
      alert("A böngésződ nem támogatja a Web Workert!");
    }
  }
  
  // 3. "SSE" szimuláció
  setInterval(() => {
    const now = new Date();
    document.getElementById("sseClock").textContent = now.toLocaleTimeString();
  }, 1000);
  
  // 4. Geolocation
  function getLocation() {
    if (!navigator.geolocation) {
      alert("A böngésződ nem támogatja a Geolocation API-t.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        document.getElementById("locationResult").textContent =
          `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
      },
      err => alert("Hiba: " + err.message)
    );
  }
  
  // 5. Drag & Drop
  const dragImg = document.getElementById("dragImg");
  const dropZone = document.getElementById("dropZone");
  
  dragImg.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", "dragImg");
  });
  
  dropZone.addEventListener("dragover", e => e.preventDefault());
  
  dropZone.addEventListener("drop", e => {
    e.preventDefault();
    dropZone.appendChild(dragImg);
  });
  
  // 6. Canvas
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(100, 100, 40, 0, 2 * Math.PI);
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.stroke();
  