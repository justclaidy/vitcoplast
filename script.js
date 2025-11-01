document.addEventListener("DOMContentLoaded", () => {
  // === 1. Загрузка продуктов из JSON ===
  const container = document.getElementById("product-list");
  if (container) {
    fetch("products.json")
      .then(res => {
        if (!res.ok) throw new Error("Fișierul products.json nu a fost găsit.");
        return res.json();
      })
      .then(data => {
        Object.keys(data).forEach(category => {
          const section = document.createElement("div");
          section.classList.add("category");

          const title = document.createElement("h3");
          title.textContent = category;
          title.classList.add("category-title");
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
        container.innerHTML = "<p class='error-message'>Nu s-au putut încărca produsele.</p>";
      });
  }

  // === 2. Мобильное меню (бургер) ===
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    // Закрытие меню при клике на ссылку
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }
});