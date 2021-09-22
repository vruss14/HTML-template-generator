const inquirer = require('inquirer');

// The confirm function/method resolves if the user confirms that they are ready to proceed
// A list is used in inquirer to use a choices array with set options

const confirm = function () {

  return new Promise((resolve, reject) => {
    inquirer
    .prompt(
      {
        type: 'list',
        message: '\n\nThis command-line interface will assist you in preparing an HTML page with relevant meta tags for SEO. Are you ready to proceed?',
        name: 'confirmation',
        choices: ['Yes', 'No']
      },
    )
    .then((answer) => {
      if (answer.confirmation === 'Yes') {
        return resolve(answer.confirmation)
      }
      return;
    })
    .catch((error) => {
      if (error) {
        console.log(error)
        return reject(error);
      }
    });
  })
}

// This is the main questions object for the application; collects relevant data for page generation
// Resolves if the data is truthy

const questions = function () {

  return new Promise((resolve, reject) => {

      inquirer
          .prompt([
              {
                  type: 'input',
                  message: '\n\nWhat is the title of your webpage? Try to include one of your keywords, and keep the title under 60 characters.',
                  name: 'title',
              },
              {
                  type: 'input',
                  message: '\n\nHow would you describe your webpage in 1–3 sentences?',
                  name: 'description',
              },
              {
                  type: 'input',
                  message: '\n\nWho is the author of the webpage?',
                  name: 'author',
              },
              {
                type: 'list',
                message: '\n\nWhat dialect of English is the page written in?',
                name: 'english',
                choices: ['United States of America', 'Great Britain', 'Canada', 'Australia', 'South Africa', 'New Zealand', 'Ireland']
              },
              {
                  type: 'input',
                  message: '\n\nWhat should the name of the file be (e.g. index.html)?',
                  name: 'file',
              },
          ])
          .then((data) => {
            if (data) {

              // Validate each response in the data object to ensure no blank responses

              for (const response in data) {
                if(data[response] === "") {
                  console.log('\nError: At least one of your responses was blank. Please try again.\n');
                  return;
                }
              }

              // Validate that the user has entered the correct file extension (.html)

              if(data.file.slice(-5) !== '.html') {
                console.log('\nError: You need to specify an HTML file name, including the correct extension (e.g. index.html). Please try again.\n');
                return;
              }
              return resolve(data)
            }
            return;
          })
          .catch((error) => {
            if (error) {
              console.log(error)
              return reject(error);
            }
          });
  })
}

// The create function/method in the generator asks whether the user would like
// to create another page, and resolves if the user answers 'Yes'

const create = function () {

  return new Promise((resolve, reject) => {
    inquirer
        .prompt(
            {
                type: 'list',
                message: '\n\nWould you like to create another page?',
                name: 'new',
                choices: ['Yes', 'No']
            },
        )
        .then((answer) => {
            if(answer.new === 'Yes') {
                return resolve(answer.new);
            }
            return;
        })
        .catch((error) => {
            if (error) {
                console.log(error);
                return reject(error);
            }
        });
  })
}

// Modularization for the three methods of the generator file

module.exports = {
  confirm,
  questions,
  create
};