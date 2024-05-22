import readlineSync from "readline-sync";

interface Room {
  name: string;
  items?: {
    examineItems?: Record<string, string>;
    useItems?: Record<string, string>;
    openItems?: Record<string, string>;
  };
  conditions?: {
    useConditions?: Record<string, boolean>;
    openConditions?: Record<string, boolean>;
  };
  nextRooms?: {
    north?: string;
    east?: string;
    south?: string;
    west?: string;
  };
  conditionalNextRoom?: string;
}

interface RoomsMap {
  [roomName: string]: Room;
}

type direction = "north" | "west" | "east" | "south";

const rooms: RoomsMap = {
  E1: {
    name: "E1",

    items: {
      examineItems: { bed: "picklock" },
      useItems: { picklock: "lock" },
      openItems: { bars: "bars" },
    },
    conditions: {
      useConditions: { lock: false },
      openConditions: { bars: false },
    },
    nextRooms: {
      west: "C1",
    },
    conditionalNextRoom: "C1",
  },
  C1: { name: "C1", nextRooms: { north: "C2", east: "E1" } },
  C2: { name: "C2", nextRooms: { south: "C1", north: "C3" } },
  C3: { name: "C3", nextRooms: { south: "C2", east: "E3", north: "C4" } },
  E3: { name: "E3", nextRooms: { west: "C3", north: "E4" } },
  C4: {
    name: "C4",
    items: {
      useItems: { bonzo: "dog" },
    },
    conditions: {
      useConditions: { dog: false },
    },
    nextRooms: { south: "C3", east: "E4", north: "C5", west: "W4" },
    conditionalNextRoom: "C5",
  },
  W4: { name: "W4" },
  E4: {
    name: "E4",
    items: {
      examineItems: { bowl: "bonzo" },
    },
    nextRooms: { west: "C4", south: "E3" },
  },
  C5: { name: "C5" },
};

class Player {
  room: string;
  inventory: Record<string, boolean>;
  constructor() {
    this.room = "E1";
    this.inventory = {
      lockPin: false,
      bonzo: false,
    };
  }

  move(direction: string) {
    const openConditions = rooms[this.room]?.conditions?.openConditions;
    const useConditions = rooms[this.room]?.conditions?.useConditions;
    const conditionalNextRoom = rooms[this.room]?.conditionalNextRoom;
    const nextRoom = rooms[this.room]?.nextRooms?.[direction as direction];

    if (nextRoom) {
      if (!conditionalNextRoom || nextRoom !== conditionalNextRoom) {
        this.room = nextRoom;
        console.log(`You move ${direction} successfully\n`);
      } else if (
        Object.values({ ...openConditions, ...useConditions }).every(Boolean)
      ) {
        this.room = nextRoom;
        console.log(`You move ${direction} successfully\n`);
      } else {
        console.log("You can't go that way yet \n");
      }
    } else {
      console.log("You can't go that way \n");
    }
  }

  getInventory() {
    for (const item in this.inventory) {
      if (this.inventory[item]) {
        console.log(`${item}\n`);
      }
    }
  }

  examine(subject: string) {
    const foundItem = rooms[this.room]?.items?.examineItems[subject];
    if (foundItem) {
      this.inventory = { ...this.inventory, [foundItem]: true };
      console.log(
        `You examine the ${subject} and you collect ${foundItem} to your inventory\n`
      );
    } else {
      console.log(`You examine ${subject} but you find nothing\n`);
    }
  }

  use(subject1: string, subject2: string): void {
    const canBeUsed =
      rooms[this.room]?.items?.useItems?.[subject1] === subject2 &&
      this.inventory[subject1];
    if (canBeUsed) {
      rooms[this.room].conditions.useConditions[subject2] = true;
      console.log(`you unlock ${subject2} with ${subject1}\n`);
    } else {
      console.log(
        `You can't use ${subject1} on ${subject2} or you don't own ${subject1}\n`
      );
    }
  }

  open(subject: string) {
    console.log(subject);
    const canBeOpened = rooms[this.room]?.items?.openItems?.[subject];
    const isUseSatisfied = Object.values(
      rooms[this.room]?.conditions?.useConditions || {}
    ).every(Boolean);
    if (canBeOpened && isUseSatisfied) {
      rooms[this.room].conditions.openConditions[subject] = true;
      console.log(`You opened the ${subject} successfully\n`);
    } else {
      console.log(
        `Either you can't open ${subject} or you still have pre missions to complete\n`
      );
    }
  }
}

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
