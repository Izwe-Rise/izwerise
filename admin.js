// ----- Admin Login -----
const ADMIN_PASSWORD = "Izwe2025"; // Set your password here

const loginCard = document.getElementById("loginCard");
const adminPanel = document.getElementById("adminPanel");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");
const passwordInput = document.getElementById("adminPassword");

loginBtn.addEventListener("click", () => {
  if(passwordInput.value === ADMIN_PASSWORD) {
    // Hide login, show admin panel
    loginCard.style.display = "none";
    adminPanel.style.display = "block";
  } else {
    loginError.style.display = "block";
  }
});

// ----- Admin Panel Functionality -----
const uploadForm = document.getElementById("uploadForm");
const uploadedPapersDiv = document.getElementById("uploadedPapers");

let uploadedPapers = JSON.parse(localStorage.getItem("uploadedPapers")) || [];

function renderPapers() {
  uploadedPapersDiv.innerHTML = "";
  if (uploadedPapers.length === 0) {
    uploadedPapersDiv.innerHTML = "<p>No papers uploaded yet.</p>";
    return;
  }

  const ul = document.createElement("ul");
  uploadedPapers.forEach((paper, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${paper.title}</strong> – Grade ${paper.grade} (${paper.subject})
      <a href="${paper.fileURL}" target="_blank">[View PDF]</a>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    ul.appendChild(li);
  });
  uploadedPapersDiv.appendChild(ul);

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      uploadedPapers.splice(index, 1);
      localStorage.setItem("uploadedPapers", JSON.stringify(uploadedPapers));
      renderPapers();
    });
  });
}

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("paperTitle").value;
  const grade = document.getElementById("gradeSelect").value;
  const subject = document.getElementById("subjectSelect").value;
  const fileInput = document.getElementById("paperFile");

  if (fileInput.files.length === 0) {
    alert("Please select a PDF file.");
    return;
  }

  const fileURL = URL.createObjectURL(fileInput.files[0]);
  uploadedPapers.push({ title, grade, subject, fileURL });
  localStorage.setItem("uploadedPapers", JSON.stringify(uploadedPapers));
  uploadForm.reset();
  renderPapers();
});

renderPapers();
