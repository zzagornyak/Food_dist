import {getData} from "../services/services";

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
    getData("http://localhost:3000/menu")
    // применение деструктуризации в forEach
    .then((data)=>data.data.forEach(({img, title, descr, price}) => {
        new MenuCard(img, title, descr, price, menuFieldContainer, "menu__item").addToHTML();
    }));
       
}
export default cards;