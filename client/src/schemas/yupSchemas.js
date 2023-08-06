import * as yup from 'yup';

// Login data validation

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter the correct email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'At least 8 characters required')
    .max(32, 'No more than 32 characters required')
    .required('Password is required')
});

// Register validation

const currentYear = new Date().getFullYear();
const minYear = currentYear - 100;
const maxYear = currentYear - 16;

const validateBirthDate = () =>
  yup
    .number()
    .typeError('Invalid date')
    .test('valid-day', 'Invalid day', function (value) {
      const { birthMonth, birthYear } = this.parent;
      if (!birthMonth || !birthYear) return true;

      const lastDayOfMonth = new Date(birthYear, birthMonth, 0).getDate();
      return value >= 1 && value <= lastDayOfMonth;
    });

const validateBirthMonth = () =>
  yup
    .number()
    .typeError('Invalid month')
    .integer('Invalid month')
    .min(1, 'Invalid month')
    .max(12, 'Invalid month');

const validateBirthYear = () =>
  yup
    .number()
    .typeError('Invalid year')
    .integer('Invalid year')
    .min(minYear, `Year must be at least ${minYear}`)
    .max(maxYear, `Year cannot be after ${maxYear}`);

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter the correct email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'At least 8 characters required')
    .max(32, 'No more than 32 characters required')
    .required('Password is required'),
  firstName: yup
    .string()
    .min(2, 'At least 2 characters required')
    .max(32, 'No more than 32 characters required')
    .required('This field is required'),
  lastName: yup
    .string()
    .min(2, 'At least 2 characters required')
    .max(32, 'No more than 32 characters required')
    .required('This field is required'),
  birthDay: validateBirthDate(),
  birthMonth: validateBirthMonth(),
  birthYear: validateBirthYear()
});
