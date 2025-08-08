import * as yup from 'yup';

export const userSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    country_id: yup.string().required('Country is required'),
    state_id: yup.string().required('State is required'),
});
