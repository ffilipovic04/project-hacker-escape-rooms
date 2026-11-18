

const filterb = document.querySelector("#filter-toggle");

filterb.addEventListener("click", filterchallenges);

function filterchallenges() {
    renderchallenges(testChallenges, 'all-challenges-container');
}



