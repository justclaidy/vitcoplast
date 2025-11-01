document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-list");

  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      Object.keys(data).forEach(category => {
        const section = document.createElement("div");
        section.classList.add("category");

        const title = document.createElement("h3");
        title.textContent = category;
        section.appendChild(title);

        data[category].forEach(product => {
          const card = document.createElement("div");
          card.classList.add("product-card");
          card.innerHTML = `
            <p class="name">${product.name}</p>
            <p class="price">${product.price} lei</p>
          `;
          section.appendChild(card);
        });

        container.appendChild(section);
      });
    })
    .catch(err => {
      console.error("Eroare la încărcarea produselor:", err);
      container.innerHTML = "<p>Nu s-au putut încărca produsele.</p>";
    });
});
