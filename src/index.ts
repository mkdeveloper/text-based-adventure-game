#! /usr/bin/env nod
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { welcome, sleep } from "./welcome.js";
import { exit } from "process";

let msg = `
***********************************************
   Welcome to Mk's Text-Based Adventure-Game
***********************************************
`;

await welcome(msg);

const enemies = ["Zombie", "Skeleton", "Assasin", "Warrior"];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;

let health = 100;
let attackDamage = 50;
let healthPotion = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50;

let running = true;

GAME: while (running) {
  console.log(
    chalk.bold.red(
      `-------------------------------------------------------------------`
    )
  );

  let enemyHealth: number = Math.floor(Math.random() * maxEnemyHealth);
  let enemy: string = enemies[Math.floor(Math.random() * enemies.length)];

  chalkAnimation.pulse(`       # ${enemy} is here #\n`);
  await sleep();

  while (enemyHealth > 0) {
    console.log(chalk.yellow(`  Your HP: ${health}`));
    console.log(chalk.yellow(`  ${enemy}'s HP: ${enemyHealth}`));
    console.log(chalk.yellow(`  What would you like to do?`));
    let select = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        choices: ["Attack", "Drink Health Potion", "Run"],
      },
    ]);

    if (select.choice == "Attack") {
      let damageDealt: number = Math.floor(Math.random() * attackDamage);
      let damageTaken: number = Math.floor(Math.random() * enemyAttackDamage);

      enemyHealth -= damageDealt;
      health -= damageTaken;

      console.log(
        chalk.greenBright(
          `  >> You strike the ${enemy} for ${damageDealt} damage.`
        )
      );
      console.log(
        chalk.redBright(`  >> You recieve ${damageTaken} in retaliation!`)
      );

      if (health < 1) {
        console.log(
          chalk.red(
            `
    You have taken too much damage, you are too weak to go on!`
          )
        );
        break;
      }
    } else if (select.choice == "Drink Health Potion") {
      if (healthPotion > 0) {
        health += healthPotionHealAmount;
        healthPotion--;
        console.log(
          chalk.greenBright(
            `
     You drunk a health Potion
     You now have ${health} HP!
     You now have ${healthPotion} left
     `
          )
        );
      } else {
        console.log(
          chalk.redBright(
            `   You have no Health Potion left. Defeat enemies for a chance to get one.`
          )
        );
      }
    } else {
      console.log(chalk.yellow(`    You run away from the ${enemy}`));
      continue GAME;
    }
  }
  if (health < 1) {
    console.log(
      chalk.red(`    You limp out of the dungeon, weak from battle.`)
    );
    break;
  }
  console.log(
    chalk.red(
      `-------------------------------------------------------------------`
    )
  );
  console.log(chalk.greenBright(`   # ${enemy} was defeated! #`));
  console.log(chalk.greenBright(`   # You have ${health} HP left #`));

  if (Math.floor(Math.random() * 100) > healthPotionDropChance) {
    healthPotion++;
    console.log(
      chalk.yellowBright(`   # The ${enemy} dropped a health Potion # `)
    );
    console.log(
      chalk.yellowBright(
        `   # You now have ${healthPotion} Health Potion(s). #`
      )
    );
  }
  console.log(
    chalk.red(
      `-------------------------------------------------------------------`
    )
  );
  console.log(chalk.yellow(`What would you like to do now?`));
  let answ = await inquirer.prompt([
    {
      name: "choice",
      type: "list",
      choices: ["Continue Fighting", "Exit Dungeon"],
    },
  ]);

  if (answ.choice == "Continue Fighting") {
    console.log(chalk.yellow(`  You continue on your adventure!`));
  } else {
    console.log(
      chalk.red(`   You exit the dungeon, successfully from your adventures`)
    );
    break;
  }
}

msg = `
***********************************************************
   Thank Your for playing Mk's Text-Based Adventure-Game
***********************************************************
`;

await welcome(msg);
exit(0);
