class Validator {
  constructor({ selector, pattern = {}, method, message }) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.message = message;
    this.elementsForm = [...this.form.elements]
      .filter(elem => elem.tagName.toLowerCase() === 'input' && elem.typy !== 'button');
    this.error = new Set();
  }
  init(style) {
    !style ? this.applyStyle() : null;
    this.setPattern();
    this.form.addEventListener('submit', () => {
      this.elementsForm.forEach(elem => this.checkIt({ target: elem }));
      this.error.size ? this.form.classList.add('invalid') : this.form.classList.remove('invalid');
    });
    this.elementsForm.forEach(elem => {
      const wrap = elem.parentElement.appendChild(document.createElement('div'));
      wrap.classList.add('wrap');
      wrap.append(elem);
      elem.removeAttribute('required');
      elem.addEventListener('input', this.checkIt.bind(this));
      elem.addEventListener('blur', this.checkIt.bind(this));
    });
  }
  checkIt({ target }) {
    this.isValid(target) ? this.showSuccess(target) : this.showError(target);
  }
  isValid(elem) {
    const
      validatorMethod = {
        notEmpty: value => value.trim() !== '',
        pattern: (value, pattern) => pattern.test(value)
      },
      type = elem.name.replace(/^(user_)/, ''),
      method = this.method ? this.method[type] : [];

    return method ? method.every(item => validatorMethod[item[0]](elem.value, this.pattern[item[1]])) : true;
  }
  showError(elem) {
    this.error.add(elem);
    elem.classList.remove('success');
    elem.classList.add('error');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('error-message')) {
      return;
    }
    const
      errorDiv = document.createElement('div'),
      type = elem.name.replace(/^(user_)/, '');
    errorDiv.textContent =  this.message[type] || `Ошибка в этом поле...`;
    errorDiv.classList.add('error-message');
    elem.insertAdjacentElement('afterend', errorDiv);
  }
  showSuccess(elem) {
    this.error.delete(elem);
    elem.classList.remove('error');
    elem.classList.add('success');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('error-message')) {
      elem.nextElementSibling.remove();
    }
  }
  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        border: 2px solid green !important;
      }
      input.error {
        color: red !important;
        border: 2px solid red !important;
      }
      .wrap {
        position: relative;
        margin: 0;
      }
      .error-message {
        position: absolute;
        right: 10px;
        font-size: 12px;
        font-family: sans-serif;
        color: red;
        bottom: 0;
        left: 50%;
        height: 18px;
        background-color: #ffffff;
        border-radius: 10px;
        padding: 0px 5px;
        width: 150px;
        transform: translate(-75px, 3px);
        border: 1px solid;
      }
    `;
    document.head.append(style);
  }
  setPattern() {
    this.pattern.phone = this.pattern.phone || /^\+?[78](([-()]*\d){10})$/;
    this.pattern.email = this.pattern.email || /^[\w\d"-_.!~*']*@[\w\d"-_.!~*']*\.\w{2,}$/;
    this.pattern.name = this.pattern.name || /^([А-ЯЁ]([а-яё]+)?)([\s][А-ЯЁ]([а-яё]+)?)*([\s][А-ЯЁ]([а-яё]+)?)?$/;
    this.pattern.message = this.pattern.message ||
      /^([\dа-яё]+)(([?!.,])?(\s-)?([\s][\dа-яё]+))*([\s][\dа-яё]+)?([!?.]{0,3})?$/i;
  }
}

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
