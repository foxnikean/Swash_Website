import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  return (
    <div className=' bg-black min-h-screen min-w-screen '>
      <div className='container flex-col flex m-auto items-center justify-center min-h-screen min-w-full'>
        <h3 className='text-white font-bold text-5xl'> Giriş Yap </h3>
        <Formik
          initialValues={{ email: "", password: "" }}
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
            signInWithEmailAndPassword(auth, values.email, values.password)
              .then(() => {
                // Signed in
                navigate("/");
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setError("Giriş bilgilerini kontrol ediniz.");
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
              </div>
              <div className=' flex flex-col'>
                <Field
                  className='bg-stone-900 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-gray-200 focus:border-mor transition-all'
                  type='password'
                  name='password'
                  placeholder='Şifre'
                />
                <ErrorMessage
                  className='text-mor mt-3 '
                  name='password'
                  component='div'
                />
              </div>
                <span className='text-mor mt-4'>{error}</span>
              <div className="flex gap-1">
                <Link to='/Resetpass' className='text-mor underline '>
                  Şifremi Unuttum
                </Link>
                <span className="text-gray-400 cursor-default select-none">/</span>
                <Link to='/Register' className='text-mor underline'>Kayıt Ol</Link>
              </div>
              <button
                className='bg-mor w-36 md:w-72 ml-auto mr-auto py-4 hover:bg-mor transition-all'
                type='submit'
                disabled={isSubmitting}
              >
                Giriş Yap
              </button>
            </Form>
          )}
        </Formik>
        {/* <div className='flex items-center justify-center flex-col gap-5'>
                      <button className='h-10 flex w-80 bg-blue-900 py-3 text-white px-1 items-center justify-center'>
                        <img className="w-5 mr-4" src={facebook} alt="facebook" />
                        <span>Facebook ile hesabınzı oluşturun</span>
                      </button>
                      <button className='h-10 flex w-80 bg-blue-900 py-3 text-white px-1 items-center justify-center'>
                        <img className="w-5 mr-6" src={google} alt="facebook" />
                        <span>Google+ ile hesabınzı oluşturun</span>
                      </button>
                    </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
