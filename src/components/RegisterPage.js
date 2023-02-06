import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className=' bg-black min-h-screen min-w-screen '>
      <div className='container flex-col flex  items-center justify-center min-h-screen min-w-full'>
        <h3 className='text-white font-bold text-5xl'> Kaydolun </h3>
        <Formik
          initialValues={{ email: "", password: "", username: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Gerekli";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Geçersiz e-posta adresi";
            }
            if (!values.password) {
              errors.password = "Gerekli";
            } else if (
              !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(
                values.password
              )
            ) {
              errors.password =
                "Şifre en az 8 karakter, en az bir büyük harf, en az bir küçük harf ve en az bir numara içermelidir.";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            createUserWithEmailAndPassword(auth, values.email, values.password)
              .then(() => {
                updateProfile(auth.currentUser, {
                  displayName: values.username,
                })
                  .then(() => {
                    // Profile updated!
                    navigate("/AddProfilePic");
                    // ...
                  })
                  .catch((error) => {
                    // An error occurred
                    // ...
                  });
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col mt-12 gap-8 w-full items-center justify-center'>
              <div className=' '>
                <Field
                  className='bg-stone-900 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-gray-200 focus:border-mor transition-all'
                  type='username'
                  name='username'
                  placeholder='Kullanıcı Adı'
                />
                <ErrorMessage
                  className='text-mor mt-3'
                  name='username'
                  component='div'
                />
              </div>
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
              <div className='flex flex-col items-center '>
                <Field
                  className='bg-stone-900 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-gray-200 focus:border-mor transition-all'
                  type='password'
                  name='password'
                  placeholder='Şifre'
                />
                <ErrorMessage
                  className='text-mor mt-3 whitespace-normal'
                  name='password'
                  component='div'
                />
              </div>
              <button
                className='bg-mor text-white w-36 md:w-72 ml-auto mr-auto py-4 hover:bg-mor transition-all'
                type='submit'
                disabled={isSubmitting}
              >
                Kayıt Ol
              </button>
            </Form>
          )}
        </Formik>
        <span className='text-white mt-7 text-lg '>
          Zaten üye misiniz ?
          <Link to='/Login' className='text-mor underline ml-2'>
            Giriş Yapın
          </Link>
        </span>
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
