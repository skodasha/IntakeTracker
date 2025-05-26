import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { IMedication, MedicationType } from '@/app/interfaces/medication.interface';
import medicationRepository from '@/app/repositories/api/medication';

const MEDICATIONS_QUERY_KEY = ['medications'];

export const useMedications = () => {
  const queryClient = useQueryClient();

  const medicationsQuery = useQuery({
    queryFn: () => medicationRepository.getAllMedications(),
    queryKey: MEDICATIONS_QUERY_KEY,
  });

  const createMedicationMutation = useMutation({
    mutationFn: (payload: MedicationType) => medicationRepository.createMedication(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MEDICATIONS_QUERY_KEY }),
  });

  const updateMedicationMutation = useMutation({
    mutationFn: ({ id, ...payload }: IMedication) =>
      medicationRepository.updateMedication(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MEDICATIONS_QUERY_KEY }),
  });

  const deleteMedicationMutation = useMutation({
    mutationFn: (id: string) => medicationRepository.deleteMedication(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MEDICATIONS_QUERY_KEY }),
  });

  return {
    ...medicationsQuery,
    createMedication: createMedicationMutation.mutate,
    deleteMedication: deleteMedicationMutation.mutate,
    isCreating: createMedicationMutation.isPending,

    isDeleting: deleteMedicationMutation.isPending,
    isUpdating: updateMedicationMutation.isPending,
    updateMedication: updateMedicationMutation.mutate,
  };
};

export const useMedicationById = (id?: string) => {
  return useQuery({
    enabled: !!id,
    queryFn: () => medicationRepository.getMedicationById(id!),
    queryKey: ['medications', id],
  });
};
