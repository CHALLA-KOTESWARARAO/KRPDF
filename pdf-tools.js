const cards = document.querySelectorAll(".tool-card");
const modal = document.getElementById("toolModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalClose = document.getElementById("modalClose");
const modalLoading = document.getElementById("modalLoading");
const modalContent = document.getElementById("modalContent");
const uploadZone = document.getElementById("uploadZone");
const fileInput = document.getElementById("fileInput");
const fileLabel = document.getElementById("fileLabel");

let lastFocusedCard = null;
let loadTimer = null;

function openModal(card) {
  lastFocusedCard = card;
  modalTitle.textContent = card.dataset.tool || "PDF Tool";
  modalDesc.textContent = card.dataset.desc || "Upload your PDF to continue.";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  modalContent.classList.add("hidden");
  modalLoading.classList.remove("hidden");
  clearTimeout(loadTimer);
  loadTimer = setTimeout(() => {
    modalLoading.classList.add("hidden");
    modalContent.classList.remove("hidden");
  }, 450);
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  clearTimeout(loadTimer);
  modalLoading.classList.remove("hidden");
  modalContent.classList.add("hidden");
  if (lastFocusedCard) lastFocusedCard.focus();
}

cards.forEach((card) => {
  card.addEventListener("click", () => openModal(card));

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      openModal(card);
    }
  });
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

["dragenter", "dragover"].forEach((eventName) => {
  uploadZone.addEventListener(eventName, (e) => {
    e.preventDefault();
    uploadZone.classList.add("dragover");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  uploadZone.addEventListener(eventName, (e) => {
    e.preventDefault();
    uploadZone.classList.remove("dragover");
  });
});

uploadZone.addEventListener("drop", (e) => {
  const files = [...e.dataTransfer.files];
  showFileNames(files);
});

fileInput.addEventListener("change", () => {
  showFileNames([...fileInput.files]);
});

function showFileNames(files) {
  if (!files.length) {
    fileLabel.textContent = "No files selected";
    return;
  }
  fileLabel.textContent = files.length === 1
    ? files[0].name
    : `${files.length} files selected`;
}

