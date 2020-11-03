$(() => {
  $("#playOurs").on("click", () => {
    // event.preventDefault();
    $("#displayQuizzes").empty();
    $.ajax("/api/admin", {
      type: "GET",
    }).then((results) => {
      results.forEach((entry) => {
        const articleEl = $("<article>", { class: "cont" });
        // let imageEl = $("<img>", { src: "" });
        // articleEl.append(imageEl);
        const divEl = $("<div>", { class: "card-body" });
        articleEl.append(divEl);
        const buttonEl = $("<button>", {
          class: "showQuiz",
          "data-id": entry.quizID,
        });
        divEl.append(buttonEl);
      });
    });
  });
});
