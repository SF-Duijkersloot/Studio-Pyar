// Simpele jQuery code voor een button dat de terug naar de top van de pagina scrolled.
// Ik had normaal gesproken vanilla JS gebruikt. Maar ik kreeg het niet werkend om de timing van de scroll 1 seconde te maken, met jQuery kon het wel makkelijk.

jQuery(document).ready(function($) {
    $('.back-to-top-column').click(function(e) {
        e.preventDefault(); // zorgt ervoor dat de <a> tag niks doet
        $('html, body').animate({ scrollTop: 0 }, 1000); // scrolled naar de top van de pagina binnen 1000ms.
    });
});
