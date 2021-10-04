const formInputHandler = () => {
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
    target.matches('input[name="user_message"]') ? target.value = target.value
      .replace(/\s[!.?]/g, str => str.trim()) : null;
  }, true);
};

export default formInputHandler;
