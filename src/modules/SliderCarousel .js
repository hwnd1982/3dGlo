class SliderCarousel {
  constructor({ main, wrap, next, prev, slide, loop = false, position = 0, slidesToShow = 3, responsive = [] }) {
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slidesToShow = slidesToShow;
    this.responsive = responsive;
    this.slides = slide ? [...document.querySelectorAll(slide)] : [...this.wrap.children];
    this.options = {
      position,
      loop,
      widthSlide: Math.floor(100 / this.slidesToShow),
      maxPosition: this.slides.length - this.slidesToShow
    };
  }
  init() {
    this.addGloClass();
    this.addStyle();

    if (!this.next || !this.prev) {
      this.addArrow();
    }
    this.controlSlider();
    if (this.responsive) {
      this.responsiveInit();
    }
  }
  addGloClass() {
    this.main.classList.add('glo-slider');
    this.wrap.classList.add('glo-slider__wrap');
    this.slides.forEach(item => item.classList.add('glo-slider__item'));
  }
  addStyle() {
    const style =  document.getElementById('glo-slider-style') || document.createElement('style');

    style.id = 'glo-slider-style';
    document.body.append(style);
    style.textContent =
      ` .glo-slider {
          overflow: hidden !important;
          position: relative !important;
        }
        .glo-slider__wrap {
          display: flex !important;
          width: 100% !important;
          transition: transform 0.5s !important;
          will-change: transform !important;
        }
        .glo-slider__item {
          flex: 0 0 ${this.options.widthSlide}% !important;
          margin: auto 0 !important;
          position: static !important;
          transform: translate(0, 0) !important;
          width: 100% !important;
          transition: none !important;
          opacity: 1 !important;
        }
        .glo-slider__next,
        .glo-slider__prev {
          position: absolute;
          top: 50%;
          border: 20px solid transparent;
          background: transparent;
          cursor: pointer;
        }
        .glo-slider__next {
          right: 5px;
          border-left-color: #19b5fe;
        }
        .glo-slider__prev {
          left: 5px;
          border-right-color: #19b5fe;
        }
      `;
  }
  controlSlider() {
    this.prev.addEventListener('click', event => this.prevSlide(event));
    this.next.addEventListener('click', event => this.nextSlide(event));
  }
  nextSlide(event) {
    event.preventDefault();
    if (this.options.loop || (this.options.position < this.options.maxPosition)) {
      ++this.options.position;
      if (this.options.position > this.options.maxPosition) {
        this.options.position = 0;
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
  }
  prevSlide(event) {
    event.preventDefault();
    if (this.options.loop || this.options.position > 0) {
      --this.options.position;
      if (this.options.position < 0) {
        this.options.position = this.options.maxPosition;
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
    }
  }
  addArrow() {
    this.prev = document.createElement('div');
    this.next = document.createElement('div');
    this.prev.className = 'glo-slider__prev';
    this.next.className = 'glo-slider__next';
    this.main.append(this.prev);
    this.main.append(this.next);
  }
  responsiveInit() {
    const
      slidersToShowDefault = this.slidesToShow,
      allResponse = this.responsive.map(item => item.breakpoint),
      maxResponse = Math.max(...allResponse),
      checkResponse = () => {
        const widthWindow = document.documentElement.clientWidth;

        if (widthWindow < maxResponse) {
          allResponse.forEach((item, index) => {
            if (widthWindow < allResponse[index]) {
              this.slidesToShow = this.responsive[index];
              this.options.widthSlide = Math.floor(100 / this.slidesToShow);
              this.addStyle();
            }
          });
        } else {
          this.slidesToShow = slidersToShowDefault;
          this.options.widthSlide = Math.floor(100 / this.slidesToShow);
          this.addStyle();
        }
      };
    checkResponse();
    document.addEventListener('resize', checkResponse);
  }
}

export default SliderCarousel;
