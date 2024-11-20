import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../Redux/Slice/authSlice";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Auto-hide error after 1 second
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    dispatch(registerUser(userData)).then((action) => {
      if (registerUser.fulfilled.match(action)) {
        // If the registration is successful, clear the form
        resetForm();
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mb-2"
              />
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mb-2"
              />
              <div className="relative mb-4">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-6 h-6 text-gray-500" />
                  ) : (
                    <EyeIcon className="w-6 h-6 text-gray-500" />
                  )}
                </button>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mb-2"
                />
              </div>
              <div className="relative mb-4">
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="w-6 h-6 text-gray-500" />
                  ) : (
                    <EyeIcon className="w-6 h-6 text-gray-500" />
                  )}
                </button>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mb-2"
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
