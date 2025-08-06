import * as yup from 'yup';

export const userSchema = yup.object().shape({
name: yup.string().required('Name is required'),
email: yup.string().email('Invalid email').required('Email is required'),
country_id: yup.string().required('Country is required'),
state_id: yup.string().required('State is required'),
});