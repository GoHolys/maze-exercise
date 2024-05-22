import { rooms } from "./room";

type direction = "north" | "west" | "east" | "south";

export class Player {
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
      console.log(`You can't examine ${subject}\n`);
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
