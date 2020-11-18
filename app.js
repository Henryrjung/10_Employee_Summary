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
        when: answers => answers.position ==="Manager"
    },
    // ask for github if engineer
    {
        type: "input",
        message: "Please enter the gihub username",
        name: "github",
        when: answers => answers.position ==="Engineer"
    },
    // ask for school if intern
    {
        type: "input",
        message: "Please enter the school",
        name: "school",
        when: answers => answers.position ==="Intern"
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
            if (answers.position === "Manager") {
                const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                fullTeam.push(newManager);
            }
            if (answers.position === "Engineer") {
                const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                fullTeam.push(newEngineer);
            }
            if (answers.position === "Intern") {
                const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
                fullTeam.push(newIntern);
            }
            if (answers.addAnother === "yes") {
                return questions();
            }
        });
}
// render the team
async function renderTeam() {
    const response = await render(fullTeam);
    if (fs.existsSync(OUTPUT_DIR)) {
        fs.writeFileSync(outputPath, response)
    } else {
        fs.mkdirSync(OUTPUT_DIR);
        fs.writeFileSync(outputPath, response);
    }
}
//run functions
questions().then(renderTeam);