export class Subject {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export class ExamineSubject extends Subject {
  resultSubject: Subject;
  constructor(name: string, resultSubject: Subject) {
    super(name);
    this.resultSubject = resultSubject;
  }
}

export class UseSubject extends Subject {
  usedOnSubject: Subject;
  constructor(name: string, usedOnSubject: Subject) {
    super(name);
    this.usedOnSubject = usedOnSubject;
  }
}

export class OpenSubject extends Subject {
  constructor(name: string) {
    super(name);
  }
}
