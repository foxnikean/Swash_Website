import React, { useEffect, useState } from "react";
import useAuthentication from "../utils/hooks/UseAuthHook";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import Navbar from "./Navbar";
import OrganisatorNavbar from "./OrganisatorNavbar";

const OrganisatorProfile = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuthentication();
  const { id } = useParams();
  const handleClick = async () => {
    const querySnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
    const data = querySnapshot;
    if (data.exists()) {
      console.log("Document data:", data.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    handleClick();
  }, []);
  return (
    <div>
      <OrganisatorNavbar/>
      <div className='bg-backgroundColor min-h-screen py-20 px-48'>
        {user ? (
          <div className=' mx-auto flex-col container justify-between py-10 px-12 bg-mor bg-opacity-50 rounded-xl'>
            <div className='flex flex-wrap justify-between items-center w-full'>
              <div className='flex flex-col items-center gap-5 justify-between text-white text-xl'>
                <span className='capitalize font-bold'>{id}</span>
                <button className='bg-mor text-white px-5 py-2 rounded-lg'>
                  Şifre Değiştir
                </button>
                <span className=' border-b-2 w-full text-center'>
                  {user.displayName}
                </span>
                <img
                  src={user.photoURL}
                  className='w-32 h-32 rounded-full'
                  alt=''
                />
                <button className='bg-mor text-white px-5 py-2 rounded-lg'>
                  Logo Değiştir
                </button>
              </div>
              <div>
                <Formik
                  initialValues={{
                    email: user.email,
                    cell: "",
                    orgName: user.displayName,
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = "Gerekli";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Geçersiz e-posta adresi";
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    updateDoc(doc(db, `users`, user.uid), {
                      displayName: values.orgName,
                      email: values.email,
                    });
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className='flex flex-col mt-12 gap-8 w-full items-center justify-center'>
                      <span className='text-white text-xl border-b-2 w-full text-center'>
                        Hesap Bilgileri
                      </span>
                      <div>
                        <Field
                          className='bg-gray-100 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-black focus:border-mor transition-all'
                          type='username'
                          name='orgName'
                          placeholder='Organizatör Firma İsmi'
                        />
                      </div>
                      <div>
                        <Field
                          className='bg-gray-100 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-black focus:border-mor transition-all'
                          type='email'
                          name='email'
                          placeholder='E-Posta'
                        />
                      </div>
                      <div>
                        <Field
                          className='bg-gray-100 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-black focus:border-mor transition-all'
                          type='tel'
                          name='cell' 
                          placeholder='cellphone'
                        />
                      </div>
                      <button
                        className='bg-mor text-white w-36 md:w-72 ml-auto mr-auto py-4 hover:bg-mor transition-all'
                        type='submit'
                        disabled={isSubmitting}
                      >
                        Kaydet
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className='w-full flex gap-x-12 gap-y-4 items-center justify-between flex-wrap'>
              <Formik
                initialValues={{
                  address: user.email,
                  cell: "",
                  orgName: user.displayName,
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Gerekli";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Geçersiz e-posta adresi";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  updateDoc(doc(db, `users`, user.uid), {
                    displayName: values.orgName,
                    email: values.email,
                  });
                }}
              >
                {({ isSubmitting }) => (
                  <Form className='flex items-start justify-start flex-wrap mt-12 gap-8 w-full'>
                    <span className='text-white text-xl border-b-2 w-full text-center'>
                      Organizatör Firma Bilgileri
                    </span>
                    <div>
                      <Field
                        className='bg-gray-100 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-black focus:border-mor transition-all'
                        as="textarea"
                        name='websiteURL'
                        placeholder='Firma websitesi'
                      />
                    </div>
                    <div>
                      <Field
                        className='bg-gray-100 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-black focus:border-mor transition-all'
                        type='tel'
                        name='city'
                        placeholder='Organizatör Firma Şehir'
                      />
                    </div>
                    <div>
                      <Field
                        className='bg-gray-100 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-black focus:border-mor transition-all'
                        type='tel'
                        name='city'
                        placeholder='Organizatör Firma Şehir'
                      />
                    </div>
                    <div>
                      <Field
                        className='bg-gray-100 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-black focus:border-mor transition-all'
                        type='tel'
                        name='city'
                        placeholder='Organizatör Firma Şehir'
                      />
                    </div>
                    <div>
                      <Field
                        className='bg-gray-100 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-black focus:border-mor transition-all'
                        type='tel'
                        name='city'
                        placeholder='Organizatör Firma Şehir'
                      />
                    </div>
                    <button
                      className='bg-mor text-white w-36 h-16 text-center   md:w-72 ml-auto mr-auto py-4 hover:bg-mor transition-all'
                      type='submit'
                      disabled={isSubmitting}
                    >
                      Kaydet
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className='w-full flex gap-x-12 gap-y-4 items-center justify-between flex-wrap'>
              <Formik
                initialValues={{
                  address: user.email,
                  cell: "",
                  orgName: user.displayName,
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Gerekli";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Geçersiz e-posta adresi";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  updateDoc(doc(db, `users`, user.uid), {
                    displayName: values.orgName,
                    email: values.email,
                  });
                }}
              >
                {({ isSubmitting }) => (
                  <Form className='flex items-center justify-start flex-wrap mt-12 gap-8 w-full'>
                    <span className='text-white text-xl border-b-2 w-full text-center'>
                      Ödeme Bilgileri
                    </span>
                    <div>
                      <Field
                        className='bg-gray-100 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-black focus:border-mor transition-all'
                        type='address'
                        name='address'
                        placeholder='Organizatör Firma Adresi'
                      />
                    </div>
                    <div>
                      <Field
                        className='bg-gray-100 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-black focus:border-mor transition-all'
                        type='url'
                        name='websiteURL'
                        placeholder='Firma websitesi'
                      />
                    </div>
                    <div>
                      <Field
                        className='bg-gray-100 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-black focus:border-mor transition-all'
                        type='tel'
                        name='city'
                        placeholder='Organizatör Firma Şehir'
                      />
                    </div>
                    <div>
                      <Field
                        className='bg-gray-100 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-black focus:border-mor transition-all'
                        type='tel'
                        name='city'
                        placeholder='Organizatör Firma Şehir'
                      />
                    </div>
                    <div>
                      <Field
                        className='bg-gray-100 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-black focus:border-mor transition-all'
                        type='tel'
                        name='city'
                        placeholder='Organizatör Firma Şehir'
                      />
                    </div>
                    <div>
                      <Field
                        className='bg-gray-100 border-b-2 border-gray-300 border-solid p-2 w-64 md:w-80 lg:w-96 outline-none text-black focus:border-mor transition-all'
                        type='tel'
                        name='city'
                        placeholder='Organizatör Firma Şehir'
                      />
                    </div>
                    <button
                      className='bg-mor text-white w-36 h-16 text-center   md:w-72 ml-auto mr-auto py-4 hover:bg-mor transition-all'
                      type='submit'
                      disabled={isSubmitting}
                    >
                      Kaydet
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        ) : (
          <span>Loading</span>
        )}
      </div>
    </div>
  );
};

export default OrganisatorProfile;
