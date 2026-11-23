

const filterb = document.querySelector("#filter-toggle");

filterb.addEventListener("click", filterchallenges);

function filterchallenges() {
    filterPanel.classList.toggle("open");
   
}

const filterPanel = document.querySelector("#filter-panel");

const onlineChallenges =document.querySelector("#online-checkbox");
const onsiteChallenges =document.querySelector("#onsite-checkbox");


onlineChallenges.addEventListener("change", applyFilters);
onsiteChallenges.addEventListener("change", applyFilters);


function applyFilters() {
    const matchingChallenges = testChallenges.filter(function (challenge) {
        return (onlineChallenges.checked && challenge.type === "online") ||
               (onsiteChallenges.checked && challenge.type === "onsite");
    });

    renderchallenges(matchingChallenges, 'all-challenges-container');
}