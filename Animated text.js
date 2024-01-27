// JS voor de text animaties, dit zijn: letter pop-ups, word pop-ups en wat fade-ins. Allemaal geactiveerd door een intersectionObserver.
// Voor de letter en word pop-ins heb ik eerst een outer span gemaakt. En daarin krijgt elke letter / of woord een inner span. Deze inner span krijgt de animation class en de outer span is voor de juiste overflow hidden.

document.addEventListener("DOMContentLoaded", function() {
  // general text observer voor animation
  const popUpContainers = document.querySelectorAll('div:is(:has(> .pop-up))');
  const fadeInContainer = document.querySelectorAll('div:is(:has(> .fade-in))');
  const nextProjectContainers = document.querySelectorAll('.next-project-a');
  
  const textObserverOptions = {
    threshold: 0.5,
  };
  
  const textObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const popUpElements = entry.target.querySelectorAll('.pop-up');
        if (popUpElements) {
          popUpElements.forEach((popUp) => {
            popUp.classList.add('animation'); // animation class adden
          }); 
        }
        const fadeInElements = entry.target.querySelectorAll('.fade-in');
        if (fadeInElements) {
          fadeInElements.forEach((fadeIn) => {
            fadeIn.classList.add('animation');
          }); 
        }
        observer.unobserve(entry.target);
      }
    });
  }, textObserverOptions);
  
  // text observer types
    popUpContainers.forEach((animation) => {
      textObserver.observe(animation);
    });
    fadeInContainer.forEach((animation) => {
      textObserver.observe(animation);
    });
    nextProjectContainers.forEach((animation) => {
      textObserver.observe(animation);
    });
    
  
  // heading letter by letter animation
    const textContainers = document.querySelectorAll('.animated-text');
    const isDesktop = window.matchMedia("(min-width: 640px)").matches;
    
    textContainers.forEach(textContainer => {
      const text = textContainer.textContent;
      const words = text.split(' ');
    
      textContainer.innerHTML = '';
      words.forEach((word, index) => {
        const wordSpan = document.createElement('span'); // outer span voor elk woord
        wordSpan.classList.add('word-outer-span');
        textContainer.appendChild(wordSpan);
      
        const letters = word.split('');
        letters.forEach((letter, letterIndex) => {
          const span = document.createElement('span');
          span.classList.add('letter-span');
          span.textContent = letter === ' ' ? '\u00A0' : letter; // in de span je juiste letter zetten, als het een spatie is dan leeg laten
          wordSpan.appendChild(span);
        });
    
        if (index < words.length - 1) {
          const spaceSpan = document.createElement('span');
          spaceSpan.textContent = '\u00A0';
          textContainer.appendChild(spaceSpan);
        }
      });
    });
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const letterSpans = entry.target.querySelectorAll('span');
          const initialDelay = .2;
  
          letterSpans.forEach((span, index) => {
            span.style.animationDelay = `${initialDelay + .06 * index}s`;
          });
  
          entry.target.classList.add('letter-pop-up');
          entry.target.classList.remove('hidden');
          observer.unobserve(entry.target);
          if (isDesktop) {
          if (entry.target.classList.contains('partners-animated')) {
            if (letterSpans.length > 4) {
              const lineBreak = document.createElement('br');
              entry.target.insertBefore(lineBreak, spans[4]);
            }
          }
      }
        // Hero animation font en lineheight fixen - Wordpress problemen met line height en alignment
          if (entry.target.classList.contains('header-animated-fonts')) {
            letterSpans.forEach((span, index) => {
              span.style.lineHeight = '1.43';
              
              if (index < 7) {
                span.style.fontFamily = 'Astro Italic';
          }})};
        //  About page meet the founder text fix - Wordpress problemen met line height en alignment
          if (entry.target.classList.contains('about-founder-text')) {
            letterSpans.forEach((span) => {
              span.style.fontFamily = 'Neue Medium';
			  span.style.textTransform = "capitalize";
          })};
        }});
    });
  
    textContainers.forEach(container => {
      observer.observe(container);
    });
  
// word animation met animation-delay
const wordPopUpContainers = document.querySelectorAll('.word-pop-up');

const wordObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const words = entry.target.textContent.split(' ');
      entry.target.innerHTML = '';

      words.forEach((word, index) => {
        const wordOuterContainer = document.createElement('span'); // outer span voor elk woord - voor juiste overflow hidden
        const wordInnerContainer = document.createElement('span'); // inner span maken voor de animation
        
        wordInnerContainer.textContent = word;
        initialDelay = 0.2;
        wordInnerContainer.style.animationDelay = `${initialDelay + 0.15 * index}s`; // Adjust the delay as needed
        
        wordOuterContainer.appendChild(wordInnerContainer);
        
        if (index === 4) { // Font veranderen
          wordOuterContainer.classList.add('picture-font');
        }

        if (index === 7) { // class adden op het 8ste woord
          wordOuterContainer.classList.add('story-border'); 
        }

        wordOuterContainer.style.overflow = 'hidden';

        entry.target.appendChild(wordOuterContainer);

        if (index !== words.length - 1 && index !== 4) {
          const spaceSpan = document.createElement('span');
          spaceSpan.innerHTML = '&nbsp;';
          entry.target.appendChild(spaceSpan);
        }

        observer.unobserve(entry.target);
      });

      entry.target.classList.add('animation');
      entry.target.classList.remove('hidden');
    }
  });
}, textObserverOptions);

wordPopUpContainers.forEach((animation) => {
  wordObserver.observe(animation);
});
  });
