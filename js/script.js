
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







