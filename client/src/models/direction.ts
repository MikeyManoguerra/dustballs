export interface Direction {
  type: string;
  direction: string;
}

export function isDirection(entry: any): entry is Direction {
  return entry.direction !== undefined
}
