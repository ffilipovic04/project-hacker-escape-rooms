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
        return matchesType(challenge) && matchesRating(challenge) && matchesText(challenge);
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

  ratingStars.forEach(function (oneStar) {
    if (Number (oneStar.dataset.value) <= ratingFrom) {
        oneStar.classList.add ("active") ; 
         } else {
        oneStar.classList.remove ("active");

    }

  });

  applyFilters();
});
});

function matchesRating(challenge) {
    return challenge.rating >= ratingFrom && challenge.rating <= ratingTo;
}

const ratingToStars = document.querySelectorAll(".star-to");
let ratingTo = 5;
ratingToStars.forEach(function (star){
    star.addEventListener("click", function () {
ratingTo = Number (star.dataset.value);

ratingToStars.forEach (function (oneStar) {
if (Number (oneStar.dataset.value) <= ratingTo) {
oneStar.classList.add("active");
} else {
    oneStar.classList.remove ("active");
    }  
});
applyFilters(); 
});
});

const searchInput = document.querySelector("#search-text");
searchInput.addEventListener("input", applyFilters);

function matchesText(challenge){
const text = searchInput.value.toLowerCase();
const title = challenge.title.toLowerCase();
const description = challenge.description.toLowerCase();

return title.includes(text) || description.includes(text);



}