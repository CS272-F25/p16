const supportForm = document.getElementById('support-form');

if (supportForm) {
    supportForm.addEventListener('submit', function(event) {
      event.preventDefault();
      alert('Thank you for reaching out! We will get back to you shortly.');
      supportForm.reset();
    });
}

function copyToClipboard() {
  const email = "Support@SmartGrocry.com"
  navigator.clipboard.writeText(email);
  alert("Email address copied to clipboard: ");
}