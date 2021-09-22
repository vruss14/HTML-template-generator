const fs = require('fs');
const generator = require('./generator.js');

// Add error proofing
// Add even more helpful things in the HTML doc line by line
// Consider adding HTML checklist commented in the generated document
// Write Jest tests to test each function

confirmRequest();

// Uses inquirer to determine if the user wishes to proceed
// Only proceeds if the response from the generator is 'Yes'

function confirmRequest() {
    generator.confirm().then((answer) => {
        if(answer === 'Yes') {
            askQuestions();
        }
        return;
    })
}

// Uses the set of questions from the generator and takes the responses
// If the responses exist, then the generatePage function is called with the responses as an argument

function askQuestions() {
    generator.questions().then((responses) => {
        if(responses) {
            generatePage(responses);
        }
        return;
    })        
}

// The generatePage function accepts an answer parameter and uses the answer object to pull relevant data
// to ultimately generate an SEO-friendly HTML document

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

// If there was no error in the generatePage function, respondSuccess logs a successful message in the console
// and calls a function that asks whether the user wants to create another new page

function respondSuccess() {
    console.log("\n\nThank you! Your HTML file has been generated successfully.");
    askNew();
}

// askNew uses the generator.create method to ask whether the user wants to create another page
// confirmRequest is called again only if the generator.create method returns and resolves with 'Yes'

function askNew() {
    generator.create().then((answer) => {
        if(answer === 'Yes') {
            confirmRequest();
        }
        return;
    })
}
