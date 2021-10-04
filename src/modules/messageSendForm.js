const
  errorMassageColor = `#bd313e;
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>`,
  successMessageColor = `#3da35a;
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>`,
  svgAnimationByCSS =
      `<style>
        svg {
          width: 100%;
          height: 100%;
        }

        path {
          stroke-dasharray: 99.47578430175781;
          stroke-dashoffset: -99.47578430175781;
          fill: transparent;
        }

        svg.animate path {
          animation: 1.7s ease forwards draw;
          opacity: 1;
        }

        @keyframes draw {
          0% {
            opacity: 1;
            stroke-dashoffset: -99.47578430175781;
            fill: transparent;
            transform: translateY(0);
          }

          50% {
            stroke-dashoffset: 0;
            fill: transparent;
          }

          100% {
            fill: `,
  errorMassage =
      `${svgAnimationByCSS + errorMassageColor}

      <svg class="animate" viewbox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m6.5 22.8l2.7 2.7 6.8-6.8 6.8 6.8 2.7-2.7-6.8-6.8 6.8-6.8-2.7-2.7-6.8 6.8-6.8-6.8-2.7 2.7 6.8 6.8-6.8 6.8z"
          stroke="#bd313e"
          fill="transparent"
        />
      </svg>`,
  loadMessage =
      `<style>
        .sk-circle-bounce {
          width: 100px;
          height: 100px;
          position: relative;
          margin: auto;
        }
        .sk-child {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
        .sk-circle-bounce .sk-circle-2 {
          transform: rotate(30deg);
        }
        .sk-circle-bounce .sk-circle-3 {
          transform: rotate(60deg);
        }
        .sk-circle-bounce .sk-circle-4 {
          transform: rotate(90deg);
        }
        .sk-circle-bounce .sk-circle-5 {
          transform: rotate(120deg);
        }
        .sk-circle-bounce .sk-circle-6 {
          transform: rotate(150deg);
        }
        .sk-circle-bounce .sk-circle-7 {
          transform: rotate(180deg);
        }
        .sk-circle-bounce .sk-circle-8 {
          transform: rotate(210deg);
        }
        .sk-circle-bounce .sk-circle-9 {
          transform: rotate(240deg);
        }
        .sk-circle-bounce .sk-circle-10 {
          transform: rotate(270deg);
        }
        .sk-circle-bounce .sk-circle-11 {
          transform: rotate(300deg);
        }
        .sk-circle-bounce .sk-circle-12 {
          transform: rotate(330deg);
        }
        .sk-circle-bounce .sk-circle-2:before {
          animation-delay: -1.1s;
        }
        .sk-circle-bounce .sk-circle-3:before {
          animation-delay: -1s;
        }
        .sk-circle-bounce .sk-circle-4:before {
          animation-delay: -0.9s;
        }
        .sk-circle-bounce .sk-circle-5:before {
          animation-delay: -0.8s;
        }
        .sk-circle-bounce .sk-circle-6:before {
          animation-delay: -0.7s;
        }
        .sk-circle-bounce .sk-circle-7:before {
          animation-delay: -0.6s;
        }
        .sk-circle-bounce .sk-circle-8:before {
          animation-delay: -0.5s;
        }
        .sk-circle-bounce .sk-circle-9:before {
          animation-delay: -0.4s;
        }
        .sk-circle-bounce .sk-circle-10:before {
          animation-delay: -0.3s;
        }
        .sk-circle-bounce .sk-circle-11:before {
          animation-delay: -0.2s;
        }
        .sk-circle-bounce .sk-circle-12:before {
          animation-delay: -0.1s;
        }
        .sk-child:before {
          content: "";
          display: block;
          margin: 0 auto;
          width: 15%;
          height: 15%;
          background-color: #19b5fe;
          border-radius: 100%;
          animation: sk-circle-bounce-delay 1.2s infinite ease-in-out both;
        }
        @keyframes sk-circle-bounce-delay {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      </style>
      <div class="sk-circle-bounce">
        <div class="sk-child sk-circle-1"></div>
        <div class="sk-child sk-circle-2"></div>
        <div class="sk-child sk-circle-3"></div>
        <div class="sk-child sk-circle-4"></div>
        <div class="sk-child sk-circle-5"></div>
        <div class="sk-child sk-circle-6"></div>
        <div class="sk-child sk-circle-7"></div>
        <div class="sk-child sk-circle-8"></div>
        <div class="sk-child sk-circle-9"></div>
        <div class="sk-child sk-circle-10"></div>
        <div class="sk-child sk-circle-11"></div>
        <div class="sk-child sk-circle-12"></div>
      </div>`,
  successMessage =
      `${svgAnimationByCSS + successMessageColor}
      <svg class="animate" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z"
          d="M12.696 11.282l26.022 26.02-1.414 1.415-26.022-26.02z"
          d="M37.304 11.282l1.414 1.414-26.022 26.02-1.414-1.413z"
          stroke="#3da35a"
          fill="transparent"
        />
      </svg>`;

export { loadMessage, successMessage, errorMassage };
