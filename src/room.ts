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

export const rooms: RoomsMap = {
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
