let questionNumberCount = 0;
let score = 0;

function renderQuestionsForm() {
    if (questionNumberCount < STORE.length) {
     
      return (
        `<div class="question-${questionNumberCount}">
         <h2>${STORE[questionNumberCount].question}</h2>
    
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumberCount].answers[0]}" name="answer" required>
    <span>${STORE[questionNumberCount].answers[0]}</span>
    </label>

    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumberCount].answers[1]}" name="answer" required>
    <span>${STORE[questionNumberCount].answers[1]}</span>
    </label>

    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumberCount].answers[2]}" name="answer" required>
    <span>${STORE[questionNumberCount].answers[2]}</span>
    </label>

    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumberCount].answers[3]}" name="answer" required>
    <span>${STORE[questionNumberCount].answers[3]}</span>
    </label>
    <button type="submit"
    class="submitButton">Submit</button>
    </fieldset>
    </form> 
    </div>`
    );
     } else {
       resultsPage();
       restartQuiz();
       $('.questionCount').text(10);
     }
}


function nextQuestionNumber () {
    questionNumberCount ++;
  $('.questionCount').text(questionNumberCount+1);
}

//increment score
function changeScore () {
  score ++;
}

// this function is responsible for starting the quiz
function startQuiz() {
  $(".js-quiz-begins").click('button', 
  function(event) {
    $(".js-quiz-begins").remove();
    $(".js-question-answer-form").css('display', 'block');
    $(".questionCount").text(1);
     });
     console.log('`startQuiz` ran');
}


 // this function renders the question form to the page
function renderQuestion() {
 $(".js-question-answer-form").html(renderQuestionsForm());

  console.log('`renderQuestion` ran');
}

// this function takes the users answer and gives feedback, if it is correct or not
function usersAnswer() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    let selection = $('input:checked');
    let answer = selection.val();
    let correctAnswer = `${STORE[questionNumberCount].correctAnswer}`;
    if (answer === correctAnswer) {
      selection.parent().addClass('correct');
      answerIsCorrect();
    } else {
      selection.parent().addClass('wrong');
      answerIsWrong();
    }
  });
  console.log('`usersAnswer` ran'); 
}

function answerIsCorrect() {
  correctAnswerResponse();
  updateScore()
}
  
  function answerIsWrong() {
    wrongAnswerResponse();
  }
// response for the user if the answer is correct
  function correctAnswerResponse() {
    let correctAnswer = `${STORE[questionNumberCount].correctAnswer}`;
    $('.js-question-answer-form').html(`<div class="correctFeedback">
    <div class="giraffeImage"><img src="https://i.imgur.com/6GCU7VB.png" alt="Happy giraffe"></div><h2>Correct!</h2>
    <button id="js-next-button">Next</button>
  </div>`);
  }

  //response for the user if the answer is wrong
  function wrongAnswerResponse() {
    let correctAnswer = `${STORE[questionNumberCount].correctAnswer}`;
    $('.js-question-answer-form').html(`<div class="correctFeedback"><div class="giraffeImage"><img src="https://i.imgur.com/ws1EcAj.png" alt="Sad giraffe"></div><h2>Wrong Answer.<br>Correct answer is <span>"${correctAnswer}"</span></h2>
    <button id="js-next-button">Next</button>
  </div>`);
  }

//update score text
function updateScore() {
  changeScore();
  $('.score').text(score);
}

// this function moves the user on to the next question
function renderNextQuestion() {
  $('main').on('click', '#js-next-button', function (event) {
  nextQuestionNumber();
  renderQuestion();
  usersAnswer();
  }); 
  console.log('`renderNextQuestion` ran ');
}

//quiz is over results page
function resultsPage() {
  $('.js-question-answer-form').html(`
    <div class="final-page">
      <h2>Final Score: ${score} out of 10</h2>
      <button id="js-restart-button">Restart</button>
    </div>`);
}

//restart quiz
function restartQuiz() {
  $('main').on('click', '#js-restart-button', function(event) {
    location.reload();
  });
}

//this function will be our callback when the page loads. It's responsible for
// initially rendering the quiz start page and activating our individual functions
// that handle capturing the users answers and user clicks
// and returning if the users answer is correct or not
// that handle keeping track of the question the user is on
// and number of correct questions the user has gotten
function handleQuizStart () {
  startQuiz();
  renderQuestion();
  usersAnswer();
  renderNextQuestion();

}

$(handleQuizStart);
