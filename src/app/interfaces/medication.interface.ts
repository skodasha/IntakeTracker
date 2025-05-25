export interface IMedication {
  id: string;
  name: string;
  description: string;
  initialAmount?: number;
  targetAmount?: number;
};

export type MedicationType = Omit<IMedication, 'id'>;