import readlineSync from "readline-sync";
import { Player } from "./player";

const player = new Player();

function gameLoop() {
  if (player.room === "W4") {
    console.log("You got caught by the guard, hence you lost.\n");
    return;
  }
  if (player.room === "C5") {
    console.log("You officially escaped the castle and WON!\n");
    return;
  }
  console.log(`The name of the current room is ${player.room}\n`);

  const command = readlineSync.question(
    "Enter your command (move/examine/use/open/inventory): \n"
  );
  const [action, ...args] = command.split(" ");
  switch (action) {
    case "move":
      player.move(args[0]);
      break;
    case "examine":
      player.examine(args[0]);
      break;
    case "use":
      player.use(args[0], args[1]);
      break;
    case "open":
      player.open(args[0]);
      break;
    case "inventory":
      player.getInventory();
      break;
    default:
      console.log("Invalid command. Try again.\n");
  }
  gameLoop();
}

console.log("Welcome to the maze game\n");
gameLoop();
