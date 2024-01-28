// code voor de desktop viewport
// Context: hover effecten op tekst en image. Als een tekst column wordt gehovered, dan krijgt de tekst een bold font en de bijpassende image word dan zichtbaar.

// categorieën vaststellen
const categoryHoverMap = {
  fashion: {
    element: document.querySelector('.fashion-hover'),
    image: document.querySelector('.fashion-image'),
  },
  sport: {
    element: document.querySelector('.sport-hover'),
    image: document.querySelector('.sport-image'),
  },
  events: {
    element: document.querySelector('.event-hover'),
    image: document.querySelector('.event-image'),
  },
  lifestyle: {
    element: document.querySelector('.lifestyle-hover'),
    image: document.querySelector('.lifestyle-image'),
  },
};

// container van de expertises section
const expertiseBody = document.querySelector('.expertise-container');

// check of de viewport desktop is
const isDesktop = window.matchMedia("(min-width: 640px)").matches;

// als de muis uit de container gaat, haal alle classes weg
if (isDesktop) { 
  expertiseBody.addEventListener('mouseleave', function () { 
    for (const category of Object.values(categoryHoverMap)) {
      category.image.classList.remove('active-image');
    }
    expertiseBody.querySelectorAll('.expertise-hover').forEach(element => {
      element.classList.remove('active');
    });
  });

  
  for (const [categoryName, category] of Object.entries(categoryHoverMap)) {
    category.element.addEventListener('mouseover', function() {
      for (const otherCategory of Object.values(categoryHoverMap)) {
        otherCategory.image.classList.remove('active-image'); // active-image class weghalen van andere items
      }
      category.image.classList.add('active-image'); // active-image class adden aan de juiste image
      expertiseBody.querySelectorAll('.expertise-hover').forEach(element => {
        element.classList.remove('active');
      });
      category.element.classList.add('active'); // active class geven
    });
  }
}
