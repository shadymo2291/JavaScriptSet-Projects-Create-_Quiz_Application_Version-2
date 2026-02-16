## Table of contents

- [Links](#links)
- [Built with](#built-with)
- [What I learned](#what-i-learned)
- [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- hover pseudo class
- animation
- responsive using media query
- font awesome
- JavaScript
- json
- Ajax
- interval
- events
- if conditions
- E6S

### What I learned

in this project i used some CSS properties to help for responsive application and using JavaScript to get the data (questions) from json files and control all the application and display random questions with random choices also get the resultes of all quizes

To see how you can add code snippets, see below:


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


### Continued development

I want to learn more about JavaScript and creating more applications to master Javascript:

## Author

- Frontend Mentor - [@shadymo2291](https://www.frontendmentor.io/profile/shadymo2291)
- https://www.upwork.com/freelancers/~01d544da35261cf01c

## Acknowledgments

I want to thank everyone who helped me to learn and to code, especially the Elzero Web School channel on YouTube
