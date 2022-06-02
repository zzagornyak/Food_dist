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
export default modal;
export {closeModal};
export {showModal};