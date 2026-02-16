// ========================
// Quiz Application:
// ========================

// General Element:
// ----------------

let openning_container = document.querySelector(".openning_container");
let quiz_languages = document.querySelector(".quiz_languages");
let languages_list = document.querySelectorAll(".quiz_languages .lang");
let lang_of_questions_number = document.querySelector("span.questions_number");
let start_btn = document.querySelector(".start_btn");
let quiz_container = document.querySelector(".quiz_container");
let quiz_container_title = document.querySelector(".quiz_container_header h3");
let question_counter = document.querySelector("span.question_counter");
let total_questions_number = document.querySelector(
  ".quiz_container .questions_number",
);
let question_area = document.querySelector(".question_area");
let question_des = document.querySelector(".question");
let choices_container = document.querySelector(".question_area .choices");
let submit_container = document.querySelector(".submit");
let submit_btn = document.querySelector(".submit_btn");
let quit_btn = document.querySelector(".submit .quit");
let timer_info = document.querySelector(".timer");
let timer_container = document.querySelector(".timer_container");
let home_btn = document.querySelector(".home_btn");
let link;
let my_answer = "";
let correct_answer;
let current_question = 0;
let answer_data = [];
let correct_answer_counter = 0;
let result_container;
let question_duration = 17;
let timer_interval;
let show_all_results_btn;
let stored_data;
let quiz_score = [];
let questions_number;
let quiz_title;

// Select The Quiz Language:
// -------------------------

languages_list.forEach((lang) => {
  link = "";

  lang.onclick = () => {
    languages_list.forEach((lang) => {
      lang.classList.remove("active");
    });

    lang.classList.add("active");

    start_btn.style.display = "block";

    if (lang.classList.contains("html")) {
      link = `./json/html.json`;
    } else if (lang.classList.contains("css")) {
      link = `./json/css.json`;
    } else if (lang.classList.contains("js")) {
      link = `./json/javascript.json`;
    }
  };
});

// Get The Data From JSON file:
// ----------------------------

start_btn.onclick = () => {
  submit_btn.innerHTML = "Next";
  languages_list.forEach((lang) => {
    if (lang.classList.contains("active")) {
      current_question = 0;
      openning_container.style.display = "none";
      quiz_container.style.display = "block";
      submit_container.style.display = "flex";
      timer_container.style.display = "flex";

      if (
        question_des.style.display == "none" &&
        choices_container.style.display == "none"
      ) {
        question_des.style.display = "flex";
        choices_container.style.display = "flex";
      }

      if (result_container) {
        result_container.remove();
      }

      let myRequist = new XMLHttpRequest();

      myRequist.open("GET", link);
      myRequist.send();

      myRequist.onreadystatechange = () => {
        if (myRequist.status === 200 && myRequist.readyState === 4) {
          get_main_data_of_theQuiz(JSON.parse(myRequist.responseText));
        }
      };

      lang.remove();
    }
  });

  correct_answer_counter = 0;

  if (document.querySelectorAll(".quiz_languages .lang").length === 0) {
    document.querySelector(".openning_container p").style.display = "none";
    document.querySelector(".openning_container h2").innerHTML = `Good Job,`;

    let finish_quizes_msg = document.createElement("p");
    finish_quizes_msg.className = "finish_msg";
    finish_quizes_msg.style.marginTop = "20px";
    finish_quizes_msg.innerHTML = "You Finished All Quizes";
    quiz_languages.appendChild(finish_quizes_msg);

    start_btn.remove();

    show_all_results_btn = document.createElement("div");
    show_all_results_btn.className = "show_all_results_btn";

    show_all_results_btn.innerHTML = "Show All Results";

    openning_container.appendChild(show_all_results_btn);

    let all_results_container = document.createElement("div");
    all_results_container.className = "all_results_container";

    openning_container.appendChild(all_results_container);

    // Showing The Quizes Scores:
    // -----------------------------
    let start = false;

    show_all_results_btn.addEventListener("click", () => {
      show_all_results_btn.innerHTML = "Hide All Results";

      let quizes_score = Array.from(
        JSON.parse(sessionStorage.getItem("quiz_score")),
      );

      if (!start === true) {
        for (let i = 0; i < quizes_score.length; i++) {
          let lang_score = document.createElement("div");
          lang_score.className = `quiz_score`;

          let quiz_t = document.createElement("span");

          quiz_t.innerHTML = Object.values(quizes_score[i])[0];

          lang_score.appendChild(quiz_t);

          let quiz_lang_score = document.createElement("div");
          quiz_lang_score.className = "score";

          if (Object.values(quizes_score[i])[0] === "CSS Basics Quiz") {
            quiz_t.style.color = `var(--css-scale-color)`;

            quiz_lang_score.style.color = `var(--css-scale-color)`;

            quiz_lang_score.style.boxShadow = `inset 0px 0px 11px var(--border-color)`;
          } else if (Object.values(quizes_score[i])[0] === "HTML Basics Quiz") {
            quiz_t.style.color = `var(--html-scale-color)`;

            quiz_lang_score.style.color = `var(--html-scale-color)`;

            quiz_lang_score.style.boxShadow = `inset 0px 0px 11px var(--html-background-color)`;
          } else if (
            Object.values(quizes_score[i])[0] === "JavaScript Basics Quiz"
          ) {
            quiz_t.style.color = `var(--js-scale-color)`;

            quiz_lang_score.style.color = `var(--js-scale-color)`;

            quiz_lang_score.style.boxShadow = `inset 0px 0px 11px var(--js-background-color)`;
          }

          lang_score.appendChild(quiz_lang_score);
          all_results_container.appendChild(lang_score);

          // Animate Showing The Score:
          // -----------------------------

          let score_interval_counter = 0;

          let percentage = (
            (Object.values(quizes_score[i])[2] /
              Object.values(quizes_score[i])[1]) *
            100
          ).toFixed(2);

          let score_interval = setInterval(() => {
            quiz_lang_score.innerHTML = `${score_interval_counter}%`;

            if (Object.values(quizes_score[i])[0] === "CSS Basics Quiz") {
              quiz_lang_score.style.backgroundImage = `conic-gradient(var(--css-scale-color) ${score_interval_counter}%, #fff 0)`;
            } else if (
              Object.values(quizes_score[i])[0] === "HTML Basics Quiz"
            ) {
              quiz_lang_score.style.backgroundImage = `conic-gradient(var(--html-scale-color) ${score_interval_counter}%, #fff 0)`;
            } else if (
              Object.values(quizes_score[i])[0] === "JavaScript Basics Quiz"
            ) {
              quiz_lang_score.style.backgroundImage = `conic-gradient(var(--js-scale-color) ${score_interval_counter}%, #fff 0)`;
            }
            score_interval_counter++;

            if (score_interval_counter > percentage) {
              clearInterval(score_interval);
            }
          }, 600 / percentage);
        }
        start = true;
      }

      if (all_results_container.style.display === "flex") {
        all_results_container.style.display = "none";
        show_all_results_btn.innerHTML = "Show All Results";
      } else {
        all_results_container.style.display = "flex";
        show_all_results_btn.innerHTML = "Hide All Results";
      }
    });
  }
};

