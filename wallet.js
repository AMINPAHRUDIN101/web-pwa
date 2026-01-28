let saldo = 0;
const PIN = "1234";

function login() {
  const pin = document.getElementById("pinInput").value;
  if (pin === PIN) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("wallet").classList.remove("hidden");
  } else {
    alert("PIN salah");
  }
}

function logout() {
  document.getElementById("wallet").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
}

function updateSaldo() {
  document.getElementById("saldo").innerText = saldo;
}

function addRiwayat(text) {
  const li = document.createElement("li");
  li.innerText = text;
  document.getElementById("riwayat").prepend(li);
}

function topUp() {
  const nominal = Number(document.getElementById("nominal").value);
  if (nominal > 0) {
    saldo += nominal;
    updateSaldo();
    addRiwayat("Top Up Rp " + nominal);
  }
}

function kirimSaldo() {
  const tujuan = document.getElementById("tujuan").value;
  const nominal = Number(document.getElementById("kirimNominal").value);

  if (nominal > 0 && nominal <= saldo) {
    saldo -= nominal;
    updateSaldo();
    addRiwayat("Kirim Rp " + nominal + " ke " + tujuan);
  } else {
    alert("Saldo tidak cukup");
  }
}

function generateQR() {
  const nominal = document.getElementById("qrNominal").value;
  document.getElementById("qrcode").innerHTML =
    "<div style='padding:10px;border:1px dashed #999'>QR Rp " + nominal + "</div>";
}
  QRCode.toCanvas(qrContainer, qrData, function (error) {
    if (error) console.error(error);
    else {
      alert("QR siap di-scan (simulasi)");
      // Potong saldo otomatis
      saldo -= nominal;
      localStorage.setItem("saldo", saldo);
      riwayat.push(`Bayar Rp ${nominal} via QR`);
      localStorage.setItem("riwayat", JSON.stringify(riwayat));
      document.getElementById("saldo").innerText = saldo;
      renderRiwayat();
      document.getElementById("qrNominal").value = "";
    }
  });
}

