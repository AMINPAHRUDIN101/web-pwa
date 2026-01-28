let saldo = parseInt(localStorage.getItem("saldo")) || 0;
let riwayat = JSON.parse(localStorage.getItem("riwayat")) || [];
let pin = localStorage.getItem("pin");

const loginBox = document.getElementById("login");
const walletBox = document.getElementById("wallet");
const pinInput = document.getElementById("pinInput");

document.getElementById("saldo").innerText = saldo;
renderRiwayat();

if (!pin) {
  document.querySelector("h2").innerText = "Buat PIN Baru";
} else {
  document.querySelector("h2").innerText = "Masukkan PIN";
}

function login() {
  const inputPin = pinInput.value;

  if (inputPin.length !== 4) {
    alert("PIN harus 4 digit");
    return;
  }

  if (!pin) {
    localStorage.setItem("pin", inputPin);
    alert("PIN berhasil dibuat");
    pin = inputPin;
  }

  if (inputPin === pin) {
    loginBox.classList.add("hidden");
    walletBox.classList.remove("hidden");
  } else {
    alert("PIN salah");
  }

  pinInput.value = "";
}

function topUp() {
  const nominal = parseInt(document.getElementById("nominal").value);
  if (!nominal || nominal <= 0) {
    alert("Nominal tidak valid");
    return;
  }

  saldo += nominal;
  localStorage.setItem("saldo", saldo);

  riwayat.push(`Top Up Rp ${nominal}`);
  localStorage.setItem("riwayat", JSON.stringify(riwayat));

  document.getElementById("saldo").innerText = saldo;
  renderRiwayat();
}

function renderRiwayat() {
  const list = document.getElementById("riwayat");
  list.innerHTML = "";
  riwayat.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}

function logout() {
  location.reload();
}
function kirimSaldo() {
  const tujuan = document.getElementById("tujuan").value;
  const nominal = parseInt(document.getElementById("kirimNominal").value);

  if (!tujuan) {
    alert("Masukkan tujuan");
    return;
  }

  if (!nominal || nominal <= 0) {
    alert("Nominal tidak valid");
    return;
  }

  if (nominal > saldo) {
    alert("Saldo tidak cukup");
    return;
  }

  saldo -= nominal;
  localStorage.setItem("saldo", saldo);

  riwayat.push(`Kirim Rp ${nominal} ke ${tujuan}`);
  localStorage.setItem("riwayat", JSON.stringify(riwayat));

  document.getElementById("saldo").innerText = saldo;
  renderRiwayat();

  document.getElementById("tujuan").value = "";
  document.getElementById("kirimNominal").value = "";
}
