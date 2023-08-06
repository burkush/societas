import React from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../app/store';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas/yupSchemas';

const Login = () => {
  const navigate = useNavigate();

  const isAuth = useAuthStore((state) => state.isAuth);
  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleLogin(values.email, values.password);
    }
  });

  async function handleLogin(email, password) {
    const loginSuccess = await login(email, password);

    if (loginSuccess) {
      navigate('/dashboard');
    }
  }

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {error && <p className="text-center mb-4 text-red-500">{error}</p>}

      <form className="max-w-sm flex flex-col mx-auto">
        <fieldset className="mb-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className={`mb-1 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2 ${
              formik.errors.email && formik.touched.email
                ? 'border-2 border-rose-400'
                : ''
            }`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-xs text-rose-400">{formik.errors.email}</p>
          )}
        </fieldset>

        <fieldset className="mb-4">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className={`mb-1 border border-gray-300 text-gray-900 text-sm rounded-md outline-none focus:ring-2 focus:ring-blue-200 block w-full p-2 ${
              formik.errors.password && formik.touched.password
                ? 'border-2 border-rose-400'
                : ''
            }`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-xs text-rose-400">{formik.errors.password}</p>
          )}
        </fieldset>

        <button
          type="submit"
          className="mb-6 text-white bg-blue-400 outline-none hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-4 py-2 text-center"
          disabled={formik.isSubmitting}
          onClick={formik.handleSubmit}
        >
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="text-center text-sm">
        Don't have account yet?{' '}
        <Link to="/register" className="text-sm text-blue-600 hover:underline">
          Create account
        </Link>
      </p>
    </main>
  );
};

export default Login;
