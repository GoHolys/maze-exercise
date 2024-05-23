import { Room } from "./RoomObject";

type Direction = "north" | "west" | "east" | "south";

export class Player {
  room: Room;
  inventory: Record<string, Object>;
  constructor(room: Room) {
    this.room = room;
    this.inventory = {};
  }

  move(direction: string, map: Record<string, Room>) {
    const nextRoom = this.room.directions?.[direction as Direction];

    if (nextRoom) {
      if (
        nextRoom === this.room.roomNeededUnlock && Object.values(this.room.conditions).every(Boolean) || 
        !this.room.conditions || 
        this.room.conditions && nextRoom !== this.room.roomNeededUnlock  
      ) {
        this.room = map[nextRoom];
      } else {
        console.log(`You can't move this direction yet \n`);
      }
    } else {
      console.log(`You can't move this direction \n`);
    }
  }

  getInventory() {
    for (const item in this.inventory) {
      console.log(this.inventory[item]);
    }
  }

  examine(subject: string) {
    const foundItem =
      this.room.subjects?.examineSubject?.[subject]?.resultSubject.name;
    if (foundItem) {
      this.inventory = { ...this.inventory, [foundItem]: foundItem };
      console.log(
        `You examine the ${subject} and you collect ${foundItem} to your inventory\n`
      );
    } else {
      console.log(`You can't examine ${subject}\n`);
    }
  }

  use(subject1: string, subject2: string): void {
    const canBeUsed =
      this.inventory?.[subject1] &&
      this.room.subjects?.useSubject[subject1]?.usedOnSubject.name === subject2;
    if (canBeUsed) {
      this.room.conditions.useSubject= true;
      console.log(`you unlock ${subject2} with ${subject1}\n`);
    } else {
      console.log(
        `You can't use ${subject1} on ${subject2} or you don't own ${subject1}\n`
      );
    }
  }

  open(subject: string) {
    
    const canBeOpened = this?.room?.subjects?.openSubject?.name === subject;
    const isUseSatisfied = this.room?.conditions.useSubject;
    if (canBeOpened && isUseSatisfied) {
      this.room.conditions.openSubject = true
      console.log(`You opened the ${subject} successfully\n`);
    } else {
      console.log(
        `Either you can't open ${subject} or you still have pre missions to complete\n`
      );
    }
  }
}
