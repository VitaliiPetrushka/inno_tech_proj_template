var SinglePageScrolling = (function(document) {
  var
  screen = 0,
  container = document.querySelector(".maincontent"),
  pages = document.querySelectorAll(".page"),
  linkNav = document.getElementById('right-nav'),
  links = document.querySelectorAll("#right-nav ul li"),
  header = document.getElementById("header"),
  startPage = document.getElementById("start-page"),
  headerActive = false,
  start_page_parallaxed = false,
  animating = false;

  function animate(screen) {
    startScrolling();
    animateHeaderAndParallax(screen, headerActive, start_page_parallaxed);
    container.style.top = (-screen * 100) + "%";
    activateLink(screen);
    setTimeout(function() {
      stopScrolling();
    }, 1000);
  }
  function activateLink(index) {
    links.forEach(function(link) {
      link.classList.remove("active");
    });
    links[index].classList.add("active");
  }
  function startScrolling() {
    animating = true;
  }
  function stopScrolling() {
    animating = false;
  }
  function scroll_handler(event) {
    if(!animating) {
      if(event.deltaY > 0) {
        // down
        if((screen + 1) <= pages.length - 1 ) {
          animate(++screen);
        }
      } else {
        // up
        if((screen - 1) >= 0) {
          animate(--screen);
        }
      }
    }
  }
  function link_click_handler(event) {
    var target = event.target;
    if(target.matches("#right-nav ul li")) {
      if(screen != target.dataset.id) {
        animate(screen = target.dataset.id);
      }
    }
  }
  function animateHeaderAndParallax(screen, header_active, parallaxing) {
    if(screen > 0) {
      if(!header_active && !parallaxing) {
        headerAnimStart();
        startParallax();
      }
    } else {
      if(screen == 0) {
        headerAnimEnd();
        endParallax();
      }
    }
  }
  function startParallax() {
    startPage.classList.add("parallax");
    start_page_parallaxed = true;
  }
  function endParallax() {
    startPage.classList.remove("parallax");
    start_page_parallaxed = false;
  }
  function headerAnimStart() {
    header.classList.add("active");
    headerActive = true;
  }
  function headerAnimEnd() {
    header.classList.remove("active");
    headerActive = false;
  }

  return {
    init: function() {
      document.addEventListener("wheel", scroll_handler, false);
      linkNav.addEventListener("click", link_click_handler, false);
    }
  }

})(document);
