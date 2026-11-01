// QR Code Generator — everything runs locally in the browser.
// Uses the qrcodejs library (loaded from CDN) to draw the code.

const textInput = document.getElementById("textInput");
const darkColor = document.getElementById("darkColor");
const lightColor = document.getElementById("lightColor");
const qrBox = document.getElementById("qrBox");
const status = document.getElementById("status");

let downloadSize = 512;
let qr = null;

function currentText() {
  return textInput.value.trim();
}

function render() {
  const text = currentText();
  qrBox.innerHTML = "";
  if (!text) {
    status.textContent = "Type something first — a link, Wi-Fi name, any text.";
    qr = null;
    return;
  }
  status.textContent = "";
  qr = new QRCode(qrBox, {
    text: text,
    width: 288,
    height: 288,
    colorDark: darkColor.value,
    colorLight: lightColor.value,
    correctLevel: QRCode.CorrectLevel.M,
  });
}

let debounce = null;
function renderSoon() {
  clearTimeout(debounce);
  debounce = setTimeout(render, 250);
}

textInput.addEventListener("input", renderSoon);
darkColor.addEventListener("input", renderSoon);
lightColor.addEventListener("input", renderSoon);

document.querySelectorAll("#sizeRow button").forEach((btn) => {
  btn.addEventListener("click", () => {
    downloadSize = parseInt(btn.dataset.size, 10);
    document.querySelectorAll("#sizeRow button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  const text = currentText();
  if (!text) {
    status.textContent = "Type something first — a link, Wi-Fi name, any text.";
    return;
  }
  // Render a fresh code at the chosen download size, then export its canvas.
  const holder = document.createElement("div");
  new QRCode(holder, {
    text: text,
    width: downloadSize,
    height: downloadSize,
    colorDark: darkColor.value,
    colorLight: lightColor.value,
    correctLevel: QRCode.CorrectLevel.M,
  });
  const canvas = holder.querySelector("canvas");
  if (!canvas) {
    status.textContent = "Something went wrong while making the image — please try again.";
    return;
  }
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "qr-code.png";
  a.click();
  status.textContent = "Saved — look for qr-code.png in your downloads.";
});

render();
