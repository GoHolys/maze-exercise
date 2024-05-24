import readlineSync from "readline-sync";
import { Game } from "./game";

const game = new Game();

function gameLoop() {
  if (game.player.room.name === "W4") {
    console.log("You got caught by the guard, hence you lost.\n");
    return;
  }
  if (game.player.room.name === "C5") {
    console.log("You officially escaped the castle and WON!\n");
    return;
  }
  console.log(`The name of the current room is ${game.player.room.name}\n`);

  const command = readlineSync.question(
    "Enter your command (move/examine/use/open/inventory): \n"
  );
  const [action, ...args] = command.split(" ");
  switch (action) {
    case "move":
      game.player.move(args[0], game.map);
      break;
    case "examine":
      game.player.examine(args[0]);
      break;
    case "use":
      game.player.use(args[0], args[1]);
      break;
    case "open":
      game.player.open(args[0]);
      break;
    case "inventory":
      game.player.getInventory();
      break;
    default:
      console.log("Invalid command. Try again.\n");
  }
  gameLoop();
}

console.log("Welcome to the maze game\n");
gameLoop();
