// Funktion som öppnar bokningsrutan för en vald challenge
function openBooking(challengeId) {
    const bookingModal = document.getElementById("booking-modal"); // Hämtar dialogrutan från HTML med ID

    bookingModal.showModal(); // Öppnar dialogrutan som en popup 
}
// Funktion som stänger bokningsrutan
function closeBooking() {
    const bookingModal = document.getElementById("booking-modal"); // Hämtar samma dialogruta från HTML

    bookingModal.close(); // Stänger dialogruta
}

//Lyssnar efter klick på webbsidan
document.addEventListener('click', (event) => {
    
    // Kontrollerar om användaren klickat på en bokningsknapp
    const bookingButton = event.target.closest('.btn-card-red');

    // Om klicket inte var på en bokningsknapp avslutas funktionen
    if(!bookingButton) {
        return;
    }
     // Förhindrar att länken navigerar till #
    event.preventDefault();

    // Hämtar ID för den challenge användaren vill boka
    const challengeId = bookingButton.dataset.id;

    // Öppnar bokningsrutan för vald challenge
    openBooking(challengeId);
});

// Hämtar knappen som stänger bokningsrutan
const closeBookingButton = document.getElementById('close-booking');

// Lyssnar efter klick på stängningsknappen
closeBookingButton.addEventListener('click', () => {

    // Anropar funktionen som stänger bokningsrutan
    closeBooking();
})