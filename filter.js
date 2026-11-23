

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
       return matchesType (challenge);
    });

    renderchallenges(matchingChallenges, 'all-challenges-container');
}

function matchesType(challenge) {
    if (!onlineChallenges.checked && !onsiteChallenges.checked) {
        return true;
    }
    return(
(onlineChallenges.checked && challenge.type === "online")||
(onsiteChallenges.checked && challenge.type === "onsite")
    ); 
}

