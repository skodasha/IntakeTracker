import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { MedicationType } from '@/app/interfaces/medication.interface';

const schema: yup.ObjectSchema<MedicationType> = yup
    .object({
        name: yup.string().required('Name is required'),
        description: yup.string().required('Description is required'),
        initialAmount: yup
            .number()
            .typeError('Initial amount must be a number'),
        targetAmount: yup
            .number()
            .typeError('Initial amount must be a number'),
        })
    .required()

export const resolver = yupResolver(schema);
