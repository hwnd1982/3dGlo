// Timer
(deadline => {
  let id = 0;
  const
    timerHours = document.querySelector('#timer-hours'),
    timerMinutes = document.querySelector('#timer-minutes'),
    timerSeconds = document.querySelector('#timer-seconds'),
    getTimerRemaining = () => {
      const
        dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = timeRemaining < 0 ? 0 : Math.floor(timeRemaining) % 60,
        minutes = timeRemaining < 0 ? 0 : Math.floor(timeRemaining / 60) % 60,
        hours = timeRemaining < 0 ? 0 : Math.floor(timeRemaining / 60 / 60);
      if (timeRemaining < 0) {
        clearInterval(id);
      }
      return { hours, minutes, seconds };
    },
    updateClock = () => {
      const { hours, minutes, seconds } = getTimerRemaining();

      timerHours.textContent = hours < 10 ? '0' + hours : hours;
      timerMinutes.textContent = ('0' + minutes).slice(-2);
      timerSeconds.textContent = ('0' + seconds).slice(-2);
    };
  updateClock();
  id = setInterval(updateClock, 1000);
})('10 sept 2021');

const
  smoothScrollOfLink = event => {
    const
      target = event.target.tagName === 'A' ? event.target : event.target.closest('a');
    if (target) {
      const
        href = target.getAttribute('href'),
        domRect = href !== '#' ? document.querySelector(href).getBoundingClientRect() : 0;

      event.preventDefault();
      scrollTo({ top: domRect ? domRect.top + window.pageYOffset : 0, behavior: "smooth" });
    }
  };

// smooth Scroll on additional links
document.querySelector('main>a').addEventListener('click', smoothScrollOfLink);
document.querySelectorAll('a[href="#"]').forEach(item => item.addEventListener('click', smoothScrollOfLink));

// Menu & smoothScroll
(() => {
  const
    menu = document.querySelector('menu'),
    hendlerMenu = event => {
      const target = event.target;

      if (target.closest('.menu')) {
        menu.classList.add('active-menu');
      } else {
        if (target.classList.contains('close-btn') || target.closest('menu>ul>li>a')) {
          menu.classList.remove('active-menu');
          if (target.closest('menu>ul>li>a')) {
            smoothScrollOfLink(event);
          }
        }
      }
    };
  document.addEventListener('click', hendlerMenu);
})();

// popUp
(() => {
  const
    popUp = document.querySelector('.popup'),
    popUpBtns = document.querySelectorAll('.popup-btn'),
    animatePopUp = delay => {
      let count = 0;
      const
        animationStep = () => {
          popUp.firstElementChild.style.transform = `translateX(-50px) scale(${count / delay})`;
          popUp.firstElementChild.style.opacity = (1 / delay) * count;
          count++;
        },
        animationReset = () => {
          count = 0;
          popUp.firstElementChild.style.transform = '';
          popUp.firstElementChild.style.opacity = '';
        },
        animation = () => {
          const requestId = requestAnimationFrame(animation);

          if (count !== delay) {
            animationStep();
            return requestId;
          } else {
            cancelAnimationFrame(requestId);
            animationReset();
          }
        };

      animation();
    };

  popUpBtns.forEach(item => {
    item.addEventListener('click', () => {
      popUp.style.display = 'block';
      if (!(screen.width < 768)) {
        animatePopUp(20);
      }
    });
  });
  popUp.addEventListener('click', ({ target }) => {
    target.classList.contains('popup-close') || !target.closest('.popup-content') ?
      popUp.style.display = 'none' : null;

  });
})();

// tabs
(() => {
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
})();
