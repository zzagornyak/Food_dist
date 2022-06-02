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
export default slider;