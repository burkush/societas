import React from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../app/store';
import { Form, Formik } from 'formik';
import { registerSchema } from '../../schemas/yupSchemas';
import CustomInput from './components/CustomInput';
import SelectDay from './components/SelectDay';
import SelectMonth from './components/SelectMonth';
import SelectYear from './components/SelectYear';
import formatDateToISO from '../../utils/formatDateToISO';

const SignUp = () => {
  const navigate = useNavigate();

  const isAuth = useAuthStore((state) => state.isAuth);
  const register = useAuthStore((state) => state.register);
  const error = useAuthStore((state) => state.error);

  const handleSubmit = (values) => {
    handleRegister(
      values.email,
      values.password,
      values.firstName,
      values.lastName,
      values.birthDay,
      values.birthMonth,
      values.birthYear
    );
  };

  async function handleRegister(
    email,
    password,
    firstName,
    lastName,
    birthDay,
    birthMonth,
    birthYear
  ) {
    const birthDate = formatDateToISO(birthDay, birthMonth, birthYear);
    const registerSuccess = await register(
      email,
      password,
      firstName,
      lastName,
      birthDate
    );

    if (registerSuccess) {
      navigate('/dashboard');
    }
  }

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create new account
      </h2>

      {error && <p className="text-center mb-4 text-red-500">{error}</p>}

      <Formik
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          birthDay: '1',
          birthMonth: '1',
          birthYear: '2007'
        }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-xl flex flex-col mx-auto">
            <fieldset className="flex gap-x-5 mb-4">
              <CustomInput
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First name"
              />
              <CustomInput
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last name"
              />
            </fieldset>

            <fieldset className="mb-4">
              <CustomInput
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
            </fieldset>

            <fieldset className="mb-4">
              <CustomInput
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </fieldset>

            <fieldset className="mb-4">
              <p className="text-sm mb-2">Date of birth</p>

              <div className="flex gap-x-5">
                <SelectDay name="birthDay" />
                <SelectMonth name="birthMonth" />
                <SelectYear name="birthYear" />
              </div>
            </fieldset>

            <button
              type="submit"
              className="mb-6 text-white bg-blue-400 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-4 py-2 text-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </button>
          </Form>
        )}
      </Formik>

      <p className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-sm text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </main>
  );
};

export default SignUp;