// Set The Information Of The Quiz:
// --------------------------------

function get_main_data_of_theQuiz(quiz_data) {
  quiz_container_title.innerHTML = quiz_data.quiz_title;

  total_questions_number.innerHTML = Array.from(quiz_data.questions).length;

  questions_number = Array.from(quiz_data.questions).length;

  quiz_title = quiz_data.quiz_title;

  timer(question_duration, Array.from(quiz_data.questions).length);

  // Create Random Questions Array:
  let questions_array = Array.from(quiz_data.questions);
  let questions_array_len = questions_array.length;
  let random_question_array = [];
  let random_number;

  for (let i = 0; i < questions_array_len; i++) {
    random_number = parseInt(Math.random() * questions_array.length);

    random_question_array.push(questions_array[random_number]);

    questions_array.splice(random_number, 1);
  }

  create_theQuestion(
    random_question_array[current_question],
    Array.from(quiz_data.questions).length,
  );

  store_theResult();

  // Get The Next Question:
  submit_btn.onclick = () => {
    if (current_question < Array.from(quiz_data.questions).length) {
      get_theResult(
        random_question_array[current_question],
        quiz_data.quiz_title,
      );
    } else {
      return false;
    }

    store_theResult();

    if (current_question === Array.from(quiz_data.questions).length - 2) {
      submit_btn.innerHTML = "submit";
    }

    if (current_question === questions_number - 1) {
      score = {
        quiz_title: quiz_data.quiz_title,
        question_no: questions_number,
        correct_answers: correct_answer_counter,
      };

      quiz_score.push(score);

      sessionStorage.setItem("quiz_score", JSON.stringify(quiz_score));
    }

    choices_container.innerHTML = "";
    question_des.textContent = "";

    clearInterval(timer_interval);

    timer(question_duration, Array.from(quiz_data.questions).length);

    current_question++;

    my_answer = "";

    create_theQuestion(
      random_question_array[current_question],
      Array.from(quiz_data.questions).length,
    );

    if (current_question === Array.from(quiz_data.questions).length) {
      question_des.style.display = "none";
      choices_container.style.display = "none";
      submit_container.style.display = "none";
      timer_container.style.display = "none";
      home_btn.style.display = "block";

      result_container = document.createElement("div");
      result_container.className = "result";

      let showing_result_message = document.createElement("p");
      showing_result_message.innerHTML = `Good Job`;

      result_container.appendChild(showing_result_message);

      let showing_right_answer = document.createElement("p");
      showing_right_answer.innerHTML = `The Right Answers: ${correct_answer_counter}`;

      result_container.appendChild(showing_right_answer);

      let showing_score = document.createElement("p");
      showing_score.innerHTML = `Your Score: ${((parseInt(correct_answer_counter) / Array.from(quiz_data.questions).length) * 100).toFixed(2)}%`;

      result_container.appendChild(showing_score);

      question_area.appendChild(result_container);
    }
  };
}

