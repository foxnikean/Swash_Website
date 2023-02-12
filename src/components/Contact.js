import React from "react";
import Navbar from "./Navbar";
import { IoIosMail } from "react-icons/io";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Map from "./Map";
const Contact = () => {
  return (
    <div className='bg-backgroundColor  min-h-screen'>
      <Navbar />
      <div className='text-white container mx-auto px-48 w-full'>
        <h3 className='text-white text-3xl font-semibold'>İletişim</h3>
        <div className='mt-20 flex items-center justify-between w-full'>
          <div className='flex flex-col gap-10'>
            <span className='font-bold text-2xl'>Adres</span>
            <span className='capitalize'>
              ATATÜRK MAH. ERTUĞRUL GAZİ SK <br /> METROPOL ISTANBUL SİTESİ{" "}
              <br /> C1 BLOK NO: 2B İÇ KAPI NO: 376 <br /> ATAŞEHİR / İSTANBUL
            </span>
            <span className='text-2xl flex gap-5 items-center'>
              <IoIosMail className='text-2xl' /> destek@swashticket.com
            </span>
            <div >
              <Map/>
            </div>
          </div>
          <div className="w-2/4">
            <Formik
              initialValues={{ email: "", cell: "", fullname: "", message:"" }}
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
              onSubmit={(values, { setSubmitting }) => {}}
            >
              {({ isSubmitting }) => (
                <Form className='flex flex-col mt-12 gap-8 w-full items-center justify-center'>
                  <div className=' w-full'>
                    <Field
                      className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                      type='username'
                      name='fullname'
                      placeholder='Ad Soyad'
                    />
                    <ErrorMessage
                      className='text-mor mt-3'
                      name='username'
                      component='div'
                    />
                  </div>
                  <div className=' w-full'>
                    <Field
                      className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
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
                  <div className='flex flex-col items-center w-full'>
                    <Field
                      className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                      type='number'
                      name='cell'
                      placeholder='Cep Telefonu'
                    />
                  </div>
                  <div className='flex flex-col items-center w-full'>
                    <Field
                      className='bg-slate-300 bg-opacity-10 h-36  border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                      as='textarea'
                      name='message'
                      placeholder='Mesajınız'
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
                     Gönder
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
