/* ================== STATE ================== */
let saldo = 0;
let riwayat = [];
let saldoVisible = true;
let qrScanner = null;

/* ================== LOAD & SAVE ================== */
function loadData() {
  saldo = Number(localStorage.getItem("saldo")) || 0;
  riwayat = JSON.parse(localStorage.getItem("riwayat")) || [];
  updateSaldo();
  renderRiwayat();
}

function saveData() {
  localStorage.setItem("saldo", saldo);
  localStorage.setItem("riwayat", JSON.stringify(riwayat));
}

/* ================== LOGIN ================== */
function login() {
  const pin = document.getElementById("pinInput").value;
  const pinTersimpan = localStorage.getItem("pin") || "1234";

  if (pin === pinTersimpan) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("wallet").classList.remove("hidden");
    loadData();
  } else {
    alert("PIN salah");
  }
}

function logout() {
  document.getElementById("wallet").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
}

/* ================== UI ================== */
function updateSaldo() {
  document.getElementById("saldo").innerText =
    saldoVisible ? saldo.toLocaleString("id-ID") : "•••••";
}

function toggleSaldo() {
  saldoVisible = !saldoVisible;
  updateSaldo();
}

function renderRiwayat() {
  const ul = document.getElementById("riwayat");
  ul.innerHTML = "";
  riwayat.forEach(text => {
    const li = document.createElement("li");
    li.innerText = text;
    ul.appendChild(li);
  });
}

function addRiwayat(text) {
  riwayat.unshift(text);
  saveData();
  renderRiwayat();
}

/* ================== FITUR WALLET ================== */
function topUp() {
  const nominal = Number(document.getElementById("nominal").value);
  if (nominal > 0) {
    saldo += nominal;
    updateSaldo();
    addRiwayat("Top Up Rp " + nominal.toLocaleString("id-ID"));
    saveData();
  }
}

function kirimSaldo() {
  const tujuan = document.getElementById("tujuan").value;
  const nominal = Number(document.getElementById("kirimNominal").value);

  if (!tujuan || nominal <= 0) return;

  if (nominal <= saldo) {
    saldo -= nominal;
    updateSaldo();
    addRiwayat("Kirim Rp " + nominal.toLocaleString("id-ID") + " ke " + tujuan);
    saveData();
  } else {
    alert("Saldo tidak cukup");
  }
}

/* ================== QR ================== */
function generateQR() {
  const nominal = document.getElementById("qrNominal").value;
  if (!nominal) return;
  document.getElementById("qrcode").innerHTML =
    "<div style='padding:10px;border:1px dashed #999'>QR Rp " + nominal + "</div>";
}

function startScan() {
  if (!qrScanner) {
    qrScanner = new Html5Qrcode("reader");
  }

  qrScanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      qrScanner.stop();
      prosesQR(decodedText);
    },
    () => {}
  );
}

function prosesQR(data) {
  const nominal = Number(data.replace(/\D/g, ""));
  if (nominal > 0 && nominal <= saldo) {
    saldo -= nominal;
    updateSaldo();
    addRiwayat("Bayar QR Rp " + nominal.toLocaleString("id-ID"));
    saveData();
    alert("Pembayaran berhasil");
  } else {
    alert("Saldo tidak cukup / QR tidak valid");
  }
}

/* ================== PIN ================== */
function gantiPIN() {
  const lama = document.getElementById("pinLama").value;
  const baru = document.getElementById("pinBaru").value;
  const pinSekarang = localStorage.getItem("pin") || "1234";

  if (lama !== pinSekarang) return alert("PIN lama salah");
  if (baru.length !== 4 || isNaN(baru)) return alert("PIN baru harus 4 angka");

  localStorage.setItem("pin", baru);
  document.getElementById("pinLama").value = "";
  document.getElementById("pinBaru").value = "";
  alert("PIN berhasil diganti");
}

/* ================== TAB ================== */
function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
  event.currentTarget.classList.add("active");
}
let saldoVisible = true;

function toggleSaldo() {
  const saldoEl = document.getElementById("saldo");
  const eyeBtn = document.querySelector(".eye");

  if (saldoVisible) {
    saldoEl.innerText = "•••••";
    eyeBtn.innerText = "🙈";
  } else {
    saldoEl.innerText = saldo;
    eyeBtn.innerText = "👁️";
  }

  saldoVisible = !saldoVisible;
}
