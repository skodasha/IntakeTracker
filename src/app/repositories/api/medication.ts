import config from '@/app/config/config';
import { IMedication, MedicationType } from '@/app/interfaces/medication.interface';
import ApiRepository from './api';

class MedicationRepository extends ApiRepository {
  constructor() {
    super(config.api.url);
  }

  public async getAllMedications(): Promise<IMedication[]> {
    const result = await this.http.get('/medication/all');
    return result.data;
  }

  public async getMedicationById(medicationId: string): Promise<IMedication> {
    const result = await this.http.get(`/medication/${medicationId}`);
    return result.data;
  }

  public async createMedication(payload: MedicationType): Promise<IMedication> {
    const result = await this.http.post('/medication/create', payload);
    return result.data;
  }

  public async updateMedication(medicationId: string, payload: MedicationType): Promise<IMedication> {
    const result = await this.http.put(`/medication/update/${medicationId}`, payload);
    return result.data;
  }

  public async deleteMedication(medicationId: string): Promise<void> {
    const result = await this.http.delete(`/medication/delete/${medicationId}`);
    return result.data;
  }
}

const medicationRepository = new MedicationRepository();
export default medicationRepository;