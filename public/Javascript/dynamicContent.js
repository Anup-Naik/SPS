const MAX_SEMESTERS = 8; // Maximum number of semesters to render

const noOfSemestersInput = document.getElementById("noOfSemesters");
const creditInfoRowsContainer = document.getElementById("creditInfoRows");

noOfSemestersInput.addEventListener("input", () => {
  const count = parseInt(noOfSemestersInput.value, 10);
  renderCreditInfoRows(Math.min(count, MAX_SEMESTERS));
});

function renderCreditInfoRows(count) {
  creditInfoRowsContainer.innerHTML = ""; // Clear existing rows

  for (let i = 1; i <= count; i++) {
    const row = document.createElement("div");
    row.innerHTML = `
                    <h2>Credit Information for Semester ${i}</h2>
                    <label class="form-label" for="creditsSem${i}">Sem:</label>
                    <input class="form-control" type="number" value="${i}" id="creditsSem${i}" name="creditInfo[${
      i - 1
    }][sem]"><br />

                    <label class="form-label" for="creditsRegistered${i}">Credits Registered:</label>
                    <input class="form-control" type="number" id="creditsRegistered${i}" name="creditInfo[${
      i - 1
    }][creditsRegistered]"><br />

                    <label class="form-label" for="creditsEarned${i}">Credits Earned:</label>
                    <input class="form-control" type="number" id="creditsEarned${i}" name="creditInfo[${
      i - 1
    }][creditsEarned]"><br />

                    <label class="form-label" for="sgpa${i}">SGPA:</label>
                    <input class="form-control" type="number" step="0.01" id="sgpa${i}" name="creditInfo[${
      i - 1
    }][sgpa]"><br />

                    <label class="form-label" for="file${i}">File:</label>
                    <input class="form-control" type="file" id="file${i}" name="creditInfo[${
      i - 1
    }][file]"><br />
                `;
    creditInfoRowsContainer.appendChild(row);
  }
}

const MAX_SUPPLEMENTARY_SEMESTERS = 5; // Maximum number of supplementary semesters to render

const noOfSupplementaryInput = document.getElementById("noOfSupplementary");
const supplementaryInputsContainer = document.getElementById(
  "supplementaryInputsContainer"
);

noOfSupplementaryInput.addEventListener("input", () => {
  const count = parseInt(noOfSupplementaryInput.value, 10);
  renderSupplementaryInputs(Math.min(count, MAX_SUPPLEMENTARY_SEMESTERS));
});

function renderSupplementaryInputs(count) {
  supplementaryInputsContainer.innerHTML = ""; // Clear existing inputs

  for (let i = 1; i <= count; i++) {
    const div = document.createElement("div");
    div.innerHTML = `
                    <h2>Supplementary Exams Information for Semester ${i}</h2>
                    <label class="form-label" for="suppCreditsRegistered${i}">Credits Registered:</label>
                    <input class="form-control" type="number" id="suppCreditsRegistered${i}" name="supplementary[${
      i - 1
    }][creditsRegistered]"><br />

                    <label class="form-label" for="suppCreditsEarned${i}">Credits Earned:</label>
                    <input class="form-control" type="number" id="suppCreditsEarned${i}" name="supplementary[${
      i - 1
    }][creditsEarned]"><br />

                    <label class="form-label" for="suppSGPA${i}">SGPA:</label>
                    <input class="form-control" type="number" step="0.01" id="suppSGPA${i}" name="supplementary[${
      i - 1
    }][sgpa]"><br />

                    <label class="form-label" for="suppFile${i}">File:</label>
                    <input class="form-control" type="file" id="suppFile${i}" name="supplementary[${
      i - 1
    }][file]"><br />
                `;
    supplementaryInputsContainer.appendChild(div);
  }
}

const noOfBacklogsInput = document.getElementById("noOfBacklogs");
const backlogsRowsContainer = document.getElementById("backlogsRows");

noOfBacklogsInput.addEventListener("input", () => {
  const count = parseInt(noOfBacklogsInput.value, 10);
  renderBacklogsRows(count);
});

function renderBacklogsRows(count) {
  backlogsRowsContainer.innerHTML = ""; // Clear existing rows

  for (let i = 1; i <= count; i++) {
    const row = document.createElement("div");
    row.innerHTML = `
                  <h2>Backlog ${i} Information</h2>
                  <label class="form-label" for="backlogSubjectCode${i}">Subject Code:</label>
                  <input class="form-control" type="text" id="backlogSubjectCode${i}" name="backlogsInfo[${
      i - 1
    }][subjectCode]"><br />

                  <label class="form-label" for="backlogSubjectTitle${i}">Subject Title:</label>
                  <input class="form-control" type="text" id="backlogSubjectTitle${i}" name="backlogsInfo[${
      i - 1
    }][subjectTitle]"><br />

                  <label class="form-label" for="backlogCredits${i}">Credits:</label>
                  <input class="form-control" type="number" id="backlogCredits${i}" name="backlogsInfo[${
      i - 1
    }][credits]"><br />

                  <label class="form-check-label" for="backlogCleared${i}">Cleared:</label>
                  <input class="form-check-input" type="checkbox" value="true" id="backlogCleared${i}" name="backlogsInfo[${
      i - 1
    }][cleared]"><br />

    <label class="form-label" for="backlogSem${i}">Backlog Cleared Sem:</label>
                  <input class="form-control" type="text" id="backlogSem${i}" name="backlogsInfo[${
      i - 1
    }][semCleared]"><br />
              `;
    backlogsRowsContainer.appendChild(row);
  }
}

const noOfCurrentSubjectsInput = document.getElementById("noOfCurrentSubjects");
const currentSubjectsRowsContainer = document.getElementById(
  "currentSubjectsRows"
);

const MAX_CURRENT_SUBJECTS = 13;
noOfCurrentSubjectsInput.addEventListener("input", () => {
  const count = parseInt(noOfCurrentSubjectsInput.value, 10);
  renderCurrentSubjectsRows(Math.min(count, MAX_CURRENT_SUBJECTS));
});

function renderCurrentSubjectsRows(count) {
  currentSubjectsRowsContainer.innerHTML = ""; // Clear existing rows

  for (let i = 1; i <= count; i++) {
    const row = document.createElement("div");
    row.innerHTML = `
                  <h2>Current Semester Subject ${i} Information</h2>
                  <label class="form-label" for="currentSubjectCode${i}">Subject Code:</label>
                  <input class="form-control" type="text" id="currentSubjectCode${i}" name="currentSemInfo[${
      i - 1
    }][subjectCode]"><br />

                  <label class="form-label" for="currentSubjectTitle${i}">Subject Title:</label>
                  <input class="form-control" type="text" id="currentSubjectTitle${i}" name="currentSemInfo[${
      i - 1
    }][subjectTitle]"><br />

                  <label class="form-label" for="currentSubjectCredits${i}">Credits:</label>
                  <input class="form-control" type="number" id="currentSubjectCredits${i}" name="currentSemInfo[${
      i - 1
    }][subjectCredits]"><br />
              `;
    currentSubjectsRowsContainer.appendChild(row);
  }
}

/* Validation */
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
