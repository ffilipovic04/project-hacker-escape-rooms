const challengeList = document.querySelector("#challenge-list");

testChallenges.forEach(function (challenge) {
  
   const title = document.createElement ("h3"); 
   title.textContent = challenge.title;
   challengeList.appendChild(title);
});