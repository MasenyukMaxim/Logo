
//кнопка бургер

const menuButton = document.querySelector(".button-menu");
const body = document.body;
if (menuButton) {
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

// кнопки

const button = document.querySelectorAll(".button");
const popup = document.querySelector(".popup");

button.forEach(buttonItem => {
   if (!buttonItem.classList.contains("check-up__button_white") && !buttonItem.classList.contains("form__button"))
      buttonItem.addEventListener("click", function (e) {
         popup.classList.toggle("_active");
         body.classList.toggle("_lock");
      });
});


// обработка форм

document.addEventListener("DOMContentLoaded", function () {
   const form = document.getElementById("form");
   form.addEventListener("submit", formSend);


   async function formSend(e) {
      e.preventDefault();
      let error = formValidate(form);
      let formData = new FormData(form);
      if (error === 0) {

         const popupForm = document.querySelector(".form");
         popupForm.classList.add("_sending");
         let response = await fetch('/php/index.php', {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
         });
         if (response.ok) {
            let result = await response.json();
            alert(result.message);
            form.reset();
            popupForm.classList.remove("_sending");
         } else {
            alert("Ошибка");
            popupForm.classList.remove("_sending");
         }
      } else {
         alert("Заполните обязательные поля")
      }
   }
   function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll("._req");

      for (let index = 0; index < formReq.length; index++) {
         const input = formReq[index];
         formRemoveError(input);
         if (input.classList.contains("_email")) {
            if (emailTest(input)) {
               formAddError(input);
               error++;
            }
         } else {
            if (input.value === "") {
               formAddError(input);
               error++;
            }
         }
      }
      function formAddError(input) {
         input.parentElement.classList.add("_error");
         input.classList.add("_error");
         createTextError(input);
      }
      function formRemoveError(input) {
         input.parentElement.classList.remove("_error");
         input.classList.remove("_error");
         removeTextError(input);
      }

      function emailTest(input) {
         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
      }

      function createTextError(input) {
         const parent = input.parentElement;
         let nameInput = parent.childNodes[1].textContent;
         parent.insertAdjacentHTML(
            'beforeend',
            `<div class="form__error-text">Поле "${nameInput}" 
            заполнено не верно</div>`
         );
      }

      function removeTextError(input) {
         const textError = input.parentElement.querySelector(".form__error-text");
         if (textError) {
            input.parentElement.querySelector(".form__error-text").remove();
         }
      }


      return error;
   }
});






