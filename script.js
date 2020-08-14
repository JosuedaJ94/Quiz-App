//create a library of questions
const STORE = {
  questions: [
    {//1
    question: "Who is the fastest man alive?",
    options: ["Superman", "The Flash", "The Reverse-Flash", "Godspeed"],
    answer: "The Flash"
    },
    {//2
    question: "Which is not a weakness of Superman?",
    options: ["Green Kryptonite", "Blue Kryptonite", "Gold Kryptonite", "Red Kryptonite"],
    answer: "Red Kryptonite"
    },
    {//3
    question: "What is Billy Batson's magic word?",
    options: ["Abra Kadabra", "Alakazam", "Shazam", "Kadabra"],
    answer: "Shazam"
    },
    {//4
    question: "Which Robin is an assassin?",
    options: ["Richard Grayson", "Jason Todd", "Tim Drake", "Damian Wayne"],
    answer: "Damian Wayne"
    },
    {//5
    question: "What color is Beast Boy?",
    options: ["Green", "Blue", "Orange", "Yellow"],
    answer: "Green"
    }
  ],
  score: 0,
  current: 0
};

//begin the quiz
function begin() {
  $('#button-begin').on('click', function(event){
    createQuestion();
  });
}

//render question
function createQuestion() {
  let questions = STORE.questions[STORE.current];
  updateHeader();
  const question = $(`
  <div>
    <form id ="js-questions" class="question-form">
      <fieldset>
        <div class="question">
          <legend> ${questions.question} </legend>
        </div>
        <div class="options">
          <div class="js-options"> </div>
        </div>
        
        <div>
          <button type="submit" id="answer" tabindex="5">Submit</button>
          <button type="button" id="next" tabindex="6">Next>></button>
        </div>
      </fieldset>
    </form>
  </div>`);

  $("main").html(question);
  updateOptions();
  $("#next").hide();
}

//update score
function updateHeader() {
  const html = $(`<ul>
    <li id="js-answered">Number: ${STORE.current + 1}/${STORE.questions.length}</li>
    <li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
  </ul>`);

  $(".score").html(html);
}

//update answer choices
function updateOptions() {
  let question = STORE.questions[STORE.current];
  for(let i = 0; i < question.options.length; i++){
    $('.js-options').append(`<input type="radio" name="options" id="option${i + 1}" value="${question.options[i]}" tabindex="${i + 1}">
    <label for="option${i + 1}">${question.options[i]}</label>
    <br/>
    <span id="js-r${i + 1}"></span>`);
  }
}

//display results
function display() {
  let result = $(`<div class="results">
    <form id="js-restart-quiz">
      <fieldset>
        <div>
          <legend>Your score is ${STORE.score}/${STORE.questions.length}</legend>
        </div>
        
        <div>
          <button type="button" id="restart">Restart</button>
        </div>
      </fieldset>
    </form>
  </div>`);

  STORE.current = 0;
  STORE.score = 0;
  $("main").html(result);
}

//proceed to next question
function questionHandler() {
  $('body').on('click', '#next', (event) => {
    STORE.current === STORE.questions.length ? display() : createQuestion();
  });
}

//check the answer submitted
function handleAnswer() {
  $('body').on("submit", '#js-questions', function(event) {
    event.preventDefault();
    let currentQuestion = STORE.questions[STORE.current];
    let selected = $("input[name=options]:checked").val();

    if(!selected) {
      alert("Please choose an answer");
      return;
    }

    let id_num = currentQuestion.options.findIndex(i => i === selected);
    let id = "#js-r" + ++id_num;
    $('span').removeClass("right-answer wrong-answer");

    if(selected === currentQuestion.answer){
      STORE.score++;
      $(`${id}`).append(`Correct<br/>`);
      $(`${id}`).addClass("right-answer");
    }
    else {
      $(`${id}`).append(`Incorrect<br/>The answer is "${currentQuestion.answer}"<br/>`);
      $(`${id}`).addClass("wrong-answer");
    }

    STORE.current++;
    $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
    $('#answer').hide();
    $("input[type=radio]").attr('disabled', true);
    $('#next').show();
  });
}

//restart the quiz
function restart(){
  $('body').on('click', '#restart', (event) => {
    createQuestion();
  });
}

//run all functions
function handler() {
  begin();  
  questionHandler();
  handleAnswer();
  restart();
}

$(handler);