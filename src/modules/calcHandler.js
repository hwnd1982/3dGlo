const
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
  },
  calcHandler = (price = 100) => {
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
  };

export default calcHandler;
