const inquirer = require('inquirer');

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


const questions = function () {

  return new Promise((resolve, reject) => {

      inquirer
          .prompt([
              {
                  type: 'input',
                  message: '\n\nWhat is the title of your webpage? If you can, try to include one of your keywords since your title will be used frequently by search engines.',
                  name: 'title',
              },
              {
                  type: 'input',
                  message: '\n\nHow would you describe your webpage?',
                  name: 'description',
              },
              {
                  type: 'input',
                  message: '\n\nWho is the author of the webpage?',
                  name: 'author',
              },
              {
                  type: 'input',
                  message: '\n\nWhat should the name of the file be?',
                  name: 'file',
              },
          ])
          .then((data) => {
            if (data) {
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

module.exports = {
  confirm,
  questions,
  create
};