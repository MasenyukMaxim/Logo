
//кнопка бургер

const menuButton = document.querySelector(".button-menu");
if (menuButton) {
   const body = document.body;
   const menuBody = document.querySelector(".menu");
   const buttonHeader = document.querySelector(".header__button");
   menuButton.addEventListener("click", function (event) {
      menuButton.classList.toggle("_active");
      menuBody.classList.toggle("_active");
      buttonHeader.classList.toggle("_active");
      body.classList.toggle("_lock");
   });
}

// слайдер

let offset = 0;
let width;
let count;
const checkupItems = document.querySelector(".check-up__items");
const numberNow = document.querySelector(".menu-slider__number-now");

function init() {
   width = checkupItems.offsetWidth;

   if (count) {
      offset = width * count;
   }

   rollSlider();

   console.log(width);
}

function checkNumber() {
   if (offset === width) {
      numberNow.innerHTML = "2";

   } else if (offset === width * 2) {
      numberNow.innerHTML = "3";

   } else if (offset === width * 3) {
      numberNow.innerHTML = "4";
   } else {
      numberNow.innerHTML = "1";
   }
}

function rollSlider() {
   checkupItems.style.left = -offset + "px";
}

function countNumberSlider() {
   count = offset / width;
}

window.addEventListener("resize", init);
init();

document.querySelector(".menu-slider__right-buttons").addEventListener("click", function () {

   offset = offset + width;

   if (offset > width * 3) {
      offset = width * 3;
   }

   rollSlider();

   checkNumber();

   countNumberSlider();
});

document.querySelector(".menu-slider__left-buttons").addEventListener("click", function () {

   offset = offset - width;

   if (offset < 0) {
      offset = 0;
   }

   rollSlider();

   checkNumber();

   countNumberSlider();
});





