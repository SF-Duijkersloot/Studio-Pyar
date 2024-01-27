// JS code voor de image animations. Dit zijn: grow animations (height en width van 0 naar 100%) en parallax scroll animation

document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll('.image-animation');
  const separators = document.querySelectorAll('.separator-animation');
  const VerticalSeparators = document.querySelectorAll('.custom-separator');
  const isDesktop = window.matchMedia("(min-width: 640px)").matches;
  const projectContainersHome = document.querySelectorAll('.home-page .project-animation');
  const projectContainers = document.querySelectorAll('.project-animation');
  
   const commonObserverOptions = {
     threshold: 0.5,
   };

  
  // mobile projects section
  const addAnimationToElements = (elements) => {
      elements.forEach((element) => {
        element.classList.add('grow');
      });
    };
  
    // observer maken
    const createObserverForElements = (elements) => {
      const observerOptions = {
        threshold: 0.5,
      };
  
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            addAnimationToElements(elements);
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
  
      elements.forEach((element) => {
        observer.observe(element);
      });
    };
  
    // expertises image columns observer
    const expertisesImageColumns = document.querySelectorAll('.expertises-image-column');
    if (!isDesktop) {
      createObserverForElements(expertisesImageColumns);
    }
  
    // projects observers
    if (!isDesktop && projectContainersHome.length > 0) {
      createObserverForElements(projectContainersHome);
    }
    
  
  // common observer
      const commonObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('grow');
            observer.unobserve(entry.target);
          }
        });
      }, commonObserverOptions);
    
      images.forEach((image) => {
        commonObserver.observe(image);
      });
      separators.forEach((image) => {
        commonObserver.observe(image);
      });
      VerticalSeparators.forEach((image) => {
        commonObserver.observe(image);
      });
      projectContainers.forEach((image) => {
        commonObserver.observe(image);
      });
      
      const parallaxImage = document.querySelector('.parallax-image img');
      let isImageVisible = false;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isImageVisible = entry.isIntersecting;
        });
      }, { threshold: 0 });
      
      if (parallaxImage) {
      observer.observe(parallaxImage);
      }

      // Paralax update op scroll
      function updateParallax() {
        if (isImageVisible) {
          const scrollPosition = window.scrollY;
          const initialPosition = getComputedStyle(parallaxImage).getPropertyValue('--awb-object-position'); // huidige css property ophalen
          const [, offsetYValue] = initialPosition.match(/\d+/g);
          let parallaxPercentage = 0.05;
          const offsetY = parseInt(offsetYValue, 10) - scrollPosition * parallaxPercentage;
          const objectPositionValue = `50% ${offsetY}%`;
      
          parallaxImage.style.objectPosition = objectPositionValue;
        }
      }
      
	  // scroll event listener voor parralax	  
      window.addEventListener('scroll', updateParallax);
 
      updateParallax();
  
    });
