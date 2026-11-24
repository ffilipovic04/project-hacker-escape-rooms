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
        return matchesType(challenge) && matchesRating(challenge);
    });

    renderchallenges(matchingChallenges, "all-challenges-container");
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

const ratingStars = document.querySelectorAll (".star");

let ratingFrom = 0; 

ratingStars.forEach(function (star) {
  star.addEventListener("click", function () {
  ratingFrom = Number(star.dataset.value);
  applyFilters();
});

});

//skiss//

function matchesRating (challenge) {
return challenge.rating >= ratingFrom ;

}
