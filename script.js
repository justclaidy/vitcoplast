document.addEventListener("DOMContentLoaded", () => {
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
            // Atribuim pozele tale exact cum ai cerut
            let imgSrc = "";
            if (product.name.includes("Gips-carton")) {
              imgSrc = "photo_1.jpg";                    // Cutie pentru prize D65xH45 Gips-carton
            } else if (product.name.includes("D100x100xH45")) {
              imgSrc = "photo_2.jpg";                    // Cutie de distributie pătrată
            } else if (product.name.includes("D65xH45 cu surub") && !product.name.includes("adâncă")) {
              imgSrc = "photo_3.jpg";                    // Cutie pentru prize D65xH45 cu surub
            } else if (product.name.includes("adâncă D65xH70")) {
              imgSrc = "photo_4.jpg";                    // Cutie adâncă
            } else {
              imgSrc = "placeholder.jpg"; // opțional: pune o imagine generică dacă vrei
            }

            const card = document.createElement("div");
            card.classList.add("product-card");
            card.innerHTML = `
              <div class="product-image">
                <img src="${imgSrc}" alt="${product.name}" loading="lazy">
              </div>
              <div class="product-info">
                <h4 class="name">${product.name}</h4>
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

  // Meniu mobil (rămâne la fel)
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }
});
