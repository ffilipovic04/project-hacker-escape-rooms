



// Sparar ID för den challenge som användaren vill boka
let selectedChallengeId = null;

// Funktion som öppnar bokningsrutan för en vald challenge
function openBooking(challengeId) {

    // Sparar ID för den valda challengen
    selectedChallengeId = challengeId;

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

//Hämtar datumfältet från bokningsformuläret
const bookingDate = document.getElementById('booking-date');

// Hämtar dagens datum enligt användarens lokala tid
const today = new Date();

// Omvandlar dagens datum till formatet YYYY-MM-DD
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

// Anger dagens datum som det tidigaste tillåtna datumet
bookingDate.min = `${year}-${month}-${day}`;


// Hämtar knappen som går vidare i bokningen
const bookingNextButton = document.getElementById('booking-next');

// Lyssnar efter klick på Next-knappen
bookingNextButton.addEventListener('click', () => {

    // Kontrollerar om användaren har valt ett giltigt datum
    if (!bookingDate.checkValidity()) {

        // Visar webbläsarens felmeddelande
        bookingDate.reportValidity();

        // Avslutar funktionen om datumet är ogiltigt
        return;
    }
    // Tillfälligt meddelande för att kontrollera att datumvalet fungerar
    console.log('Valt datum:', bookingDate.value);
    // Visar vilken challenge användaren har valt
    console.log('Vald challenge:', selectedChallengeId);
    // Hämtar lediga tider för vald challenge och datum
    getAvailableTimes(selectedChallengeId, bookingDate.value);
});

// Funktion som ska hämta lediga tider för en challenge
async function getAvailableTimes(challengeId, date) {
    
    // Visar vilka uppgifter som ska skickas till API:et
    console.log("Hämtar tider för challenge", challengeId);
    console.log("Datum", date);
}