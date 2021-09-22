const fs = require('fs');
const generator = require('./generator.js');

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

            // If responses is truthy, then translate responses.english that to a properly formatted HTML lang attribute

            switch (responses.english) {
                case 'United States of America':
                    responses.lang = 'en-US'
                    break;
    
                case 'Great Britain':
                    responses.lang = 'en-GB'
                    break;
    
                case 'Canada':
                    responses.lang = 'en-CA'
                    break;
    
                case 'Australia':
                    responses.lang = 'en-AU'
                    break;
    
                case 'South Africa':
                    responses.lang = 'en-ZA'
                    break;
    
                case 'New Zealand':
                    responses.lang = 'en-NZ'
                    break;
    
                case 'Ireland':
                    responses.lang = 'en-IE'
                    break;
    
                default:
                    responses.lang = 'en'
                    break;
            }
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

<!-- HTML CHECKLIST FOR SEO; DELETE EACH COMMENT WHEN YOUR RESPONSE IS 'TRUE' -->
<!-- The title of my page would make a relevant, succinct headline for search engines to use. -->
<!-- The meta description of my page would make a good snippet/summary for search engines to use.  -->
<!-- The meta author of my page is correct. -->
<!-- All of my external resources (CSS, JavaScript, custom fonts, etc.) are connected successfully to my page. -->
<!-- My heading tags are organized in a hierarchial way (e.g. only 1 H1, a few H2, H3 within H2, etc.) -->
<!-- All of my images have alt attributes with an accurate description of each picture. -->
<!-- I'm using semantic HTML tags wherever possible instead of divs (e.g. header, nav, main, article, section, footer). -->
<!-- A computer could read my HTML page and understand it very well. -->

<html lang="${answer.lang}">

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
                console.log(error);
                return;
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
