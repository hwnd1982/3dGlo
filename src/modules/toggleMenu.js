const
  smoothScrollOfLink = event => {
    const
      target = event.target.tagName === 'A' ? event.target : event.target.closest('a');
    if (target) {
      const
        href = target.getAttribute('href'),
        domRect = href !== '#' ? document.querySelector(href).getBoundingClientRect() : 0;

      event.preventDefault();
      scrollTo({ top: domRect ? domRect.top + window.pageYOffset : 0, behavior: "smooth" });
    }
  },
  toggleMenu = () => {
    const
      menu = document.querySelector('menu'),
      hendlerMenu = event => {
        const target = event.target;

        if (target.closest('.menu')) {
          menu.classList.add('active-menu');
        } else {
          if (!target.closest('menu') || target.classList.contains('close-btn') || target.closest('menu>ul>li>a')) {
            menu.classList.remove('active-menu');
            // smooth Scroll on additional & menu links
            if (target.closest('menu>ul>li>a') || target.closest('main>a') ||
            target.closest('a[href="#"]') && !target.classList.contains('portfolio-btn')) {
              smoothScrollOfLink(event);
            }
          }
        }
      };
    document.addEventListener('click', hendlerMenu);
  };

export default toggleMenu;
