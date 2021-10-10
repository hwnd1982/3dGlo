const slider = () => {
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
};

export default slider;
