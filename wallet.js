let saldo = 0;
let riwayat = [];

/* ===== LOAD DATA ===== */
function loadData() {
  const savedSaldo = localStorage.getItem("saldo");
  const savedRiwayat = localStorage.getItem("riwayat");

  saldo = savedSaldo ? Number(savedSaldo) : 0;
  riwayat = savedRiwayat ? JSON.parse(savedRiwayat) : [];

  updateSaldo();
  renderRiwayat();
}

/* ===== SAVE DATA ===== */
function saveData() {
  localStorage.setItem("saldo", saldo);
  localStorage.setItem("riwayat", JSON.stringify(riwayat));
}

/* ===== LOGIN ===== */
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

/* ===== UI UPDATE ===== */
function updateSaldo() {
  document.getElementById("saldo").innerText = saldo;
}

function renderRiwayat() {
  const ul = document.getElementById("riwayat");
  ul.innerHTML = "";
  riwayat.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    ul.appendChild(li);
  });
}

function addRiwayat(text) {
  riwayat.unshift(text);
  saveData();
  renderRiwayat();
}

/* ===== FITUR ===== */
function topUp() {
  const nominal = Number(document.getElementById("nominal").value);
  if (nominal > 0) {
    saldo += nominal;
    updateSaldo();
    addRiwayat("Top Up Rp " + nominal);
    saveData();
  }
}

function kirimSaldo() {
  const tujuan = document.getElementById("tujuan").value;
  const nominal = Number(document.getElementById("kirimNominal").value);

  if (nominal > 0 && nominal <= saldo) {
    saldo -= nominal;
    updateSaldo();
    addRiwayat("Kirim Rp " + nominal + " ke " + tujuan);
    saveData();
  } else {
    alert("Saldo tidak cukup");
  }
}

function generateQR() {
  const nominal = document.getElementById("qrNominal").value;
  document.getElementById("qrcode").innerHTML =
    "<div style='padding:10px;border:1px dashed #999'>QR Rp " + nominal + "</div>";
}
function gantiPIN() {
  const lama = document.getElementById("pinLama").value;
  const baru = document.getElementById("pinBaru").value;

  const pinSekarang = localStorage.getItem("pin") || "1234";

  if (lama !== pinSekarang) {
    alert("PIN lama salah");
    return;
  }

  if (baru.length !== 4 || isNaN(baru)) {
    alert("PIN baru harus 4 angka");
    return;
  }

  localStorage.setItem("pin", baru);

  document.getElementById("pinLama").value = "";
  document.getElementById("pinBaru").value = "";

  alert("PIN berhasil diganti");
}
let qrScanner;

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
    (error) => {}
  );
}

function prosesQR(data) {
  // Contoh data: "QR Rp 5000"
  const angka = data.replace(/\D/g, "");
  const nominal = Number(angka);

  if (nominal > 0 && nominal <= saldo) {
    saldo -= nominal;
    updateSaldo();
    addRiwayat("Bayar QR Rp " + nominal);
    saveData();
    alert("Pembayaran QR Rp " + nominal + " berhasil");
  } else {
    alert("Saldo tidak cukup / QR tidak valid");
  }
}
function showTab(id) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(btn => {
    btn.classList.remove("active");
  });
     }
