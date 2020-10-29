$(document).ready(() => {
  // const form = $(".randomQuiz");
  const category = $("#category").val();
  const submitBtn = $("#submit");
  submitBtn.on("click", (event) => {
    event.preventDefault();
    console.log("hooray");
    $.ajax({
      url: `https://opentdb.com/api.php?amount=10&category=${category}`,
      method: "GET",
    })
      .then((response) => {
        console.log(response.results);
        results.forEach((result, i) => {
          // const newQ = {
          //   question: result.question,
          //   correct: result.correct_answer,
          //   others: result.incorrect_answers,
          // };
          const questionId = `#q${i}`;
          const correctId = `${questionId}-crt`;
          const wrong1 = `${questionId}-wrg1`;
          const wrong2 = `${questionId}-wrg2`;
          const wrong3 = `${questionId}-wrg3`;
          $(questionId).val() = result.question;
          $(correctId).val() = result.correct_answer;
          $(wrong1).val() = result.incorrect_answers[0];
          $(wrong2).val() = result.incorrect_answers[1];
          $(wrong3).val() = result.incorrect_answers[2];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
