let language;

function setLanguage(lang) {
  language = lang;
  console.log("Language set to:", language);
  translate();
}

function translate() {
  fetch(language + ".json")
    .then((response) => response.json())
    .then((translations) => {
      document.querySelectorAll("[data-translate]").forEach((element) => {
        const key = element.getAttribute("data-translate");

        if (element.getAttribute("data-translate-href") !== null) {
          const hrefKey = element.getAttribute("data-translate-href");
          element.href = translations[hrefKey];
        } else if (element.tagName === "A") {
          element.textContent = translations[key];
        } else {
          const registerEl = element.querySelector(
            '[data-translate="register"]'
          );
          const rememberEl = element.querySelector(
            '[data-translate="rememberme"]'
          );
          const forgotEl = element.querySelector('[data-translate="forgot"]');

          if (key === "login") {
            element.textContent = translations[key];
            if (rememberEl) {
              rememberEl.textContent = translations["rememberme"];
            }
            if (forgotEl) {
              forgotEl.textContent = translations["forgot"];
              forgotEl.style.display = "inline";
            }
          } else if (key === "register") {
            element.innerHTML =
              translations[key] + (registerEl ? registerEl.outerHTML : "");
          } else if (key === "rememberme") {
            if (rememberEl) {
              rememberEl.innerHTML = `<input type="checkbox"> ${translations[key]}`;
            }
          } else if (key === "forgot") {
            forgotEl.style.display = "inline";
            forgotEl.textContent = translations[key];
          } else {
            element.textContent = translations[key];
          }
        }
      });
      console.log("Translations loaded for: " + language);
    })
    .catch((error) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load translations for " + language,
      });
      console.log("Failed to load translations for: " + language);
    });
}

setLanguage("sv");
