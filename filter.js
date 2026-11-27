const filterb = document.querySelector("#filter-toggle");

filterb.addEventListener("click", filterchallenges);


//children.length räknar hur många element som ligger i #tag-list//
function filterchallenges() {
     filterPanel.classList.toggle("open");
     if (tagList.children.length === 0) {
        buildTagButtons();

   }
}

const filterPanel = document.querySelector("#filter-panel");

const onlineChallenges = document.querySelector("#online-checkbox");
const onsiteChallenges = document.querySelector("#onsite-checkbox");

onlineChallenges.addEventListener("change", applyFilters);
onsiteChallenges.addEventListener("change", applyFilters);

function applyFilters() {
        const matchingChallenges = allChallenges.filter(function (challenge) {
        return matchesType(challenge) && matchesRating(challenge) && matchesText(challenge) && matchesTags(challenge);
    });

  renderchallenges(matchingChallenges, "all-challenges-container");
  const container = document.getElementById("all-challenges-container");
  showNoMatches(matchingChallenges, container);
}

function matchesType(challenge) {
  if (!onlineChallenges.checked && !onsiteChallenges.checked) {
    return true;
  }
  return (
    (onlineChallenges.checked && challenge.type === "online") ||
    (onsiteChallenges.checked && challenge.type === "onsite")
  );
}

const ratingStars = document.querySelectorAll(".star");

let ratingFrom = 0;

ratingStars.forEach(function (star) {
  star.addEventListener("click", function () {
    ratingFrom = Number(star.dataset.value);

    ratingStars.forEach(function (oneStar) {
      if (Number(oneStar.dataset.value) <= ratingFrom) {
        oneStar.classList.add("active");
      } else {
        oneStar.classList.remove("active");
      }
    });

    applyFilters();
  });
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



function matchesRating(challenge) {
  return challenge.rating >= ratingFrom;
}

const tagList = document.querySelector("#tag-list");
let selectedTags = [];

//funktion som bygger etikettknapparna//
function buildTagButtons() {
    //tom lista som samlar etiketter//
    const allTags = [];

    //scannar rummen//
    allChallenges.forEach(function (challenge) {

        //scannar etiketterna//
        challenge.labels.forEach(function (label) {

            //kollar om etiketten redan finns i listan (! betyder inte)//
            if (!allTags.includes(label)) {
                //lägger till sist i listan//
                allTags.push(label);
            }
        });
    });

    //sorterar a-ö//
    allTags.sort();

    allTags.forEach(function (tag) {

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = tag;
        button.classList.add("tag");

        button.addEventListener("click", function () {

            //är etiketten redan vald?//
            if (selectedTags.includes(tag)) {
                //ja: skapa en ny lista med alla utom denna//
                selectedTags = selectedTags.filter(function (selected) {
                    return selected !== tag;
                });

                //tar bort markeringen//
                button.classList.remove("active");

            } else {
                selectedTags.push(tag);

                //markerar knappen som mörkblå//
                button.classList.add("active");
            }

            //filtret körs så att korten uppdateras//
            applyFilters();
        });

        //appendChild lägger in knappen i #tag-list//
        tagList.appendChild(button);
    });
}

//kontrollerar om rummet har ALLA valda etiketter//
function matchesTags(challenge) {
    return selectedTags.every(function (tag) {
        return challenge.labels.includes(tag);
    });
}
