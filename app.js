const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { deepStrictEqual } = require("assert");

// team object
const fullTeam = [];
// questions 
const teamQuestions = [
    // ask for employee status
    {
        type: "list",
        message: "Please select an employee position",
        choices: ["Manager", "Engineer", "Intern"],
        name: "position",
    },
    // ask for name
    {
        type: "input",
        message: "Please enter an employee name",
        name: "name",
    },
    // ask for employee id
    {
        type: "input",
        message: "Please enter an employee id number",
        name: "id",
    },
    // ask for email
    {
        type: "input",
        message: "Please enter an employee email",
        name: "email",
    },
    // ask for office number if manager
    {
        type: "input",
        message: "Please enter the manager office number",
        name: "officeNumber",
    },
    // ask for github if engineer
    {
        type: "input",
        message: "Please enter the gihub username",
        name: "github",
    },
    // ask for school if intern
    {
        type: "input",
        message: "Please enter the school",
        name: "school",
    },
    // prompt to add an another employee
    {
        type: "list",
        message: "Would you like to add another employee?",
        choices: ["yes", "no"],
        name: "addAnother",
    },
];
// ask inquirer questions
async function questions() {
    await inquirer
        .prompt(teamQuestions)
        .then(answers => {
            if (answers.title === "manager") {
                const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                fullTeam.push(newManager);
            }
            if (answers.title === "engineer") {
                const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                fullTeam.push(newEngineer);
            }
            if (answers.title === "intern") {
                const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
                fullTeam.push(newIntern);
            }
            if (answers.back === "yes") {
                return questions();
            }
        })
}
// render the team
async function renderTeam() {
    const res = await render(fullTeam);
    if (fs.existsSync(OUTPUT_DIR)) {
        fs.writeFileSync(outputPath, res)
    } else {
        fs.mkdirSync(OUTPUT_DIR);
        fs.writeFileSync(outputPath, res);
    }
}
//run functions
questions().then(renderTeam);


// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
