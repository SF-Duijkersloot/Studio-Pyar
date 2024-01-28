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

// check of de animation "uit de frame" is
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
    const progress = (currentScroll - startScroll) / (endScroll - startScroll); // progress meten van 0 tot 1
    // scale factor
    const scale = .9 - 0.15 * progress;
    // horizontal translation voor de animation
    const translateX = 70 * progress;
    // translation toepassen
    container.style.transform = `scale(${scale}) translate3d(${translateX}%, 0, 0)`;
    
  }
}};

const scrollIntoViewWithOffset = (selector, offsetVh) => {
  const offsetPixels = (offsetVh * window.innerHeight) / 100;
// see next link handlers met een bepaalde offset, zodat het in het midden komt
  window.scrollTo({
    behavior: 'smooth',
    top:
      document.querySelector(selector).getBoundingClientRect().top -
      document.body.getBoundingClientRect().top -
      offsetPixels,
  });
};

window.addEventListener("scroll", updateScrollAnimation);

// checken of het desktop of mobile is, want er zijn verschillende animations voor deze viewports
const isDesktop = window.matchMedia("(min-width: 640px)").matches;

nextStepLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href');
    
    if (isDesktop) {
      scrollIntoViewWithOffset(targetId, 30); // Adjust the offset in vh as needed
    } else {
      scrollIntoViewWithOffset(targetId, 60)
    }
  });
});



////////// Service animation (de cirkel) //////////
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

  // posities voor de small circles en tekst
  for (let i = 0; i < smallCircles.length; i++) {
    const angle = i * angleIncrement;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY - radius * Math.sin(angle);

    smallCircles[i].style.left = x + "px";
    smallCircles[i].style.top = y + "px";

    // kleine vergroting van de straal van de tekst, zodat deze langs de kleine cirkel zweeft.
    const textRadius = radius + calculateDynamicTextOffset(y);
    const textX = centerX + textRadius * Math.cos(angle);
    const textY = centerY - textRadius * Math.sin(angle);

    texts[i].style.left = textX + "px";
    texts[i].style.top = textY + "px";
  }

  // animate de small circles and teksten
  const animationDuration = 20000; 
  const startTime = performance.now();

  function animate() {
    const currentTime = performance.now();
    let elapsedTime = currentTime - startTime;

    // animation frame requesten
    requestAnimationFrame(animate);
  }

  animate(); // animation starten
});
