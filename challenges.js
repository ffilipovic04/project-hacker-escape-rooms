// Vänta tills hela HTML-sidan har laddats in helt, starta sedan funktionen som heter init. 
document.addEventListener('DOMContentLoaded', () => {
    init();
});

// Det här är startfunktionen. Den startar hämtningen av alla escape rooms från API-länken.
async function init() {
    try {
        // Skickar fråga till API:et och ber om information
        const response = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
        // Gör om svaret till ett format som JavaScript förstår
        const data = await response.json();
        // Lista med alla rum ligger i variabeln "challenges"
        const challenges = data.challenges;

        // Kollar om webbläsaren hittar ett ID som heter 'top-challenges-container' på sidan.
        // Om det finns, är användaren inna på "index.html"
        if(document.getElementById('top-challenges-container')) {
            // Kopia av listan skapas, sorteras och väljer ut 3 bästa korten med metoden "slice"
            const topthree = [...challenges]
            .sort((a,b) => b.rating - a.rating)
            .slice(0,3);
            // Dessa 3 kort skickas sedan till startsidan som endast visar upp dessa 3
        renderchallenges(topthree, 'top-challenges-container');
        }
        // Kollar om webbläsaren hittar ID:t 'all-challenges-container' på sidan.
        // Om det finns, är användaren inne på den nya hemsidan "challenges.html".
        if(document.getElementById('all-challenges-container')) {
            // Alla rum på listan skickas med och ritas upp. 
            renderchallenges(challenges, 'all-challenges-container');
        }
    }
    // Ifall internet är nere visas ett felmeddelande upp
    catch(error) {
            console.error('Kunde inte hämta data från API:', error);
    }
}

// Funktion som bygger upp korten automatiskt.
// Den tar emot listan med rum (list) och ID-namnet på den div där korten ska ligga (containerId).
function renderchallenges(list, containerId) {
    const container = document.getElementById(containerId);
    // Om den tomma div-taggen inte finns på just den här sidan stänger vi funktionen direkt.
    if(!container) return;
    // Rensar bort eventuell gammal text eller test-kort som råkar ligga kvar i vår div.
    container.innerHTML = '';
    
    // Loopar igenom listan med och JavaScript kör koden en gång för varje rum med "forEach". 
    list.forEach(challenge => {
        // Ny HTML-tagg av typen <article> skapas i minnet. 
        const article = document.createElement('article');
        // CSS-klassen läggs till på den nya taggen. 
        article.classList.add('challenge-card');
        // API:et skickar över kortets typ som onsite eller online gör gör det finare. 
        const typeText = challenge.type === 'onsite' ? 'on-site': 'online';

        // Stjärnbilderna skapas baserat på rummets betyg
        let starsHtml = '';
        // Loopar igenom och räknar mellan 1 till 5 stjärnor. 
        for (let i = 1; i <= 5; i++) {
            // Om stjärnans nummer är mindre eller lika med rummets betyg lägger vi till en fylld stjärna.
            if(i <= Math.round(challenge.rating)) {
                starsHtml += `<img src="Images/Star-1.png" alt="Star ${i}" class="star-img">`;
            // Annars om rummet har lägre betyg blir stjärnan genomskinlig med opacitet 0.3 för att visa att den är tom. 
            } else {
                starsHtml += `<img src="Images/Star-1.png" alt="Star ${i}" class="star-img" style="opacity: 0.3;">`;
            }
        }
        // Sektion för att fylla <article>-taggen med samma struktur som togs bort i index.html. 
        article.innerHTML = `
            <img src="${challenge.image}" alt="${challenge.title}" class="challenge-img">
            <div class="challenge-info">
                <h3 class="challenge-title">${challenge.title} (${typeText})</h3>
                <div class="challenge-rating">
                    <div class="stars">
                        ${starsHtml}
                    </div>
                    <span class="participants">${challenge.minParticipants}-${challenge.maxParticipants} participants</span>
                </div>
                <p class="challenge-text">
                    ${challenge.description}
                </p>
                <a href="#" class="btn btn-card-red" data-id="${challenge.id}">Book this room</a>
            </div>
        `;
        // Färdiga kortet läggs till i HTML-containern på hemsidan och visas upp på skärmen.
        container.appendChild(article);
    });
}
