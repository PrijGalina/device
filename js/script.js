/* promo slider */
let promo_buttons = document.querySelectorAll(".promo-pagination-item-btn");
let promo_slides = document.querySelectorAll(".promo-item");

promo_buttons.forEach(function (item, num) {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    let promo_button_active = document.querySelector(".btn-current");
    let promo_slide_active = document.querySelector(".slide-current");
    if (item !== promo_button_active) {
      promo_button_active.classList.remove("btn-current");
      promo_slide_active.classList.remove("slide-current");
      item.classList.add("btn-current");
      promo_slides[num].classList.add("slide-current");
    }
    item.blur();
  });
});

/* services slider */
let services_buttons = document.querySelectorAll(".services-btn");
let services_slides = document.querySelectorAll(".services-item");

services_buttons.forEach(function (item, num) {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    let services_tab_active = document.querySelector(".services-tab-active");
    let services_button_active = services_tab_active.querySelector(".services-btn");
    let services_slide_active = document.querySelector(".services-current");
    if (item !== services_button_active) {
      services_tab_active.classList.remove("services-tab-active");
      services_slide_active.classList.remove("services-current");
      item.parentElement.classList.add("services-tab-active");
      services_slides[num].classList.add("services-current");
    }
    item.blur();
  });
});

/* contact modal form */
let contact_modal_open_button = document.querySelector(".contact-modal-open");
let contact_modal = document.querySelector(".modal-contact");
let iterationCount = 0;
let isStorageSupport = true;
const storage_name = "";
const storage_email = "";

try {
  storage_name = localStorage.getItem("name");
  storage_email = localStorage.getItem("email");
}
catch (err) {
  isStorageSupport = false;
}

if (contact_modal) {

  let contact_modal_close = contact_modal.querySelector(".modal-close");
  let contact_form = contact_modal.querySelector(".contact-form");
  let contact_field_name = contact_form.querySelector("[name=contact-name]");
  let contact_field_email = contact_form.querySelector("[name=user-email]");
  let contact_feld_message = contact_form.querySelector("textarea");
  contact_modal_open_button.addEventListener("click", function (e) {
    e.preventDefault();
    overlay.classList.add("open");
    contact_modal.classList.add("modal-open");
    contact_modal.classList.add("modal-emergence");
    if (storage_name) {
      contact_field_name.value = storage_name;
      contact_field_email.value = storage_email;
      contact_feld_message.focus();
    }
    else {
      contact_field_name.focus();
    }
  });

  contact_modal_close.addEventListener("click", function (e) {
    e.preventDefault();
    contact_modal.classList.remove("modal-open");
    contact_modal.classList.remove("modal-emergence");
    overlay.classList.remove("open");
    contact_modal.classList.remove("modal-error");
  });

  contact_form.addEventListener("submit", function (e) {
    if (!contact_field_name.value || !contact_field_email.value) {
      e.preventDefault();
      contact_modal.classList.add("modal-error");
    }
    else {
      if (isStorageSupport) {
        localStorage.setItem("name", contact_field_name.value);
        localStorage.setItem("email", contact_field_email.value);
      }
    }
  });

  //
  contact_modal.addEventListener("animationend", () => {
    if (contact_modal.classList.contains("modal-error")) {
      contact_modal.classList.remove("modal-error");
      contact_modal.classList.remove("modal-emergence");
    }
  });

}


/* map modal form */
let map_modal_open_button = document.querySelector(".map-link");
let map_modal = document.querySelector(".modal-map");

if (map_modal) {

  let map_modal_close = map_modal.querySelector(".modal-close");
  map_modal_open_button.addEventListener("click", function (e) {
    e.preventDefault();
    overlay.classList.add("open");
    map_modal.classList.add("modal-open");
    map_modal.classList.add("modal-emergence");
  });

  map_modal_close.addEventListener("click", function (e) {
    e.preventDefault();
    map_modal.classList.remove("modal-open");
    map_modal.classList.remove("modal-emergence");
    overlay.classList.remove("open");
  });
}

let overlay = document.querySelector(".overlay");
if (overlay) {
  overlay.addEventListener("click", function (e) {
    e.preventDefault();
    map_modal.classList.remove("modal-open");
    map_modal.classList.remove("modal-emergence");
    contact_modal.classList.remove("modal-open");
    contact_modal.classList.remove("modal-emergence");
    overlay.classList.remove("open");
  });
}

// esc
window.addEventListener("keydown", function (e) {
  if (e.keyCode === 27) {
    if (contact_modal.classList.contains("modal-open")) {
      e.preventDefault();
      contact_modal.classList.remove("modal-open");
      contact_modal.classList.remove("modal-emergence");
      contact_modal.classList.remove("modal-error");
      overlay.classList.remove("open");
    }
    if (map_modal.classList.contains("modal-open")) {
      e.preventDefault();
      overlay.classList.remove("open");
      map_modal.classList.remove("modal-open");
      map_modal.classList.remove("modal-emergence");
      map_modal_open_button.blur();
    }

  }
});