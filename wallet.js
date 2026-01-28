/* ===== KONFIGURASI ===== */
const DEFAULT_PIN = "1234";

/* ===== SPLASH ===== */
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  setTimeout(() => {
    if (splash) splash.style.display = "none";
  }, 1200);

  if (localStorage.getItem("loggedIn") === "true") {
    showWallet();
  }
});

/* ===== LOGIN PIN ===== */
function login() {
  const input = document.getElementById("pinInput").value;
  const pin = localStorage.getItem("pin") || DEFAULT_PIN;

  if (input === pin) {
    localStorage.setItem("loggedIn", "true");
    showWallet();
  } else {
    alert("PIN salah");
  }
}

/* ===== LOGIN FINGERPRINT (SIMULASI) ===== */
function loginFingerprint() {
  setTimeout(() => {
    localStorage.setItem("loggedIn", "true");
    showWallet();
    alert("Login sidik jari berhasil");
  }, 800);
}

/* ===== TAMPILKAN WALLET ===== */
function showWallet() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("wallet").classList.remove("hidden");
}

/* ===== LOGOUT ===== */
function logout() {
  localStorage.removeItem("loggedIn");
  location.reload();
}

/* ===== SALDO ===== */
let saldo = Number(localStorage.getItem("saldo")) || 0;
let saldoVisible = true;

function updateSaldo() {
  document.getElementById("saldo").textContent =
    saldoVisible ? saldo.toLocaleString("id-ID") : "•••••";
  localStorage.setItem("saldo", saldo);
}
updateSaldo();

function toggleSaldo() {
  saldoVisible = !saldoVisible;
  updateSaldo();
}

/* ===== TOP UP ===== */
function topUp() {
  const nominal = Number(document.getElementById("nominal").value);
  if (!nominal) return alert("Masukkan nominal");
  saldo += nominal;
  tambahRiwayat("Top Up", nominal);
  updateSaldo();
}

/* ===== KIRIM ===== */
function kirimSaldo() {
  const tujuan = document.getElementById("tujuan").value;
  const nominal = Number(document.getElementById("kirimNominal").value);

  if (!tujuan || !nominal) return alert("Lengkapi data");
  if (nominal > saldo) return alert("Saldo tidak cukup");

  saldo -= nominal;
  tambahRiwayat("Kirim ke " + tujuan, nominal);
  updateSaldo();
}

/* ===== RIWAYAT ===== */
function tambahRiwayat(text, nominal) {
  const ul = document.getElementById("riwayat");
  const li = document.createElement("li");
  li.textContent = `${text} - Rp ${nominal.toLocaleString("id-ID")}`;
  ul.prepend(li);
}

/* ===== GANTI PIN ===== */
function gantiPIN() {
  const lama = document.getElementById("pinLama").value;
  const baru = document.getElementById("pinBaru").value;
  const pin = localStorage.getItem("pin") || DEFAULT_PIN;

  if (lama !== pin) return alert("PIN lama salah");
  if (baru.length !== 4 || isNaN(baru)) return alert("PIN harus 4 angka");

  localStorage.setItem("pin", baru);
  alert("PIN berhasil diganti");

  document.getElementById("pinLama").value = "";
  document.getElementById("pinBaru").value = "";
}

/* ===== TAB ===== */
function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
