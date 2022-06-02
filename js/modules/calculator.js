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
export default calculator;