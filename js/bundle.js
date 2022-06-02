/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    
    let elemArray = {
        gender: "", 
        height : 0, 
        weight : 0, 
        age : 0, 
        activity : 0
    };
    

    const result = document.querySelector(".calculating__result span"),
          chooseItems = document.querySelectorAll(".calculating__choose-item");

    // Функция показ результата калькулятора, вызываем в каждом ивенте, чтобы срабатывало в любом направлении заполнения
    const getResult = () => {
        let {gender, height,weight, age, activity} = elemArray;
        if (!gender || !height || !weight || !age || !activity) {
            result.textContent = 0;
            return;
        } else if (gender == "male") {
            result.textContent = Math.floor(((10 * weight) + (6.25 * height) - (5 * age) + 5) * activity);
        } else {
            result.textContent = Math.floor(((10 * weight) + (6.25 * height) - (5 * age)- 161) * activity);
        }
    };
    // Работа с localStorage
    if (localStorage.getItem("activity")) {
        elemArray.activity = localStorage.getItem("activity");
    }else {
        localStorage.setItem("activity", "1.375");
    }
    if (localStorage.getItem("gender")) {
        elemArray.gender = localStorage.getItem("gender"); 
    }else {
        localStorage.setItem("gender", "female");
    }
    // Вызов чтобы обновить результат на ноль
    getResult();

    // Работа с localStorage
    const initLocalSettings = (selector) => {

        const elements = document.querySelectorAll(selector);
        
        elements.forEach(elem => {
            elem.classList.remove("calculating__choose-item_active");
            if (elem.getAttribute("data-activity") === localStorage.getItem("activity")) {
                elem.classList.add("calculating__choose-item_active");
            }
            if (elem.getAttribute("data-gender") === localStorage.getItem("gender")) {
                elem.classList.add("calculating__choose-item_active");
            }
        });
    };
    initLocalSettings("#gender div");
    initLocalSettings(".calculating__choose_big div");
    function getStaticData(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                

                if (e.target.getAttribute('data-activity')) {
                    elemArray.activity = +e.target.getAttribute('data-activity');
                    localStorage.setItem("activity", +e.target.getAttribute('data-activity'));        
                } else {
                    elemArray.gender = e.target.getAttribute('data-gender');
                    localStorage.setItem("gender", e.target.getAttribute('data-gender'));
                }
                elements.forEach(elem => {
                    elem.classList.remove("calculating__choose-item_active");
                });
    
                e.target.classList.add("calculating__choose-item_active");
    
                getResult();
            });
        });
    }

    function getDynamicData(selector) {
        const element = document.querySelector(`#${selector}`);
            element.addEventListener('input', (e) => {
                if (e.target.value.match(/\D/g)) {
                    e.target.style.border = "1px red solid";
                } else {
                    e.target.style.border = "none";
                }
                elemArray[selector] = e.target.value;    
                getResult();
            });
    }
    getStaticData("#gender div");
    getStaticData(".calculating__choose_big div");
    getDynamicData("height"); 
    getDynamicData("weight"); 
    getDynamicData("age"); 

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
        const menuField = document.querySelector(".menu__field"),
              menuFieldContainer = menuField.querySelector(".container");

    // Создаём класс
    class MenuCard {
        constructor(img,title, descr, price, parentSelector, ...classes ) {
            this.img = img;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parentSelector = parentSelector;
            this.alt = "image";
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        // Метод обмен валют
        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        // Метод добавления на страницу
        addToHTML() {
            if (this.classes.length === 0) {
                this.classes = "menu__item";
            } else {
                let i = "";
                for (let k of this.classes) {
                    i += `${k} `;
                }
                this.classes = i;
            }
            this.parentSelector.innerHTML += `
            <div class="${this.classes}">
                <img src="${this.img}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}"</h3>
                <div class="menu__item-descr">${this.descr} </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>`;
        }
              
    }


    // Создаём get запрос и с полученными данными добавляем табы на страницу
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)("http://localhost:3000/menu")
    // применение деструктуризации в forEach
    .then((data)=>data.data.forEach(({img, title, descr, price}) => {
        new MenuCard(img, title, descr, price, menuFieldContainer, "menu__item").addToHTML();
    }));
       
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
    // Функция скрытия модального окна
    function closeModal (modalSelector) {
        const modal = document.querySelector(modalSelector);
        modal.style.display = "none";
        document.body.style.overflow = "";    
    }

    // Функция показа модального окна
    function showModal (modalSelector, modalTimerId) {
        const modal = document.querySelector(modalSelector);
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; 
        if (modalTimerId) {
            clearInterval(modalTimerId);  
        }
    }

