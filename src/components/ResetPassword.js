import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { auth } from "../utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router";
import { IoIosClose } from "react-icons/io";
const ResetPassword = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-black min-h-screen w-full flex flex-col items-center justify-center'>
      <button
        onClick={() => {
          navigate("/Login");
        }}
        className='self-start '
      >
        <IoIosClose className='text-white text-6xl absolute top-0' />
      </button>{" "}
      <h3 className='text-white font-bold lg:text-5xl text-xl mb-16'>
        Şifremi Unuttum{" "}
      </h3>{" "}
      <div className='container mx-auto flex-col flex items-center justify-center h-full'>
        <Formik
          initialValues={{ email: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Gerekli";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Geçersiz e-posta adresi";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            sendPasswordResetEmail(auth, values.email)
              .then(() => {
                // Password reset email sent!
                alert("Şifre yenileme maili gönderildi!");
                navigate("/Login");

                // ..
              })
              .catch((error) => {
                alert("Doğru mail adresini girdiğinizi kontrol ediniz.");
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col mt-12 gap-8 w-full items-center justify-center'>
              <div className=' '>
                <Field
                  className='bg-stone-900 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-gray-200 focus:border-mor transition-all'
                  type='email'
                  name='email'
                  placeholder='E-Posta'
                />
                <ErrorMessage
                  className='text-mor mt-3'
                  name='email'
                  component='div'
                />
              </div>{" "}
              <button
                className='bg-mor w-36 md:w-72 ml-auto mr-auto py-4 hover:bg-mor transition-all'
                type='submit'
                disabled={isSubmitting}
              >
                Gönder{" "}
              </button>{" "}
            </Form>
          )}{" "}
        </Formik>{" "}
      </div>{" "}
    </div>
  );
};

export default ResetPassword;
