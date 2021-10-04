import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import switchTeamPhoto from './modules/switchTeamPhoto';
import formInputHandler from './modules/formInputHandler';
import calcHandler from './modules/calcHandler';
import Validator from '../plugins/validator/validator';
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
slider();
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
