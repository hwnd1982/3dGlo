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
      href = (event.currentTarget.getAttribute('href') ||
        event.currentTarget.querySelector('a').getAttribute('href')),
      domRect = href !== '#' ? document.querySelector(href).getBoundingClientRect() : 0;

    event.preventDefault();
    scrollTo({ top: domRect ? domRect.y : 0, behavior: "smooth" });
  };

// Menu & smoothScroll
(() => {
  const
    btn = document.querySelector('.menu'),
    menu = document.querySelector('menu'),
    closeBtn = document.querySelector('.close-btn'),
    menuItems = menu.querySelectorAll('ul>li'),
    scrollBtn = document.querySelector('main>a'),
    hendlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

  btn.addEventListener('click', hendlerMenu);
  closeBtn.addEventListener('click', hendlerMenu);
  menuItems.forEach(item => item.addEventListener('click', event => {
    hendlerMenu();
    smoothScrollOfLink(event);
  }));
  scrollBtn.addEventListener('click', smoothScrollOfLink);
})();

// popUp
(() => {
  const
    popUp = document.querySelector('.popup'),
    popUpBtns = document.querySelectorAll('.popup-btn'),
    popupClose = document.querySelector('.popup-close'),
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
  popupClose.addEventListener('click', () => {
    popUp.style.display = 'none';
  });
})();

document.querySelectorAll('a[href="#"]').forEach(item => item.addEventListener('click', smoothScrollOfLink));
