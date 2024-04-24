document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("printBtn");
    button.addEventListener("click", () => {
      window.print();
    });
  });