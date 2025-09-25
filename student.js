const fetchButton = document.getElementById("fetchPapers");
const papersList = document.getElementById("papersList");

fetchButton.addEventListener("click", () => {
  const grade = document.getElementById("gradeSelect").value;
  const subject = document.getElementById("subjectSelect").value;

  const uploadedPapers = JSON.parse(localStorage.getItem("uploadedPapers")) || [];
  const filteredPapers = uploadedPapers.filter(paper => paper.grade === grade && paper.subject === subject);

  papersList.innerHTML = "";

  if (filteredPapers.length > 0) {
    const ul = document.createElement("ul");
    filteredPapers.forEach(paper => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${paper.title}</span> 
        <a href="quiz.html?paper=${encodeURIComponent(paper.title)}" class="btn">Start Quiz</a>
      `;
      ul.appendChild(li);
    });
    papersList.appendChild(ul);
  } else {
    papersList.innerHTML = "<p>No papers available for this selection.</p>";
  }
});
