const tabs = () => {
  const
    tabsHeader = document.querySelector('.service-header'),
    tabs = document.querySelectorAll('.service-header-tab'),
    tabsContent = document.querySelectorAll('.service-tab'),
    showContent = index => {
      tabs[index].classList.add('active');
      tabsContent[index].classList.remove('d-none');
    },
    hideContent = index => {
      tabs[index].classList.remove('active');
      tabsContent[index].classList.add('d-none');
    };

  tabsHeader.addEventListener('click', ({ target }) => {
    target = target.closest('.service-header-tab');
    if (target) {
      tabs.forEach((item, index) => (item === target ? showContent(index) : hideContent(index)));
    }
  });
};

export default tabs;
