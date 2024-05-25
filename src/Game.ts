import { Player } from "./player";
import { Room } from "./room";
import { ExamineSubject, OpenSubject, Subject, UseSubject } from "./subject";

export class Game {
  _map: Record<string, Room> = {};
  _subjects: Record<string, Subject>;
  player: Player;

  constructor() {
    const bars = new OpenSubject("bars");
    const lock = new Subject("lock");
    const picklock = new UseSubject("picklock", lock);
    const bed = new ExamineSubject("bed", picklock);

    const dog = new Subject("dog");
    const bonzo = new UseSubject("bonzo", dog);
    const bowl = new ExamineSubject("bed", bonzo);

    this._subjects = { bars, picklock, bed, dog, bonzo, bowl };

    this._map["E1"] = new Room(
      "E1",
      "There is a bed a lockpick and bars in this room",
      {
        north: null,
        east: null,
        south: null,
        west: "C1",
      },
      {
        examineSubject: { bed },
        useSubject: { picklock },
        openSubject: bars,
      },
      { useSubject: false, openSubject: false },
      "C1"
    );

    this._map["C1"] = new Room("C1", "-", {
      north: "C2",
      east: "E1",
      south: null,
      west: null,
    });

    this._map["C2"] = new Room("C2", "-", {
      north: "C3",
      east: null,
      south: "C1",
      west: null,
    });

    this._map["C3"] = new Room("C3", "-", {
      north: "C4",
      east: "E3",
      south: "C2",
      west: null,
    });

    this._map["E3"] = new Room("E3", "-", {
      north: "E4",
      east: null,
      south: null,
      west: "C3",
    });

    this._map["E4"] = new Room(
      "E4",
      "There is a bowl in this room",
      {
        north: null,
        east: null,
        south: "E3",
        west: "C4",
      },
      { examineSubject: { bowl } }
    );

    this._map["C4"] = new Room(
      "C4",
      "There is a scary dog in this room",
      { north: "C5", east: "E4", south: "C3", west: "W4" },
      { useSubject: { bonzo }, subject: dog },
      { useSubject: false },
      "C5"
    );

    this._map["W4"] = new Room("W4", "There is a scary guard in this room", {
      north: null,
      east: null,
      south: null,
      west: null,
    });
    this._map["C5"] = new Room("C5", "Victory room basically", {
      north: null,
      east: null,
      south: null,
      west: null,
    });

    this.player = new Player(this._map["E1"]);
  }

  get map() {
    return this._map;
  }
  get subjects() {
    return this._subjects;
  }
}
