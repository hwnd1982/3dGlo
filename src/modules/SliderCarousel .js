class SliderCarousel {
  constructor({
    main,
    wrap,
    next,
    prev,
    slide,
    loop = false,
    pagination = false,
    position = 0,
    autoplay = false,
    time = 3000,
    slidesToShow = 3,
    responsive = [] }) {
    const wrapElem = document.querySelector(wrap);

    this.main = document.querySelector(main);
    this.wrap = {
      master: wrapElem,
      slave: wrapElem.cloneNode(true)
    };
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.dots = [];
    this.slidesToShow = slidesToShow;
    this.interval = 0,
    this.responsive = responsive;
    this.slides = {
      master: slide ? [...this.wrap.master.querySelectorAll(slide)] : [...this.wrap.master.children],
      slave: slide ? [...this.wrap.slave.querySelectorAll(slide)] : [...this.wrap.slave.children]
    };
    this.options = {
      position: {
        master: position,
        slave: 0
      },
      loop,
      pagination,
      autoplay,
      time,
      widthSlide: Math.floor(100 / this.slidesToShow),
      maxPosition: this.slides.master.length - this.slidesToShow
    };
  }
  init() {
    if (!this.next || !this.prev) {
      this.addArrow();
    }
    this.addGloClass();
    this.addStyle();
    if (this.options.pagination) {
      this.dots.push(...this.addPagination());
    }
    this.controlSlider();
    if (this.responsive) {
      this.responsiveInit();
    }
    this.main.insertBefore(this.wrap.slave, this.wrap.master.nextElementSibling);

    if (this.options.autoplay) {
      this.startSlider();
      this.main.addEventListener('mouseover', event =>
        (event.target.matches('.glo-slider__buttons, .dot') ? this.stopSlider() : null));
      this.main.addEventListener('mouseout', event =>
        (event.target.matches('.glo-slider__buttons, .dot') ? this.startSlider(event) : null));
    }
  }
  startSlider() {
    this.interval = setInterval(this.nextSlide.bind(this), this.options.time);
  }
  stopSlider() {
    clearInterval(this.interval);
  }
  addGloClass() {
    this.main.classList.add('glo-slider');
    this.wrap.master.classList.add('glo-slider__wrap');
    this.wrap.master.classList.add('glo-slider__wrap_master');
    if (this.options.position.master >= this.options.maxPosition) {
      this.options.position.slave = this.slides.slave.length;
      this.wrap.slave.style.transform = `translateX(${-this.options.widthSlide * this.options.position.slave}%)`;
    }
    if (this.options.position.master <= this.slidesToShow) {
      this.options.position.slave = this.slides.slave.length;
      this.wrap.slave.style.transform = `translateX(${-this.options.widthSlide * this.options.position.slave}%)`;
    }
    this.wrap.slave.classList.add('glo-slider__wrap');
    this.wrap.slave.classList.add('glo-slider__wrap_slave');
    this.slides.master.forEach(item => item.classList.add('glo-slider__item'));
    this.slides.slave.forEach(item => item.classList.add('glo-slider__item'));
    this.prev.classList.add('glo-slider__buttons');
    this.next.classList.add('glo-slider__buttons');
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
          z-index: 1;
          display: flex !important;
          width: 100% !important;
          transition: transform 0.5s !important;
          will-change: transform !important;
        }
        .glo-slider__wrap.glo-slider__wrap_slave {
          position: absolute !important;
          z-index: -1;
          top: 0 !important;
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
          transform: translate(0, -50%);
          top: 50%;
          border: 20px solid transparent;
          background: transparent;
          cursor: pointer;
          z-index: 10;
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
    if (this.dots) {
      style.textContent +=
        ` .glo-slider__dots {
            position: absolute;
            bottom: 20px;
            width: 100%;
            margin: 20px auto 0;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            justify-content: center;
            z-index: 5;
          }
          .glo-slider__dots .dot {
            cursor: pointer;
            height: 16px;
            width: 16px;
            margin: 0 10px;
            border-radius: 50%;
            border: solid #fff;
            display: inline-block;
            transition: background-color, transform 0.4s, -webkit-transform 0.4s;
          }
          .glo-slider__dots .dot-active {
            background-color: #19b5fe;
            transform: scale(1.2);
          }
          .glo-slider__dots .dot:hover {
            background-color: #53c6fe;
            transform: scale(1.2);
          }`;
    }
  }
  controlSlider() {
    this.prev.addEventListener('click', event => this.prevSlide(event));
    this.next.addEventListener('click', event => this.nextSlide(event));
  }
  nextSlide(event) {
    event ? event.preventDefault() : null;
    if (this.options.pagination) this.changeDot(false);
    ++this.options.position.master;
    ++this.options.position.slave;
    if (this.options.position.master >= 2 * this.slides.master.length - this.slidesToShow - 1) {
      this.wrap.master.style.zIndex = -1;
      this.wrap.slave.style.zIndex = 1;
      this.options.position.master = -this.slidesToShow -
        (2 * this.slides.master.length - this.slidesToShow - this.options.position.master);
    }
    if (this.options.position.slave >= 2 * this.slides.slave.length - this.slidesToShow - 1) {
      this.wrap.slave.style.zIndex = -1;
      this.wrap.master.style.zIndex = 1;
      this.options.position.slave = -this.slidesToShow -
        (2 * this.slides.slave.length - this.slidesToShow - this.options.position.slave);
    }
    this.wrap.master.style.transform = `translateX(${-this.options.widthSlide * this.options.position.master}%)`;
    this.wrap.slave.style.transform = `translateX(${-this.options.widthSlide * this.options.position.slave}%)`;
    if (this.options.pagination) this.changeDot(true);
  }
  changeDot(add) {
    this.dots[this.options.position.master >= 0 && this.options.position.master < this.slides.master.length ?
      this.options.position.master : this.options.position.slave].classList[add ? 'add' : 'remove']('dot-active');
  }
  prevSlide(event) {
    event ? event.preventDefault() : null;
    if (this.options.pagination) this.changeDot(false);
    --this.options.position.master;
    --this.options.position.slave;
    if (this.options.position.master <= -this.slides.master.length + 1) {
      this.wrap.master.style.zIndex = -1;
      this.wrap.slave.style.zIndex = 1;
      this.options.position.master = this.slides.master.length +
        (this.slides.master.length + this.options.position.master);
    }
    if (this.options.position.slave <= -this.slides.slave.length + 1) {
      this.wrap.slave.style.zIndex = -1;
      this.wrap.master.style.zIndex = 1;
      this.options.position.slave = this.slides.master.length +
        (this.slides.slave.length + this.options.position.slave);
    }
    this.wrap.master.style.transform = `translateX(${-this.options.widthSlide * this.options.position.master}%)`;
    this.wrap.slave.style.transform = `translateX(${-this.options.widthSlide * this.options.position.slave}%)`;
    if (this.options.pagination) this.changeDot(true);
  }
  addArrow() {
    this.prev = document.createElement('div');
    this.next = document.createElement('div');
    this.prev.className = 'glo-slider__prev';
    this.next.className = 'glo-slider__next';
    this.main.append(this.prev);
    this.main.append(this.next);
  }
  addPagination() {
    const dotsList = this.main.appendChild(document.createElement('ul'));

    dotsList.classList.add('glo-slider__dots');
    this.slides.master.forEach((elem, index) =>
      (dotsList.innerHTML += `<li class="dot${index === this.options.position.master ?
        ' dot-active' : ''}" id="dot${index}""></li>`));

    dotsList.addEventListener('click',  event => {
      if (!event.target.matches('.dot')) {
        return;
      }
      const delta = this.options.position.master >= 0 && this.options.position.master < this.slides.master.length ?
        +event.target.id.slice(3) - this.options.position.master :
        +event.target.id.slice(3) - this.options.position.slave;
      if (delta) {
        this.changeDot(false);
        if (delta > 0) {
          this.options.position.master += delta - 1;
          this.options.position.slave += delta - 1;
          this.nextSlide(event);
        } else {
          this.options.position.master += delta + 1;
          this.options.position.slave += delta + 1;
          this.prevSlide(event);
        }
      }
    });
    return dotsList.querySelectorAll('.dot');
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
