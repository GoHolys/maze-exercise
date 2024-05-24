import { ExamineSubject, OpenSubject, Subject, UseSubject } from "./subject";

export class Room {
  name: string;
  description: string;
  directions: {
    north?: string;
    east?: string;
    south?: string;
    west?: string;
  };
  subjects?: {
    examineSubject?: Record<string, ExamineSubject>;
    useSubject?: Record<string, UseSubject>;
    openSubject?: OpenSubject;
  };
  conditions?: { useSubject?: boolean; openSubject?: boolean };
  roomNeededUnlock?: string;

  constructor(
    name: string,
    description: string,
    directions: {
      north?: string;
      east?: string;
      south?: string;
      west?: string;
    },
    subjects?: {
      examineSubject?: Record<string, ExamineSubject>;
      useSubject?: Record<string, UseSubject>;
      openSubject?: OpenSubject;
      subject?: Subject;
    },
    conditions?: { useSubject?: boolean; openSubject?: boolean },
    roomNeededUnlock?: string
  ) {
    this.name = name;
    this.description = description;
    this.directions = directions;
    this.subjects = subjects;
    this.roomNeededUnlock = roomNeededUnlock;
    this.conditions = conditions;
  }
}
