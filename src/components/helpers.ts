export type InstructDroneResponse = {
  instructions: string,
  success: boolean,
  billboards: Billboard[],
  message: string
}

export type GetBillboardResponse = {
  success: boolean,
  billboard: Billboard
}

export type Billboard = {
  id: string;
  billboardText: string;
  advertiser: string;
  address: string;
  photosTaken: number;
  image: string;
}

export const DroneActionLabels: Record<'<' | '>' | '^' | 'v' | 'x', string> = {
  '<': 'Left',
  '>': 'Right',
  '^': 'Up',
  'v': 'Down',
  'x': 'Capture'
};