#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const randomNumber = Math.floor(10000 + Math.random() * 90000);
let myBalance = 0;
let answer = await inquirer.prompt([
    {
        name: "student",
        type: "input",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return chalk.red("Please enter a non-empty value.");
        },
        message: chalk.yellow("Enter Student name:")
    },
    {
        name: "courses",
        type: "list",
        message: chalk.yellow("Select the course to enrolled"),
        choices: ["HTML", "CSS", "Javascript", "Typescript", "Python"]
    }
]);
const tutionFee = {
    "HTML": 2000,
    "CSS": 2500,
    "Javascript": 5000,
    "Typescript": 6000,
    "Python": 10000
};
console.log(`\nTution Fees: ${tutionFee[answer.courses]}/-\n`);
console.log(`Balance:${myBalance}\n`);
let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: chalk.yellow("Select your payment method"),
        choices: ["Bank Transfer", "Cash", "Easypaisa", "Jasscash"]
    },
    {
        name: "amount",
        type: "input",
        message: chalk.yellow("Transfer Money:"),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return chalk.red("Please enter a non-empty value.");
        },
    }
]);
console.log(`\nYou select payment method ${paymentType.payment}\n`);
const tutionFees = tutionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);
if (tutionFees === paymentAmount) {
    console.log(chalk.magenta(`Congratulation, You have successfully enrolled in ${answer.courses}.\n`));
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: chalk.yellow("What would you like to do next?"),
            choices: ["View Status", "Exit"]
        }
    ]);
    if (ans.select === "View Status") {
        console.log(chalk.bgCyanBright("\n \t STATUS \t\n "));
        console.log(chalk.green(`Student Name:${answer.student}`));
        console.log(chalk.green(`Student ID: ${randomNumber}`));
        console.log(chalk.green(`Course: ${answer.courses}`));
        console.log(chalk.green(`Tution Fees Paid:${paymentAmount}`));
        console.log(chalk.green(`Balance: ${myBalance += paymentAmount}`));
    }
    else {
        console.log(chalk.magenta("\n Exiting Student Management System\n"));
    }
}
else {
    console.log(chalk.red("\n Invalid amount due to course \n"));
}
