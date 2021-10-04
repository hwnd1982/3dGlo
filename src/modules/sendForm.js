const sendForm = (
  loadMessage = 'Загрузка...',
  successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
  errorMassage = 'Что-то пошло не так...'
) => {
  let timerLifeOfStatusMessage;
  const
    hideStatusMessage = (form, statusMessage, time) => setTimeout(() => {
      statusMessage.style = '';
      statusMessage.textContent = '';
      if (form.closest('.popup')) {
        form.closest('.popup').style.display = 'none';
      }
    }, time),
    clearForm = form => {
      [...form.elements].forEach(elem => {
        elem.value = '';
        elem.classList.remove('success');
      });
    },
    outputData = (response, form, statusMessage) => {
      if (response.status !== 200) {
        throw new Error('status network not 200');
      }
      statusMessage.innerHTML = successMessage;
      clearForm(form);
      timerLifeOfStatusMessage = hideStatusMessage(form, statusMessage, 3000);
    },
    errorData = (form, statusMessage) => {
      statusMessage.innerHTML = errorMassage;
      timerLifeOfStatusMessage = hideStatusMessage(form, statusMessage, 3000);
    },
    postData = body =>
      fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: 'include'
      });

  document.body.addEventListener('submit', event => {
    const
      form = event.target,
      statusMessage = form.appendChild(document.createElement('div'));

    event.preventDefault();
    if (form.classList.contains('invalid')) {
      return;
    }
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
    postData(body)
      .then(response => outputData(response, form, statusMessage))
      .catch(() => errorData(form, statusMessage));
  });
};

export default sendForm;
