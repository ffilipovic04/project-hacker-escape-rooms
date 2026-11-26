document.addEventListener('DOMContentLoaded', init);

async function init() {
    try {
        const response = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
        if (!response.ok) throw new Error('HTTP ' + response.status);

        const { challenges } = await response.json();
        const topContainer = document.getElementById('top-challenges-container');
        const allContainer = document.getElementById('all-challenges-container');

        if (topContainer) {
            const topThree = [...challenges]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3);

            topContainer.replaceChildren(...topThree.map(createChallengeCard));
        }

        if (allContainer) {
            const cards = challenges.map(createChallengeCard);
            allContainer.replaceChildren(...cards);
            setupFilters(challenges, cards, allContainer);
        }
    } catch (error) {
        console.error('Kunde inte ladda challenges:', error);
    }
}

function setupFilters(challenges, cards, container) {
    const button = document.getElementById('toggle-challenge-filters');
    const panel = document.getElementById('challenge-filters');
    const search = document.getElementById('challenge-search');
    const noMatches = document.getElementById('no-matching-challenges');
    const labelContainer = document.getElementById('challenge-labels');

    const labels = [...new Set(challenges.flatMap(challenge => challenge.labels ?? []))]
        .sort((a, b) => a.localeCompare(b));

    for (const label of labels) {
        const wrapper = document.createElement('label');
        const checkbox = document.createElement('input');

        checkbox.type = 'checkbox';
        checkbox.name = 'challenge-label';
        checkbox.value = label;
        wrapper.append(checkbox, ' ' + label);
        labelContainer.append(wrapper, ' ');
    }

    button.addEventListener('click', () => {
        panel.hidden = !panel.hidden;
        button.setAttribute('aria-expanded', String(!panel.hidden));
    });

    function applyFilters() {
        const query = search.value.trim().toLowerCase();

        const types = [...panel.querySelectorAll('[name="challenge-type"]:checked')]
            .map(input => input.value);

        const selectedLabels = [...labelContainer.querySelectorAll('input:checked')]
            .map(input => input.value);

        const minRating = Number(panel.querySelector('[name="min-rating"]:checked')?.value ?? 0);
        const maxRating = Number(panel.querySelector('[name="max-rating"]:checked')?.value ?? 5);

        const matchingCards = cards.filter((card, index) => {
            const challenge = challenges[index];

            const matchesType = types.includes(challenge.type);
            const matchesRating = challenge.rating >= minRating && challenge.rating <= maxRating;
            const matchesLabels = selectedLabels.every(label =>
                (challenge.labels ?? []).includes(label)
            );
            const matchesSearch =
                challenge.title.toLowerCase().includes(query) ||
                challenge.description.toLowerCase().includes(query);

            return matchesType && matchesRating && matchesLabels && matchesSearch;
        });

        // Återanvänd korten så att deras eventlyssnare finns kvar.
        container.replaceChildren(...matchingCards);
        noMatches.hidden = matchingCards.length > 0;
    }

    search.addEventListener('input', applyFilters);
    panel.addEventListener('change', applyFilters);
    noMatches.hidden = cards.length > 0;
}

function createChallengeCard(challenge) {
    const article = document.createElement('article');
    article.className = 'challenge-card';
    article.innerHTML = `
        <img class="challenge-img">
        <div class="challenge-info">
            <h3 class="challenge-title"></h3>
            <div class="challenge-rating">
                <div class="stars"></div>
                <span class="participants"></span>
            </div>
            <p class="challenge-text"></p>
            <a href="#" class="btn btn-card-red">Book this room</a>
        </div>
    `;

    const image = article.querySelector('.challenge-img');
    image.src = challenge.image;
    image.alt = challenge.title;

    const type = challenge.type === 'onsite' ? 'on-site' : 'online';
    article.querySelector('.challenge-title').textContent = challenge.title + ' (' + type + ')';
    article.querySelector('.challenge-text').textContent = challenge.description;
    article.querySelector('.participants').textContent =
        challenge.minParticipants + '-' + challenge.maxParticipants + ' participants';
    const bookingButton = article.querySelector('.btn-card-red');
bookingButton.dataset.id = challenge.id;
bookingButton.dataset.minParticipants = challenge.minParticipants;
bookingButton.dataset.maxParticipants = challenge.maxParticipants;

    const stars = article.querySelector('.stars');
    stars.setAttribute('role', 'img');
    stars.setAttribute('aria-label', challenge.rating + ' out of 5 stars');

    for (let index = 1; index <= 5; index++) {
        const star = document.createElement('img');
        star.src = 'Images/Star-1.png';
        star.alt = '';
        star.className = 'star-img';

        if (index > Math.round(challenge.rating)) {
            star.style.opacity = '0.3';
        }

        stars.append(star);
    }

    return article;
}