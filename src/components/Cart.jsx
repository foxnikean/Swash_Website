import React from "react";
import { useLocation, useParams } from "react-router";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Navbar from "./Navbar";
const Cart = () => {
  const params = useLocation();
  const event = params.state.event;
  const sum = params.state.sum;
  let date = format(new Date(event.eventDate), "do PPPP", { locale: tr });
  date = date.split(".").pop();
  return (
    <div className='bg-backgroundColor min-h-screen'>
      <Navbar />
      <div className='flex mx-auto container w-full justify-between gap-64'>
        <Formik
          initialValues={{
            email: "",
            password: "",
            username: "",
            aggreements: "",
          }}
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
            if (!values.aggreements) {
              errors.aggreements =
                "Lütfen kayıt olmadan önce anlaşmaları kabul ediniz.";
            }
            return errors;
          }}
          // onSubmit={(values, { setSubmitting }) => {
          // }
        >
          {({ isSubmitting }) => (
            <Form className='flex  mt-12 gap-8 '>
              <div className='flex flex-col gap-8'>
                <div className='flex flex-col items-start justify-start'>
                  <Field
                    className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-gray-200 focus:border-mor transition-all'
                    type='username'
                    name='name'
                    placeholder=' Ad-Soyad'
                  />
                </div>
                <div className='flex flex-col items-start justify-start'>
                  <Field
                    className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-gray-200 focus:border-mor transition-all'
                    type='text'
                    name='country'
                    placeholder='Ülke'
                  />
                </div>
                <div className='flex flex-col items-center '>
                  <Field
                    className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-gray-200 focus:border-mor transition-all'
                    type='text'
                    name='Adres'
                    placeholder='Adres'
                  />
                </div>
                <div className='flex flex-col items-start justify-start'>
                  <Field
                    className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-gray-200 focus:border-mor transition-all'
                    type='mail'
                    name='mail'
                    placeholder='E-posta'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-8'>
                <div className='flex flex-col items-start justify-start'>
                  <Field
                    className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-gray-200 focus:border-mor transition-all'
                    type='text'
                    name='tcno'
                    placeholder='Kimlik No'
                  />
                </div>
                <div className='flex flex-col items-start justify-start'>
                  <Field
                    className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-gray-200 focus:border-mor transition-all'
                    type='text'
                    name='city'
                    placeholder='İl'
                  />
                </div>
                <div className='flex flex-col items-center '>
                  <Field
                    className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-gray-200 focus:border-mor transition-all'
                    type='cell'
                    name='cell'
                    placeholder='Cep Telefonu'
                  />
                </div>
                <div className='flex flex-col items-start justify-start'>
                  <Field
                    className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-gray-200 focus:border-mor transition-all'
                    type='number'
                    name='postcode'
                    placeholder='Posta Kodu'
                  />
                </div>
                <button
                  className='bg-mor text-white w-36 md:w-72 ml-auto mr-auto py-4 hover:bg-mor transition-all'
                  type='submit'
                  disabled={isSubmitting}
                >
                  Kaydet
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className='flex flex-col text-white'>
          <div className='flex flex-col gap-8'>
            <img src={event.image} className='' alt='' />
            <span className="text-2xl font-bold self-center">{event.eventName}</span>
            <div className="flex  justify-between text-2xl font-bold">
              <span>{date}</span>
              <span>{event.eventTime}</span>
            </div>
          </div>
          <div className="flex  justify-between text-2xl font-bold mt-16">
            <span>Ara Toplam : </span>
            <span>{sum} ₺</span>
          </div>
          <div className="flex  justify-between text-2xl font-bold mt-16">
            <span>KDV : </span>
            <span>{sum*18/100} ₺</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
