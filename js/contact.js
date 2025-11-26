const container = document.getElementById("contact-card-row");

const cards = [
  {
    title: "Customer Support",
    text: "Need help? Submit a support request form.",
    buttonText: "Open Form",
    buttonLink: "support-form.html" //NOTE: NEED TO ADD FUNCTIONALITY TO THIS LATER
  },
  {
    title: "Instagram",
    text: "Follow us for updates and news!",
    buttonText: "Visit Instagram",
    buttonLink: "https://instagram.com"
  },
  {
    title: "Contact Info",
    text: `
      Phone: (555) 123-4567<br>
      Email: support@smartgrocery.com
    `,
    buttonText: "Copy Info", //NOTE: NEED TO ADD FUNCTIONALITY TO THIS LATER
    buttonLink: "#"
  }
];

cards.forEach(card => {
  const cardWrapper = document.createElement("div");
  cardWrapper.className = "col-12 d-flex justify-content-center";

  cardWrapper.innerHTML = `
    <div class="card shadow-sm p-4 mb-4" style="max-width: 500px; width: 100%;">
      <h4 class="mb-2">${card.title}</h4>
      <p>${card.text}</p>
      <a href="${card.buttonLink}" class="btn btn-primary">
        ${card.buttonText}
      </a>
    </div>
  `;

  container.appendChild(cardWrapper);
});
