export interface IMedication {
  description: string;
  id: string;
  name: string;
  initialAmount?: number;
  targetAmount?: number;
}

export type MedicationType = Omit<IMedication, 'id'>;