// Create The Question:
// --------------------

function create_theQuestion(question_data, questions_number) {
  if (current_question < questions_number) {
    // Get The Question:
    question_des.textContent = question_data.question;

    question_counter.innerHTML = `${current_question + 1} / `;

    // Create Random Questions Array:

    let myObj_arr = Object.keys(question_data.choices);
    let myObj_arr_len = myObj_arr.length;
    let random_choices_array = {};
    let ran_num;

    for (let i = 0; i < myObj_arr_len; i++) {
      ran_num = parseInt(Math.random() * myObj_arr.length);

      random_choices_array[myObj_arr[ran_num]] =
        question_data.choices[myObj_arr[ran_num]];

      myObj_arr.splice(ran_num, 1);
    }

    // Get The Choices:
    for (let i = 0; i < Object.keys(random_choices_array).length; i++) {
      let choice = document.createElement("p");
      choice.textContent = Object.values(random_choices_array)[i];
      choice.dataset.index = Object.keys(random_choices_array)[i];

      choices_container.appendChild(choice);
    }

    let choices_list = document.querySelectorAll(".choices p");

    // Get The Selected Answer:

    choices_list.forEach((choice) => {
      choice.className = "";
    });

    choices_list.forEach((choice) => {
      choice.onclick = () => {
        choices_list.forEach((e) => {
          e.className = "";
        });
        choice.className = "selected";

        choices_list.forEach((e) => {
          if (e.classList.contains("selected")) {
            my_answer = e.dataset.index;
          }
        });
      };
    });

    correct_answer = question_data.correct_answer;
  }
}

// Get The Result:
// --------------

function get_theResult(question_data, title) {
  if (my_answer === question_data.correct_answer) {
    correct_answer_counter++;
  }

  let result = {
    quiz_title: title,
    question_number: current_question + 1,
    theAnswer: my_answer,
    correct_answer: question_data.correct_answer,
  };

  answer_data.push(result);
}

// Set The Quetion Timer:
// ----------------------

function timer(duration, Question_no) {
  if (current_question < Question_no - 1) {
    timer_interval = setInterval(() => {
      let minutes = parseInt(duration / 60);
      let seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;

      seconds = seconds < 10 ? `0${seconds}` : seconds;

      timer_info.innerHTML = `${minutes}:${seconds}`;

      timer_container.style.backgroundImage = `conic-gradient(var(--second-color) ${(duration / question_duration) * 100}%, transparent 0)`;

      if (--duration < 0) {
        clearInterval(timer_interval);

        submit_btn.click();
      }
    }, 1000);
  }
}

// Go Home To Select The Next Quiz:
// --------------------------------

home_btn.onclick = () => {
  home_btn.style.display = "none";
  quiz_container.style = "none";
  openning_container.style.display = "block";
  clearInterval(timer_interval);
  start_btn.style.display = "none";

  languages_list.forEach((lang) => {
    lang.classList.remove("active");
  });
};

// End The Exam and Go Home:
// -----------------------------

quit_btn.onclick = () => {
  choices_container.innerHTML = "";
  question_des.textContent = "";
  home_btn.style.display = "none";
  quiz_container.style = "none";
  openning_container.style.display = "block";
  // answer_data = [];
  clearInterval(timer_interval);
  start_btn.style.display = "none";

  languages_list.forEach((lang) => {
    lang.classList.remove("active");
  });

  score = {
    q_title: quiz_title,
    question_no: questions_number,
    correct_answers: correct_answer_counter,
  };

  quiz_score.push(score);

  sessionStorage.setItem("quiz_score", JSON.stringify(quiz_score));
};

// Store The Result at session Storage:
// -------------------------------------

function store_theResult() {
  stored_data = JSON.stringify(answer_data);

  sessionStorage.setItem(`quiz_result`, stored_data);
}
