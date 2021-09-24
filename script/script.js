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
  },
  makeEaseOut = timing => timeFraction => 1 - timing(1 - timeFraction),
  square = timeFraction => Math.pow(timeFraction, 2),
  animate = ({ duration, draw, timing }) => {
    const
      start = performance.now(),
      requestID = requestAnimationFrame(function animate(time) {
        const
          timeFraction = (time - start) / duration,
          progress = timing(timeFraction > 1 ? 1 : timeFraction),
          stop = draw.call(null, progress);

        if (timeFraction < 1 && !stop) {
          return requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(requestID);
        }
      });
  };

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
})('23 sept 2021');

// Menu & smoothScroll
(() => {
  const
    menu = document.querySelector('menu'),
    hendlerMenu = event => {
      const target = event.target;

      if (target.closest('.menu')) {
        menu.classList.add('active-menu');
      } else {
        if (!target.closest('menu') || target.classList.contains('close-btn') || target.closest('menu>ul>li>a')) {
          menu.classList.remove('active-menu');
          // smooth Scroll on additional & menu links
          if (target.closest('menu>ul>li>a') || target.closest('main>a') ||
            target.closest('a[href="#"]') && !target.classList.contains('portfolio-btn')) {
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

// slider
(() => {
  let
    currentSlide = 0,
    interval;
  const
    slider = document.querySelector('.portfolio-content'),
    slides = slider.querySelectorAll('.portfolio-item'),
    createPagination = (slider, slides) => {
      const dotsList = slider.appendChild(document.createElement('ul'));

      dotsList.classList.add('portfolio-dots');
      slides.forEach((elem, index) =>
        (dotsList.innerHTML += `<li class="dot${!index ? ' dot-active' : ''}" id="dot${index}""></li>`));
      return dotsList.querySelectorAll('.dot');
    },
    dots = createPagination(slider, slides),
    prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    },
    nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    },
    autoPlaySlider = () => {
      prevSlide(slides, currentSlide, 'portfolio-item-active');
      prevSlide(dots, currentSlide, 'dot-active');
      currentSlide = currentSlide < slides.length - 1 ? ++currentSlide : 0;
      nextSlide(slides, currentSlide, 'portfolio-item-active');
      nextSlide(dots, currentSlide, 'dot-active');
    },
    startSlider = (time = 3000) => {
      interval = setInterval(autoPlaySlider, time);
    },
    stopSlider = () => {
      clearInterval(interval);
    };

  // handling a click on controls
  slider.addEventListener('click', event => {
    const target = event.target;

    if (!target.matches('.portfolio-btn, .dot')) {
      return;
    }
    event.preventDefault();
    prevSlide(slides, currentSlide, 'portfolio-item-active');
    prevSlide(dots, currentSlide, 'dot-active');
    target.matches('#arrow-right') ? currentSlide = currentSlide < slides.length - 1 ? ++currentSlide : 0 : null;
    target.matches('#arrow-left') ? currentSlide = currentSlide > 0 ? --currentSlide : slides.length - 1 : null;
    target.matches('.dot') ? currentSlide = +target.id.slice(3) : null;
    nextSlide(slides, currentSlide, 'portfolio-item-active');
    nextSlide(dots, currentSlide, 'dot-active');
  });
  // autoPlay blocking
  slider.addEventListener('mouseover', event =>
    (event.target.matches('.portfolio-btn, .dot') ? stopSlider() : null));
  // autoPlay restart
  slider.addEventListener('mouseout', event =>
    (event.target.matches('.portfolio-btn, .dot') ? startSlider(1500) : null));

  startSlider(1500);
})();

// switchTeamPhoto
(() => {
  const
    command = document.getElementById('command'),
    toggleDataImg = ({ target }) => (!target.matches('.command__photo') ? null :
      [target.dataset.img, target.src] = [target.src, target.dataset.img]);

  command.addEventListener('mouseover', toggleDataImg);
  command.addEventListener('mouseout', toggleDataImg);
})();

// formInput
(() => {
  document.addEventListener('input', ({ target }) => {
    if (!target.matches(
      'input[name="user_name"], input[name="user_email"], input[name="user_phone"], input[name="user_message"]')) {
      return;
    } else {
      target.matches('input[name="user_name"]') ?
        target.value = target.value.replace(/[^а-яё\s]+/gi, '') : null;
      target.matches('input[name="user_message"]') ?
        target.value = target.value.replace(/[^а-яё\d\s!?.,-]+/gi, '') : null;
      target.matches('input[name="user_email"]') ?
        target.value = target.value.replace(/[^\w\d@"-_.!~*']+/gi, '') : null;
      target.matches('input[name="user_phone"]') ? target.value = target.value.replace(/[^+\d()-]+/g, '') : null;
    }
  });
  document.addEventListener('change', ({ target }) => {
    if (!target.matches(
      'input[name="user_name"], input[name="user_email"], input[name="user_phone"], input[name="user_message"]')) {
      return;
    }
    target.value = target.value.replace(/([-()@_.!~*'])(?=[-()@_.!~*']*\1)/g, '')
      .replace(/([\s])(?=[\s]*\1)/g, '')
      .replace(/^([\s-]*)|([\s-]*)$/g, '');
    target.matches('input[name="user_name"]') ? target.value = target.value
      .replace(/[^-\s]+/gi, str => str[0].toUpperCase() + str.slice(1).toLowerCase()) : null;
    target.matches('input[name="user_phone"]') ? target.value = target.value
      .replace(/\+/g, '').replace(/^\+?[78]?/g, '+7') : null;
  }, true);
})();

// calcInput & calc
((price = 100) => {
  const
    calcBlock = document.querySelector('.calc-block'),
    calcType = calcBlock.querySelector('.calc-type'),
    calcSquare = calcBlock.querySelector('.calc-square'),
    calcDay = calcBlock.querySelector('.calc-day'),
    calcCount = calcBlock.querySelector('.calc-count'),
    totalValue = document.getElementById('total'),
    countSum = (price, typeValue, squareValue, countValue, dayValue) => (typeValue && squareValue ?
      Math.ceil(price * typeValue * squareValue * countValue * dayValue) : 0),
    drawCalculation = (item, newValue, progress) => {
      if (newValue === +item.textContent) {
        return true;
      } else {
        item.textContent = Math[(newValue > +item.textContent ? 'ceil' : 'floor')](
          +item.textContent + progress * (newValue - item.textContent));
      }
    },
    addCalculationAnimation = (item, newValue) => {
      animate({
        duration: 2000,
        timing: makeEaseOut(square),
        draw: drawCalculation.bind(null, item, newValue)
      });
    };

  calcBlock.addEventListener('input', ({ target }) => {
    target.matches('input.calc-item') ? target.value = target.value.replace(/\D/g, '') : null;
    const
      typeValue = calcType.options[calcType.selectedIndex].value,
      squareValue = calcSquare.value,
      dayValue = calcDay.value && calcDay.value < 5 ? 2 : calcDay.value && calcDay.value < 10 ? 1.5 : 1,
      countValue = calcCount.value > 1 ? 1 + (calcCount.value - 1) / 10 : 1;

    if (target.matches('select, input')) {
      const newValue = countSum(price, typeValue, squareValue, countValue, dayValue);

      if (newValue !== +totalValue.textContent) {
        addCalculationAnimation(totalValue, newValue);
      }
    }
  });
})(100);

// send-ajax form
const sendForm = event => {
  let timerLifeOfStatusMessage;
  const
    form = event.target,
    errorMassage =
      `
      <style>
        svg {
          width: 100%;
          height: 100%;
        }

        path {
          stroke-dasharray: 99.47578430175781;
          stroke-dashoffset: -99.47578430175781;
          fill: transparent;
        }

        svg.animate path {
          animation: 1.7s ease forwards draw;
          opacity: 1;
        }

        @keyframes draw {
          0% {
            opacity: 1;
            stroke-dashoffset: -99.47578430175781;
            fill: transparent;
            transform: translateY(0);
          }

          50% {
            stroke-dashoffset: 0;
            fill: transparent;
          }

          100% {
            fill: #bd313e;
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>

      <svg class="animate" viewbox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m6.5 22.8l2.7 2.7 6.8-6.8 6.8 6.8 2.7-2.7-6.8-6.8 6.8-6.8-2.7-2.7-6.8 6.8-6.8-6.8-2.7 2.7 6.8 6.8-6.8 6.8z"
          stroke="#bd313e"
          fill="transparent"
        />
      </svg>
    `,
    loadMessage =
      `
      <style>
        .sk-circle-bounce {
          width: 100px;
          height: 100px;
          position: relative;
          margin: auto;
        }

        .sk-child {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }

        .sk-circle-bounce .sk-circle-2 {
          transform: rotate(30deg);
        }
        .sk-circle-bounce .sk-circle-3 {
          transform: rotate(60deg);
        }
        .sk-circle-bounce .sk-circle-4 {
          transform: rotate(90deg);
        }
        .sk-circle-bounce .sk-circle-5 {
          transform: rotate(120deg);
        }
        .sk-circle-bounce .sk-circle-6 {
          transform: rotate(150deg);
        }
        .sk-circle-bounce .sk-circle-7 {
          transform: rotate(180deg);
        }
        .sk-circle-bounce .sk-circle-8 {
          transform: rotate(210deg);
        }
        .sk-circle-bounce .sk-circle-9 {
          transform: rotate(240deg);
        }
        .sk-circle-bounce .sk-circle-10 {
          transform: rotate(270deg);
        }
        .sk-circle-bounce .sk-circle-11 {
          transform: rotate(300deg);
        }
        .sk-circle-bounce .sk-circle-12 {
          transform: rotate(330deg);
        }

        .sk-circle-bounce .sk-circle-2:before {
          animation-delay: -1.1s;
        }
        .sk-circle-bounce .sk-circle-3:before {
          animation-delay: -1s;
        }
        .sk-circle-bounce .sk-circle-4:before {
          animation-delay: -0.9s;
        }
        .sk-circle-bounce .sk-circle-5:before {
          animation-delay: -0.8s;
        }
        .sk-circle-bounce .sk-circle-6:before {
          animation-delay: -0.7s;
        }
        .sk-circle-bounce .sk-circle-7:before {
          animation-delay: -0.6s;
        }
        .sk-circle-bounce .sk-circle-8:before {
          animation-delay: -0.5s;
        }
        .sk-circle-bounce .sk-circle-9:before {
          animation-delay: -0.4s;
        }
        .sk-circle-bounce .sk-circle-10:before {
          animation-delay: -0.3s;
        }
        .sk-circle-bounce .sk-circle-11:before {
          animation-delay: -0.2s;
        }
        .sk-circle-bounce .sk-circle-12:before {
          animation-delay: -0.1s;
        }

        .sk-child:before {
          content: "";
          display: block;
          margin: 0 auto;
          width: 15%;
          height: 15%;
          background-color: #19b5fe;
          border-radius: 100%;
          animation: sk-circle-bounce-delay 1.2s infinite ease-in-out both;
        }

        @keyframes sk-circle-bounce-delay {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      </style>
      <div class="sk-circle-bounce">
        <div class="sk-child sk-circle-1"></div>
        <div class="sk-child sk-circle-2"></div>
        <div class="sk-child sk-circle-3"></div>
        <div class="sk-child sk-circle-4"></div>
        <div class="sk-child sk-circle-5"></div>
        <div class="sk-child sk-circle-6"></div>
        <div class="sk-child sk-circle-7"></div>
        <div class="sk-child sk-circle-8"></div>
        <div class="sk-child sk-circle-9"></div>
        <div class="sk-child sk-circle-10"></div>
        <div class="sk-child sk-circle-11"></div>
        <div class="sk-child sk-circle-12"></div>
      </div>
      `,
    successMessage =
      `
      <style>
        svg {
          width: 100%;
          height: 100%;
        }

        path {
          stroke-dasharray: 99.47578430175781;
          stroke-dashoffset: -99.47578430175781;
          fill: transparent;
        }

        svg.animate path {
          animation: 1.7s ease forwards draw;
          opacity: 1;
        }

        @keyframes draw {
          0% {
            opacity: 1;
            stroke-dashoffset: -99.47578430175781;
            fill: transparent;
            transform: translateY(0);
          }

          50% {
            stroke-dashoffset: 0;
            fill: transparent;
          }

          100% {
            fill: #3da35a;
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>

      <svg class="animate" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z"
          d="M12.696 11.282l26.022 26.02-1.414 1.415-26.022-26.02z"
          d="M37.304 11.282l1.414 1.414-26.022 26.02-1.414-1.413z"
          stroke="#3da35a"
          fill="transparent"
        />
      </svg>
    `,
    statusMessage = form.appendChild(document.createElement('div')),
    hideStatusMessage = time => setTimeout(() => {
      statusMessage.style = '';
      statusMessage.textContent = '';
      if (form.closest('.popup')) {
        form.closest('.popup').style.display = 'none';
      }
    }, time),
    clearForm = () => {
      [...form.elements].forEach(elem => {
        elem.value = '';
        elem.classList.remove('success');
      });
    },
    outputData = () => {
      statusMessage.innerHTML = successMessage;
      clearForm();
      timerLifeOfStatusMessage = hideStatusMessage(3000);
    },
    errorData = error => {
      console.error(error);
      statusMessage.innerHTML = errorMassage;
      timerLifeOfStatusMessage = hideStatusMessage(3000);
    },
    postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();

      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        } else {
          if (request.status === 200) {
            outputData();
          } else {
            errorData(request.status);
          }
        }
      });
      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(body));
    };

  event.preventDefault();
  if (form.classList.contains('invalid')) {
    return;
  } else {
    const formData = new FormData(form), body = {};

    formData.forEach((value, key) => body[key] = value);
    statusMessage.style.cssText =
        ` 
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          height: 150px;
        `;
    statusMessage.innerHTML = loadMessage;
    if (timerLifeOfStatusMessage) {
      clearTimeout(timerLifeOfStatusMessage);
    }
    postData(body, outputData, errorData);
  }
};

document.body.addEventListener('submit', sendForm);
