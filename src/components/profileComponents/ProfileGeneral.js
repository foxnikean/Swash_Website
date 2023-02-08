import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ProfileGeneral = () => {
  return (
    <div>
         <Formik
          initialValues={{ email: "", cell: "", fullname: "" }}
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

          }}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col mt-12 gap-8 w-full items-center justify-center'>
              <div className=' '>
                <Field
                  className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-gray-200 focus:border-backgroundColor transition-all'
                  type='text'
                  name='fullname'
                  placeholder='Ad Soyad'
                />
                <ErrorMessage
                  className='text-mor mt-3'
                  name='fullname'
                  component='div'
                />
              </div>
              <div className=' '>
                <Field
                  className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-gray-200 focus:border-backgroundColor transition-all'
                  type='email'
                  name='email'
                  placeholder='E-Posta'
                />
                <ErrorMessage
                  className='text-white mt-3'
                  name='email'
                  component='div'
                />
              </div>
              <div className='flex flex-col items-center '>
                <Field
                  className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-gray-200 focus:border-backgroundColor transition-all'
                  type='number'
                  name='cell'
                  placeholder='Telefon Numarası'
                />
                <ErrorMessage
                  className='text-mor mt-3 whitespace-normal'
                  name='cell'
                  component='div'
                />
              </div>
              <button
                className='bg-white text-mor w-36 md:w-72 ml-auto mr-auto py-4 hover:bg-stone-200 transition-all'
                type='submit'
                disabled={isSubmitting}
              >
                 Bilgileri Güncelle
              </button>
            </Form>
          )}
        </Formik>
    </div>
  );
};

export default ProfileGeneral;
