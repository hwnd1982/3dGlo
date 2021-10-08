import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import SliderCarousel from './modules/SliderCarousel ';
import switchTeamPhoto from './modules/switchTeamPhoto';
import formInputHandler from './modules/formInputHandler';
import calcHandler from './modules/calcHandler';
import Validator from './modules/validator';
import { errorMassage, loadMessage, successMessage } from './modules/messageSendForm';
import sendForm from './modules/sendForm';

// countTimer
countTimer('10 oct 2021');
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
  loop: false,
  position: 0,
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
