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
        constructor(imgDir,menuSubtitle, menuDescription, menuTotalCost, parentSelector, ...classes ) {
            this.imgDir = imgDir;
            this.menuSubtitle = menuSubtitle;
            this.menuDescription = menuDescription;
            this.menuTotalCost = menuTotalCost;
            this.parentSelector = parentSelector;
            this.alt = "image";
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }
        // Метод обмен валют
        changeToUAH() {
            this.menuTotalCost = this.menuTotalCost * this.transfer;
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
                <img src="${this.imgDir}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.menuSubtitle}"</h3>
                <div class="menu__item-descr">${this.menuDescription} </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.menuTotalCost}</span> грн/день</div>
                </div>
            </div>`;
        }
              
    }
    // Создаём объекты с данными для заполнения карточек
    const menuFitness = {
        imgDir: "img/tabs/vegy.jpg",
        menuSubtitle: 'Меню "Фитнес"', 
        menuDescription:'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        menuTotalCost: 9
    };
    const menuPremium = {
        imgDir: "img/tabs/elite.jpg",
        menuSubtitle: 'Меню “Премиум”', 
        menuDescription:'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
        menuTotalCost: 20
    };
    const menuLenten = {
        imgDir: "img/tabs/post.jpg",
        menuSubtitle: 'Меню "Постное"', 
        menuDescription:'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
        menuTotalCost: 16
    };
    const allMenues = [menuFitness, menuPremium, menuLenten];
    // Создаём экзепляры класса MenuCard и добавляем на страницу используя метод экземпляра класса .addToHTML

    for (let i of allMenues) {
        new MenuCard(i.imgDir,i.menuSubtitle, i.menuDescription, i.menuTotalCost,menuFieldContainer, "menu__item").addToHTML();
    }
// Post 

    const forms = document.querySelectorAll("form");
    // Сообщения для пользователя при обрабоке пост запроса
    const message = {
        loading: "img/form/spinner.svg",
        succes: "Спасибо, мы скоро с Вами свяжемся",
        failure: "Что-то пошло не так"
    };
    forms.forEach(form => {
        postData(form);
    });
    // Главная функция
    function postData(form) {
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
            // Создание пост запроса 
            const request = new XMLHttpRequest();
            request.open("POST", "server.php");
            // Создание дата файла
            const formData = new FormData(form);

// // Вариант 1 если нужно отправить в формате формдата
//             // Отправка дата файла
//             request.send(formData);

// Вариант 2 если нужно отослать в формате json 
            request.setRequestHeader("Content-type", "application/json");
            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);
            request.send(json);

            form.reset();
            setTimeout(()=>{
                statusMessage.remove();
            }, 3000);
            // Обработка ответа
            request.addEventListener("load", () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksDialog(message.succes);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksDialog(message.failure);

                }
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



    

});





