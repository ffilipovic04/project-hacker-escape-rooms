



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
bookingNextButton.addEventListener('click',async () => {

    // Kontrollerar om användaren har valt ett giltigt datum
    if (!bookingDate.checkValidity()) {

        // Visar webbläsarens felmeddelande
        bookingDate.reportValidity();

        // Avslutar funktionen om datumet är ogiltigt
        return;
    }
    // Hämtar lediga tider och väntar på API-svaret
    const availableTimes = await getAvailableTimes(
    selectedChallengeId,
    bookingDate.value
);

    // Visar arrayen som senare ska användas i steg 2
    console.log('Tider till steg 2:', availableTimes);
    
    // Hämtar elementet där felmeddelanden ska visas
    const bookingError = document.getElementById('booking-error');

    // Döljer tidigare felmeddelanden
    bookingError.hidden = true;

    // Kontrollerar om API-anropet misslyckades
    if (availableTimes === null) {
        bookingError.textContent = 'Could not load available times. Please try again.';
        bookingError.hidden = false;
        return;
}

    // Kontrollerar om det saknas lediga tider
    if (availableTimes.length === 0) {
        bookingError.textContent = 'No available times for this date.';
        bookingError.hidden = false;
        return;
    }
});
    
// Hämtar lediga tider för vald challenge och datum
async function getAvailableTimes(challengeId, date) {
     // Kontrollerar att funktionen faktiskt körs
    console.log('Funktionen getAvailableTimes körs!');

    // Skapar API-adressen med challenge-ID och valt datum
    const url = `https://lernia-sjj-assignments.vercel.app/api/booking/available-times?challenge=${challengeId}&date=${date}`;

    try {
        // Skickar en förfrågan till API:et
        const response = await fetch(url);

        // Kontrollerar om API:et svarade med ett fel
        if (!response.ok) {
            throw new Error('Kunde inte hämta lediga tider');
        }

        // Omvandlar svaret från JSON till ett JavaScript-objekt
        const data = await response.json();

        // Tar bort eventuella dubbletter från de lediga tiderna
        const availableTimes = [...new Set(data.slots)];

        // Visar tiderna i konsolen för testning
        console.log('Lediga tider:', availableTimes);

        // Returnerar tiderna så att de kan användas i nästa steg
        return availableTimes;

    } catch (error) {

        // Visar ett felmeddelande om något går fel
        console.error('Fel vid hämtning av tider:', error);

        // Returnerar en tom array om hämtningen misslyckas
        return null;
    }
}