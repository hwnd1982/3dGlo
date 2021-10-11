import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
// import slider from './modules/slider';
import SliderCarousel from './modules/SliderCarousel ';
import switchTeamPhoto from './modules/switchTeamPhoto';
import formInputHandler from './modules/formInputHandler';
import calcHandler from './modules/calcHandler';
import Validator from './modules/validator';
import { errorMassage, loadMessage, successMessage } from './modules/messageSendForm';
import sendForm from './modules/sendForm';

// countTimer
countTimer('20 oct 2021');
// toggleMenu & smoothScroll
toggleMenu();
// togglePopUp
togglePopUp();
// tabs
tabs();
// slider
const slider = new SliderCarousel({
  main: '.portfolio-slider',
  wrap: '.portfolio-content',
  prev: '#arrow-left',
  next: '#arrow-right',
  loop: true,
  position: 0,
  pagination: true,
  autoplay: true,
  time: 2500,
  slidesToShow: 1
});
slider.init();
// switchTeamPhoto
switchTeamPhoto();
// formInputHandler
formInputHandler();
// calcHandler
calcHandler(100);
// validatiomForms
document.querySelectorAll('form').forEach((form, index) => {
  const validator = new Validator({
    selector: `#${form.id}`,
    pattern: {},
    method: {
      name: [['notEmpty'], ['pattern', 'name']],
      phone: [['notEmpty'], ['pattern', 'phone']],
      email: [['notEmpty'], ['pattern', 'email']],
      message: [['notEmpty'], ['pattern', 'message']]
    },
    message: {
      name: 'Введите Имя.',
      phone: 'Введите телефон.',
      email: 'Введите email.',
      message: 'Введите сообщение.'
    }
  });
  validator.init(index);
});
// sendForm
sendForm(loadMessage, successMessage, errorMassage);
// carousel
const carousel = new SliderCarousel({
  main: '.companies-wrapper',
  wrap: '.companies-hor',
  loop: true,
  position: 0,
  autoplay: true,
  time: 1500,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      slidesToShow: 3
    },
    {
      breakpoint: 768,
      slidesToShow: 2
    },
    {
      breakpoint: 576,
      slidesToShow: 1
    }
  ]
});
carousel.init();
