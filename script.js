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
          section.classList.add("category-section");

          const title = document.createElement("h3");
          title.textContent = category;
          title.classList.add("category-title");
          section.appendChild(title);

          const grid = document.createElement("div");
          grid.classList.add("product-grid");
          section.appendChild(grid);

          data[category].forEach(product => {
            // Mapare simplă pentru imagini (bazată pe numele produsului)
            let imgSrc = "";
            if (product.name.includes("Gips-carton")) {
              imgSrc = "https://m.media-amazon.com/images/I/51o2PIjUaCL._AC_UF1000,1000_QL80_.jpg"; // photo_1.jpg
            } else if (product.name.includes("D100x100xH45")) {
              imgSrc = "https://m.media-amazon.com/images/I/613AWyPbhqL._AC_UF1000,1000_QL80_.jpg"; // photo_2.jpg
            } else if (product.name.includes("D65xH45 cu surub")) {
              imgSrc = "https://m.media-amazon.com/images/I/51m+rDUrUDL._AC_UF894,1000_QL80_.jpg"; // photo_3.jpg
            } else if (product.name.includes("adâncă D65xH70")) {
              imgSrc = "https://m.media-amazon.com/images/I/41nnePWpotL.jpg"; // photo_4.jpg
            } else if (product.name.includes("rotundă")) {
              imgSrc = "https://m.media-amazon.com/images/I/514Fnfl2z4L.jpg"; // round generic
            } else {
              imgSrc = "https://m.media-amazon.com/images/I/616YfAirjfL._AC_UF894,1000_QL80_.jpg"; // fallback
            }

            const card = document.createElement("div");
            card.classList.add("product-card");
            card.innerHTML = `
              <div class="product-image">
                <img src="${imgSrc}" alt="${product.name}" loading="lazy">
              </div>
              <div class="product-info">
                <p class="name">${product.name}</p>
                <p class="price">${product.price} lei</p>
              </div>
            `;
            grid.appendChild(card);
          });

          container.appendChild(section);
        });
      })
      .catch(err => {
        console.error("Eroare la încărcarea produselor:", err);
        container.innerHTML = "<p class='error-message'>Nu s-au putut încărca produsele.</p>";
      });
  }

  // === 2. Мобильное меню (бургер) === (neschimbat)
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }
});
