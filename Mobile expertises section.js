// De code maakt de bijpassende tekst bold als een image van de image slider op het scherm zit.
// Deze code is voor de mobiele viewport (andere layout dan op desktop)

document.addEventListener("DOMContentLoaded", function() {
    const expertiseImages = document.querySelectorAll(".expertises-image-column");
    const textItems = document.querySelectorAll("h2.expertise-highlight-text");
    const dots = document.querySelectorAll(".image-dot"); // gebruikt als indicator voor de image slider
    const options = {
        root: document.querySelector(".expertises-images-container"),
        rootMargin: "0px",
        threshold: 0.7,
      };
    
      const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            textItems.forEach(item => { // De active classes weghalen
              item.classList.remove("expertise-bold-text"); 
              dots.forEach(dot => dot.classList.remove("active"));
            });
    
            const index = Array.from(expertiseImages).indexOf(entry.target);
            if (index !== -1) { 
                textItems[index].classList.add("expertise-bold-text"); // De bijpassende item, op index, krijgt de bold en active classes
                dots[index].classList.add("active");
              }
          }
        });
      }, options);
    
      expertiseImages.forEach(item => { // observer oproepen
        observer.observe(item);
      });
    });


