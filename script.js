AOS.init({
  duration: 800,
  once: false,
  mirror: true,
});

window.addEventListener("scroll", function () {
  AOS.refresh();
});

scrollSpy.init({
  textColor: "#9c0017",
});

document.addEventListener("scroll", () => {
  let sections = document.querySelectorAll("section");
  let scrollPos = window.scrollY + 150;

  sections.forEach((sec) => {
    if (
      scrollPos >= sec.offsetTop &&
      scrollPos < sec.offsetTop + sec.offsetHeight
    ) {
      document
        .querySelectorAll(".nav-link")
        .forEach((a) => a.classList.remove("active"));
      document
        .querySelector(`.nav-link[href="#${sec.id}"]`)
        ?.classList.add("active");
    }
  });
});

document.querySelectorAll(".detail-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const data = JSON.parse(this.getAttribute("data-product"));

    document.getElementById("detailTitle").innerText = data.title;
    document.getElementById("detailDescription").innerText = data.description;

    document.getElementById("openRegisterForm").onclick = function () {
      document.getElementById("registerProductName").innerText =
        "Daftar - " + data.title;
      new bootstrap.Modal(document.getElementById("registerFormModal")).show();
    };
  });
});

document.querySelectorAll(".btn-success").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const card = e.target.closest(".card");
    const title = card.querySelector(".card-title").innerText;

    document.getElementById("registerProductName").innerText =
      "Daftar - " + title;
    new bootstrap.Modal(document.getElementById("registerFormModal")).show();
  });
});

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const minDate = `${year}-${month}-${day}`;
document.getElementById("tanggalPemesanan").setAttribute("min", minDate);

document.querySelectorAll(".payment").forEach((cb) => {
  cb.addEventListener("change", function () {
    if (this.checked) {
      document.querySelectorAll(".payment").forEach((other) => {
        if (other !== this) other.checked = false;
      });
    }
  });
});

document
  .getElementById("registerFormModal")
  .addEventListener("hidden.bs.modal", function () {
    document.getElementById("registerForm").reset();

    document
      .querySelectorAll("#registerForm input[type='checkbox']")
      .forEach((cb) => (cb.checked = false));

    document.getElementById("registerProductName").innerText = "";
  });

document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("namaPemesan").value;
    const telp = document.getElementById("nomorTelepon").value;
    const level = document.querySelector("input[name='level']:checked").value;
    const tanggal = document.getElementById("tanggalPemesanan").value;
    const peserta = document.getElementById("jumlahPeserta").value;

    let metode = "";
    document.querySelectorAll(".payment").forEach((cb) => {
      if (cb.checked) metode = cb.value;
    });

    const waAdmin = "6282138395569";

    const text = `Halo Admin Void Academy, saya ingin melakukan pendaftaran kursus.

Nama: ${nama}
Nomor Telepon: ${telp}
Level Kursus: ${level}
Tanggal Pemesanan: ${tanggal}
Jumlah Peserta: ${peserta}
Metode Pembayaran: ${metode}

Terima kasih.`;

    const url =
      "https://wa.me/" + waAdmin + "?text=" + encodeURIComponent(text);

    window.open(url, "_blank");
  });

function submitMessage() {
  document.getElementById("nama").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}
