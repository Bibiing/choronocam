document
  .getElementById("chooseFileButton")
  .addEventListener("click", function () {
    document.getElementById("image").click();
  });

document.getElementById("image").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    document.getElementById("fileNameDisplay").textContent = file.name;
  }
});

// Form submission handling
document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("image");
  if (fileInput.files.length === 0) {
    alert("Please choose a file to upload.");
    return;
  }

  const file = fileInput.files[0];
  if (file.size > 1 * 1024 * 1024 * 1024) {
    // 1GB size limit
    alert("File size exceeds 1GB limit.");
    return;
  }

  // If validations are passed, submit the form
  const formData = new FormData(this);
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("message").textContent = data.message;
    })
    .catch((error) => {
      document.getElementById("message").textContent =
        "An error occurred during the upload.";
    });
});
