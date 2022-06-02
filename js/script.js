"use strict";
// Табы
import tabs from "./modules/tabs";
// Таймер
    import timer from "./modules/timer";
// Модальное окн;
    import  modal from "./modules/modal";
// Карточки "Наше меню на день;
    import cards from "./modules/cards";
// Post запрос;
    import post from "./modules/post";
// Слайде;
    import slider from "./modules/slider";
// Калькулятор
    import calculator from "./modules/calculator";
// show modal
    import showModal from "./modules/modal";
// Для того чтобы скрипт выполнялся после загрузки DOM дерева вешаем отлов события
document.addEventListener("DOMContentLoaded", () => {

    // Таймер запуска модального окна
    const modalTimerId = setTimeout(() => showModal(".modal", modalTimerId), 10000000000000);

    tabs(".tabheader__item",".tabcontent" ,"tabheader__item_active");
    timer(".timer", "2022-06-29");
    modal("[data-modal]", ".modal", modalTimerId);
    cards();
    post("form", modalTimerId);
    slider({
        sliderArg : ".offer__slider-wrapper",
        slides : ".offer__slide",
        prev : ".offer__slider-prev",
        next : ".offer__slider-next",
        totalSlides : "#total",
        curentSlide : "#current",
        sliderFieldArg : ".offer__slider-inner"
    }),
    calculator();
});












