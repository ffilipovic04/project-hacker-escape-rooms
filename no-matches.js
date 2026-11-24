function showNoMatches(list, container) {
  if (list.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No matching challenges";
    message.classList.add("no-matches");
    container.appendChild(message);
  }
}
