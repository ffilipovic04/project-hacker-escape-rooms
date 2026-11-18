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