function modal(modalOpenSelector, modalSelector, modalTimerId) {
    // Находим нужные классы
    const modal = document.querySelector(modalSelector),
        modalOpen = document.querySelectorAll(modalOpenSelector);



    // Вешаем лисенер на клик для каждой кнопки
    modalOpen.forEach(element => {
        element.addEventListener("click", () => showModal(modalSelector, modalTimerId));
    }); 

    // Вешаем лисенер на клик на подложку модального окна для закрытия модального окна и на кнопку закрытия
    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal(modalSelector);
        }     
    });

    // Лисенер на кнопку Escape для закрытия модального окна
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.style.display === "block") {
            closeModal(modalSelector);
        }
    });



    // Лисенер на скрол в котором запускаем функцию показа модального окна при пролистывании до конца страницы
    window.addEventListener("scroll", showModalByScrol);

    // Функция открытия модального окна в конце страницы
    function showModalByScrol() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScrol);
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/post.js":
/*!****************************!*\
  !*** ./js/modules/post.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function post(formSelector, modalTimerId) {
    
    const forms = document.querySelectorAll(formSelector);

    // Сообщения для пользователя при обрабоке пост запроса
    const message = {
        loading: "img/form/spinner.svg",
        succes: "Спасибо, мы скоро с Вами свяжемся",
        failure: "Что-то пошло не так"
    };
    forms.forEach(form => {
        bindPostData(form);
    });



    // Главная функция
    function bindPostData(form) {
        form.addEventListener("submit", (e)=>{
            e.preventDefault();

            // Сообщение для пользователя
            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading ;

            // Применяем css стили
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            
            // Добавление в конец формы
            form.insertAdjacentElement("afterend", statusMessage);

            // Создание дата файла
            const formData = new FormData(form);

            // // Если нужно отослать в формате json 
            // // Вариант 1
            // const object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });

            // Вариант 2
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // Создание пост запроса
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
            .then(function (response) {
                console.log(response.data);
                showThanksDialog(message.succes);
                statusMessage.remove();
            }).catch(function (error) {
                console.log(error);
                showThanksDialog(message.failure);
            }).finally(() => {
                form.reset();
            });

        });
    }

    // Красивое оповещение
    function showThanksDialog(message){
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)(".modal", modalTimerId);

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(()=> {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
        }, 4000);

        }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (post);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({sliderArg, slides, prev, next, totalSlides, curentSlide, sliderFieldArg} ) {

    // Подобие БД
    const sliderImagesDB = [{
        img: "img/slider/pepper.jpg",
        alt: "pepper",
        hide: false
    }, {
        img: "img/slider/food-12.jpg",
        alt: "food",
        hide: true
    }, {
        img: "img/slider/olive-oil.jpg",
        alt: "oil",
        hide: true
    }, {
        img: "img/slider/paprika.jpg",
        alt: "paprika",
        hide: true
    }, ];
    
    const slider = document.querySelector(sliderArg),
          sliderSlides = document.querySelectorAll(slides),
          sliderPrev = document.querySelector(prev),
          sliderNext = document.querySelector(next),
          sliderTotalSlides = document.querySelector(totalSlides),
          sliderCurrentSlide = document.querySelector(curentSlide),
          sliderField = document.querySelector(sliderFieldArg),
          width = window.getComputedStyle(slider).width;
    // Две вспомогательные переменные оффсет для перемещения слайдов, слайд индекс для отображение текущего слайда
    let offset = 0,
        slideIndex = 1;
    // Функция для отображения текущего слайда и общего количества слайдов
    const changeSliderCounter = function() {
        if (sliderSlides.length <10) {
            sliderTotalSlides.textContent = `0${sliderSlides.length}`;
            sliderCurrentSlide.textContent = `0${slideIndex}`;

        } else {
            sliderTotalSlides.textContent = sliderSlides.length;
            sliderCurrentSlide.textContent = slideIndex;
        }
    };    
    // Первый вызов для корректного отображения
    changeSliderCounter();
    // Полная ширина слайдера и прочие настройки для слайдера
    sliderField.style.width = 100 * sliderSlides.length + "%";
    sliderField.style.display = "flex";
    sliderField.style.transition = "0.5s all";
    slider.style.overflow = "hidden";
    // Задаём каждому слайдеру ширину
    sliderSlides.forEach(slide => {
        slide.style.width = width;
    });
    // Функция передвижения слайда
    const moveSlide = () => {
        sliderField.style.transform = `translateX(-${offset}px)`;
    };
    // Клик-ивенты следущий/предыдущий слайды
    sliderNext.addEventListener("click", ()=>{
        if (offset == Number.parseInt(width) * (sliderSlides.length -1)) {
            offset = 0;
        } else {
            offset += Number.parseInt(width);
        }
        moveSlide();
        if (slideIndex == sliderSlides.length) {
            slideIndex = 1;
            dotActive(slideIndex-1);
            changeSliderCounter();
        } else {
            slideIndex++;
            dotActive(slideIndex-1);
            changeSliderCounter();
        }
        
    });
    sliderPrev.addEventListener("click", () => {
        if (offset == 0) {
            offset = Number.parseInt(width) * (sliderSlides.length -1);
        } else {
            offset -= Number.parseInt(width);
        }
        moveSlide();
        if (slideIndex == 1) {
            slideIndex = sliderSlides.length;
            dotActive(slideIndex-1);
            changeSliderCounter();
        } else {
            slideIndex--;
            dotActive(slideIndex-1);
            changeSliderCounter();
        }
    });
    
    
// Навигация для слайдов


    slider.style.position = "relative";

    const carouselIndicator = document.createElement("div");

    
    carouselIndicator.classList.add("carousel-indicators");
    slider.append(carouselIndicator);

    // Функция создания "точек" для навигации        
    const addNewDot = function(parentSelector,dataAttr){
        let dot = document.createElement('div');
        dot.className = 'dot';
        parentSelector.append(dot);
    };
    // Функция показа активной "точки"
    const dotActive = (num) => {
        dot.forEach(element => {
            element.classList.remove("dot__active");
        });
        dot[num].classList.add("dot__active");
    };
    // Создаём "точки" для каждого слайда
    for (let i = 1; i <= sliderImagesDB.length; i++ ) {
        addNewDot(carouselIndicator, i);
    }

    const dot = document.querySelectorAll(".dot");
    dot[0].classList.add("dot__active");


    dot.forEach((element, index) => {
        element.addEventListener("click", (event) => {
            dotActive(index);
            slideIndex = index+1;
            offset = +width.slice(0, width.length - 2) * index;
            moveSlide();
            changeSliderCounter();
            
        });
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector,tabsContentSelector,activeSelector) {
    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector);

    // Функция скрытия табов
    function hideTabContent() {
        tabsContent.forEach((event) => {
            event.classList.add("hide");
        });
        tabs.forEach((event) => {
            event.classList.remove(activeSelector);
        });        
    }
    
    // Функция показа табов
    function showTabContent(arg=0) {
        tabsContent[arg].classList.remove("hide");
        tabs[arg].classList.add(activeSelector);
    }

    // Скрываем табы, показываем таб по умолчанию
    hideTabContent();
    showTabContent();

    // Вешаем лисенер на клик для каждого таба
    tabs.forEach((item, i) => {
        item.addEventListener("click", (event) => {
            hideTabContent();
            showTabContent(i);
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

        // Функция для формирования окончательной даты
        function getTimeRemaining(deadline) {
            const t = Date.parse(deadline) - Date.parse(new Date()),
                  days = Math.floor(t / (1000 * 60 * 60 * 24)),
                  hours = Math.floor((t / (1000 * 60 * 60) ) % 24),
                  minutes = Math.floor(t / (1000 * 60) ) % 60,
                  seconds = Math.floor((t / 1000) ) % 60;
            return {
                "total" : t,
                "days" : days,
                "hours" : hours,
                "minutes" : minutes,
                "seconds" : seconds
            };
        }
    
    
        // Главная функция 
        function setClock(selector, endtime) {
            const timer = document.querySelector(selector),
                  days = timer.querySelector("#days"),
                  hours = timer.querySelector("#hours"),
                  minutes = timer.querySelector("#minutes"),
                  seconds = timer.querySelector("#seconds"),
                  //Включаем повтор функции обновления таймера   
                  timeInterval = setInterval(updateClock, 1000);
    
            // Обновляем таймер, чтобы сразу показывалось актуальная дата окончания 
            updateClock();
    
            // Функция обновления таймера
            function updateClock() {
                const t = getTimeRemaining(endtime);
    
                days.innerHTML = t.days > 9 ? t.days : "0"+ t.days;
                hours.innerHTML = t.hours > 9 ? t.hours : "0"+ t.hours;
                minutes.innerHTML = t.minutes > 9 ? t.minutes : "0"+ t.minutes;
                seconds.innerHTML = t.seconds > 9 ? t.seconds : "0"+ t.seconds;
                // Если наступил дедлайн останавливаем обновление таймера
                if (t.total <= 0) {
                    clearInterval(timeInterval);
                    days.innerHTML = "00";
                    hours.innerHTML = "00";
                    minutes.innerHTML = "00";
                    seconds.innerHTML = "00";
                }
            }
        }
    
        // Запуск главной функции
        setClock(id, deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
    // Функция post запроса с использование fetch и возврат промиса в формате json
    const postData = async (url, data) => {
        const res = await axios.post(url, data);

        return res;
    };
    // Функция создания get запроса
    const getData = async function(url) {
        const res = await axios.get(url);
        // if (!res.ok) {
        //     throw new Error(`Could not fetch ${url}, status: ${res.satus}`);
        // }
        return await res;
    };
    
    

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_post__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/post */ "./js/modules/post.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");

// Табы

// Таймер
    
// Модальное окн;
    
// Карточки "Наше меню на день;
    
// Post запрос;
    
// Слайде;
    
// Калькулятор
    
// show modal
    
// Для того чтобы скрипт выполнялся после загрузки DOM дерева вешаем отлов события
document.addEventListener("DOMContentLoaded", () => {

    // Таймер запуска модального окна
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])(".modal", modalTimerId), 10000000000000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item",".tabcontent" ,"tabheader__item_active");
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])(".timer", "2022-06-29");
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])("[data-modal]", ".modal", modalTimerId);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_post__WEBPACK_IMPORTED_MODULE_4__["default"])("form", modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        sliderArg : ".offer__slider-wrapper",
        slides : ".offer__slide",
        prev : ".offer__slider-prev",
        next : ".offer__slider-next",
        totalSlides : "#total",
        curentSlide : "#current",
        sliderFieldArg : ".offer__slider-inner"
    }),
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();
});













})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map