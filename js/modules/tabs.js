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

export default tabs;