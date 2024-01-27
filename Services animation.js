// JS code voor voor de circle animation op de landigs pagina van de site.
// Als ik deze animation opnieuw zou moeten maken, dan zou ik het proberen met zo veel mogelijk css en veel minder JS, maar toen ik het probeerde met css zag het er niet uit zoals ik voor ogen had.

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".services-container");
  const radius = container.clientWidth * 0.5;
  const centerX = container.clientWidth / 2;
  const centerY = container.clientHeight / 2;
  const angleIncrement = (2 * Math.PI) / 3;
  const smallCircles = document.querySelectorAll(".small-circle");
  const texts = document.querySelectorAll(".services-text");

  const servicesHeading = document.querySelector(".services-heading");
  const extraOffset = 180;
  const startScroll = servicesHeading.offsetTop + servicesHeading.offsetHeight + extraOffset; // aangeven om wanneer de animation starten
  const endScroll = startScroll + window.innerHeight - 300; // animation stoppen na X aantal te scrollen

  const servicesTitlePhotography = document.querySelector(".services-title-photography");
  const servicesTitleVideography = document.querySelector(".services-title-videography");
  const servicesTitleArtdirection = document.querySelector(".services-title-artdirection");

  const circle1 = document.querySelector("#circle1");
  const circle2 = document.querySelector("#circle2");
  const circle3 = document.querySelector("#circle3");

  const observerOptions = {
    threshold: 0.25 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const targetElement = entry.target;
  
      if (entry.isIntersecting) {
        if (targetElement === servicesTitlePhotography) {
          // console.log("photo");
          circle1.classList.add("active-circle");
          circle2.classList.remove("active-circle");
          circle3.classList.remove("active-circle");
        } else if (targetElement === servicesTitleVideography) {
          // console.log("video");
          circle1.classList.remove("active-circle");
          circle2.classList.add("active-circle");
          circle3.classList.remove("active-circle");
        } else if (targetElement === servicesTitleArtdirection) {
          // console.log("art");
          circle1.classList.remove("active-circle");
          circle2.classList.remove("active-circle");
          circle3.classList.add("active-circle");
        }
      }
    });
  }, observerOptions);

  observer.observe(servicesTitlePhotography);
  observer.observe(servicesTitleVideography);
  observer.observe(servicesTitleArtdirection);

// next step links verzamelen
const nextStepLinks = document.querySelectorAll(".scroll-next");

// Function to calculate the scaling and translation based on scroll position
function updateScrollAnimation() {
  const currentScroll = window.scrollY;
  if (currentScroll < startScroll) {
    // console.log("outside");
    circle1.classList.remove("active-circle");
    circle2.classList.remove("active-circle");
    circle3.classList.remove("active-circle");
  }

  if (isDesktop) {
  if (currentScroll >= startScroll && currentScroll <= endScroll) {
    const progress = (currentScroll - startScroll) / (endScroll - startScroll); // Calculate progress from 0 to 1
    // Calculate scaling factor from .9 to 0.8
    const scale = .9 - 0.15 * progress;
    // Calculate horizontal translation from 0 to 100%
    const translateX = 70 * progress;
    // Apply scaling and translation to .services-container
    container.style.transform = `scale(${scale}) translate3d(${translateX}%, 0, 0)`;
    
  }
}};

// Common function to scroll into view with an offset
const scrollIntoViewWithOffset = (selector, offsetVh) => {
  const offsetPixels = (offsetVh * window.innerHeight) / 100;

  window.scrollTo({
    behavior: 'smooth',
    top:
      document.querySelector(selector).getBoundingClientRect().top -
      document.body.getBoundingClientRect().top -
      offsetPixels,
  });
};

// Listen to the scroll event and update the animation accordingly
window.addEventListener("scroll", updateScrollAnimation);

// Determine screen size
const isDesktop = window.matchMedia("(min-width: 640px)").matches;

nextStepLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href');
    
    if (isDesktop) {
      // Call the scrollIntoViewWithOffset function with the target ID and offset in vh
      scrollIntoViewWithOffset(targetId, 30); // Adjust the offset in vh as needed
    } else {
      // Scroll to the bottom of the target element
      scrollIntoViewWithOffset(targetId, 60)
    }
  });
});



////////// Service animation //////////
var textOffset = 0.1 * window.innerWidth;
var textHeightOffset = .0001;
  if (!isDesktop) {
    textOffset = 0.11 * window.innerWidth;
    textHeightOffset = .00035;
  }  

  // Function to calculate the dynamic textOffset based on the vertical position
  function calculateDynamicTextOffset(y) {
    return textOffset - (textHeightOffset * window.innerWidth) * Math.abs(centerY - y);
  }

  // Calculate positions for small circles and texts
  for (let i = 0; i < smallCircles.length; i++) {
    const angle = i * angleIncrement;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY - radius * Math.sin(angle);

    smallCircles[i].style.left = x + "px";
    smallCircles[i].style.top = y + "px";

    // Slightly increase the radius for the text to make it float alongside the small circle
    const textRadius = radius + calculateDynamicTextOffset(y);
    const textX = centerX + textRadius * Math.cos(angle);
    const textY = centerY - textRadius * Math.sin(angle);

    texts[i].style.left = textX + "px";
    texts[i].style.top = textY + "px";
  }

  // Animate the small circles and texts
  const animationDuration = 20000; 
  const startTime = performance.now();

  function animate() {
    const currentTime = performance.now();
    let elapsedTime = currentTime - startTime;

    // Calculate the angle rotation based on the desired duration for one full rotation
    const angleRotation = (elapsedTime / animationDuration) * (2 * Math.PI);

    // Use modulo to reset elapsedTime after one full rotation
    if (elapsedTime >= animationDuration) {
      elapsedTime %= animationDuration;
    }

    for (let i = 0; i < smallCircles.length; i++) {
      const angle = i * angleIncrement + angleRotation;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY - radius * Math.sin(angle);

      smallCircles[i].style.left = x + "px";
      smallCircles[i].style.top = y + "px";

      // Update the text position with the slightly increased radius
      const textRadius = radius + calculateDynamicTextOffset(y);
      const textX = centerX + textRadius * Math.cos(angle);
      const textY = centerY - textRadius * Math.sin(angle);

      texts[i].style.left = textX + "px";
      texts[i].style.top = textY + "px";
    }

    // Request the next animation frame
    requestAnimationFrame(animate);
  }

  animate(); // Start the animation
});
