const fs = require('fs');
const inquirer = require('inquirer');
const generator = require('./generator.js');

confirmRequest();

function confirmRequest() {
    generator.confirm().then((answer) => {
        if(answer === 'Yes') {
            askQuestions();
        }
        return;
    })
}

function askQuestions() {
    generator.questions().then((responses) => {
        if(responses) {
            generatePage(responses);
        }
        return;
    })        
}

function generatePage(answer) {
    const fileName = answer.file;
    fs.writeFile(fileName,

`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="author" content="${answer.author}">
    <meta name="description" content="${answer.description}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
    <!-- CSS -->
    <!-- <link rel="stylesheet" type="text/css" href="ENTER YOUR CSS URL HERE"> -->
        
    <title>${answer.title}</title>
        
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
}

function respondSuccess() {
    console.log("\n\nThank you! Your HTML file has been generated successfully.");
    askNew();
}

function askNew() {

    generator.create().then((answer) => {
        if(answer === 'Yes') {
            confirmRequest();
        }
        return;
    })

}
