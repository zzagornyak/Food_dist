import {closeModal, showModal} from "./modal";
import {postData} from "../services/services";

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
            postData("http://localhost:3000/requests", json)
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
        showModal(".modal", modalTimerId);

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
            closeModal(".modal");
        }, 4000);

        }
}
export default post;