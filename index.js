const fs = require('fs');
const inquirer = require('inquirer');

askConfirmation();

function askConfirmation() {
    inquirer
        .prompt(
            {
                type: 'list',
                message: 'This command-line interface will assist you in preparing an HTML page with relevant meta tags for SEO. Are you ready to proceed?',
                name: 'confirmation',
                choices: ['Yes', 'No']
            },
        )
        .then((answer) => {
            if(answer.confirmation === 'Yes') {
                askQuestionSet();
            }
            return;
        })
        .catch((error) => {
            if (error.isTtyError) {
            console.log('The prompt could not be rendered.')
            } else {
            console.log('Error: Please exit the CLI and begin again.')
            }
        });
}

function askQuestionSet() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the title of your webpage? If you can, try to include one of your keywords since your title will be used frequently by search engines.',
                name: 'title',
            },
            {
                type: 'input',
                message: 'How would you describe your webpage?',
                name: 'description',
            },
            {
                type: 'input',
                message: 'Who is the author of the webpage?',
                name: 'author',
            },
            {
                type: 'input',
                message: 'What should the name of the file be?',
                name: 'file',
            },
        ])
        .then((data) => {
            const fileName = data.file;
            fs.writeFile(fileName,
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="author" content="${data.author}">
    <meta name="description" content="${data.description}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- CSS -->
    <!-- <link rel="stylesheet" type="text/css" href="ENTER YOUR CSS URL HERE"> -->

    <title>${data.title}</title>

    <!-- Favicon -->
    <!-- <link rel="shortcut icon" type="image/jpg" href="ENTER YOUR FAVICON URL HERE"/> -->
</head>
<body>

    <!-- <script src="ENTER SCRIPT URL HERE"></script> -->
</body>
</html>`, (error) => {
    if(error) {
        console.log(error)
    }
    respondSuccess();
})

    function respondSuccess() {
        console.log("Thank you! Your HTML file has been generated successfully.");
        askNew();
    }

    function askNew() {
        inquirer
            .prompt(
                {
                    type: 'list',
                    message: 'Would you like to create another page?',
                    name: 'new',
                    choices: ['Yes', 'No']
                },
            )
            .then((answer) => {
                if(answer.new === 'Yes') {
                    askConfirmation();
                }
                return;
            })
            .catch((error) => {
                if (error) {
                    console.log(error)
                }
            });
    }

    })
        .catch((error) => {
            if (error.isTtyError) {
            console.log('The prompt could not be rendered.')
            return;
            } else {
            console.log('Error: Please try again.')
            return;
            }
        });
}