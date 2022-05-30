"use strict";

// Для того чтобы скрипт выполнялся после загрузки DOM дерева вешаем отлов события
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll(".tabcontent"),
          tabsParent = document.querySelector(".tabheader__items"),
          tabsDescription = document.querySelectorAll(".tabcontent__descr");


// Табы

    // Функция скрытия табов
    function hideTabContent() {
        tabsContent.forEach((event) => {
            event.classList.add("tabcontent__invisible");
        });
        tabs.forEach((event) => {
            event.classList.remove("tabheader__item_active");
        });        
    }

    // Функция показа табов
    function showTabContent(arg=0) {
        tabsContent[arg].classList.remove("tabcontent__invisible");
        tabs[arg].classList.add("tabheader__item_active");
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


// Таймер

    // Задаём дату окончания акции
    const endTime = "2022-05-29";

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
    setClock(".timer", endTime);


// Модальное окно

    // Находим нужные классы
    let modal = document.querySelector(".modal"),
        modalOpen = document.querySelectorAll("[data-modal]");

    // Функция скрытия модального окна
    function closeModal () {
        modal.style.display = "none";
        document.body.style.overflow = "";    
    }

    // Функция показа модального окна
    function showModal () {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; 
        clearInterval(modalTimerId);  
    }

    // Вешаем лисенер на клик для каждой кнопки
    modalOpen.forEach(element => {
        element.addEventListener("click", showModal);
    }); 

    // Вешаем лисенер на клик на подложку модального окна для закрытия модального окна и на кнопку закрытия
    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal(modal);
        }     
    });

    // Лисенер на кнопку Escape для закрытия модального окна
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.style.display === "block") {
            closeModal();
        }
    });

    // Таймер запуска модального окна
    const modalTimerId = setTimeout(showModal, 10000000000000);

    // Лисенер на скрол в котором запускаем функцию показа модального окна при пролистывании до конца страницы
    window.addEventListener("scroll", showModalByScrol);

    // Функция открытия модального окна в конце страницы
    function showModalByScrol() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            showModal();
            window.removeEventListener("scroll", showModalByScrol);
        }
    }


// Карточки "Наше меню на день"

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

    // Функция создания get запроса
    const getData = async function(url) {
        const res = await axios.get(url);
        // if (!res.ok) {
        //     throw new Error(`Could not fetch ${url}, status: ${res.satus}`);
        // }
        return await res;
    };
    // Создаём get запрос и с полученными данными добавляем табы на страницу
    getData("http://localhost:3000/menu")
    // применение деструктуризации в forEach
    .then((data)=>data.data.forEach(({img, title, descr, price}) => {
        new MenuCard(img, title, descr, price, menuFieldContainer, "menu__item").addToHTML();
    }));
       
        
// Post запросы

    const forms = document.querySelectorAll("form");

    // Сообщения для пользователя при обрабоке пост запроса
    const message = {
        loading: "img/form/spinner.svg",
        succes: "Спасибо, мы скоро с Вами свяжемся",
        failure: "Что-то пошло не так"
    };
    forms.forEach(form => {
        bindPostData(form);
    });

    // Функция post запроса с использование fetch и возврат промиса в формате json
    const postData = async (url, data) => {
        const res = await axios.post(url, data);

        return res;
    };

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
            postData("http://localhost:3000/requests", json)
            .then(function (response) {
                console.log(response);
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
        showModal();

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
            closeModal();
        }, 4000);

        }



// 1. Получаем все элементы с которыми работаем;
// 2. Получить индекс текущего слайдера 
// 3. Написание функции показывающей слайдеры
//     3.1 показ и скрытие других
//     3.2 проверка конца и начала

   

// Слайдер

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
    },];

    const sliderWrapper = document.querySelector(".offer__slider-wrapper"),
          sliderSlides = document.querySelectorAll(".offer__slide"),
          sliderPrev = document.querySelector(".offer__slider-prev"),
          sliderNext = document.querySelector(".offer__slider-next"),
          sliderTotalSlides = document.querySelector("#total"),
          sliderCurrentSlide = document.querySelector("#current"),
          sliderField = document.querySelector(".offer__slider-inner"),
          width = window.getComputedStyle(sliderWrapper).width;

    let offset = 0,
        slideIndex = 1;

    const changeSliderCounter = () => {
        if (sliderSlides.length <10) {
            sliderTotalSlides.textContent = `0${sliderSlides.length}`;
            sliderCurrentSlide.textContent = `0${slideIndex}`;
        } else {
            sliderTotalSlides.textContent = sliderSlides.length;
            sliderCurrentSlide.textContent = slideIndex;
        }
    };    
    changeSliderCounter();

    sliderField.style.width = 100 * sliderSlides.length + "%";
    sliderField.style.display = "flex";
    sliderField.style.transition = "0.5s all";

    sliderWrapper.style.overflow = "hidden";

    sliderSlides.forEach(slide => {
        slide.style.width = width;
    });

    sliderNext.addEventListener("click", ()=>{
        if (offset == +width.slice(0, width.length - 2) * (sliderSlides.length -1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length-2);
        }
        sliderField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == sliderSlides.length) {
            slideIndex = 1;
            changeSliderCounter();
        } else {
            slideIndex++;
            changeSliderCounter();
        }
    });
    sliderPrev.addEventListener("click", ()=>{
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (sliderSlides.length -1);
        } else {
            offset -= +width.slice(0, width.length-2);
        }
        sliderField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == 1) {
            slideIndex = sliderSlides.length;
            changeSliderCounter();
        } else {
            slideIndex--;
            changeSliderCounter();
        }
    });
    sliderPrev.addEventListener("click", ()=>{

    });
    
    
    
});















