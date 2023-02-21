import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import { data } from '../CarouselComponent';

const ProfileForm = () => {

    const [userData,setUserData ] = useState([]);

    const handleClick = async () => {
        const querySnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
        const data = querySnapshot;
        if (data.exists()) {
          console.log("Document data:", data.data());
          setUserData(data.data())
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      };
      useEffect(() => {
        handleClick();
      }, []);
  return (
    <Formik
    initialValues={{name: userData.name, surname: userData.surname, cell: userData.cell, gender: userData.gender }}
    validate={(values) => {
      const errors = {};
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
        setDoc(doc(db,"users",auth.currentUser.uid ),{
            name:values.name,
            surname:values.surname,
            cellphone:values.cell,
            gender:values.gender
          }).then(() =>{
            console.log("succesfull database")
          })
            .catch((error) => {
              // An error occurred
              // ...
            });
    }}
  >
    {({ isSubmitting }) => (
      <Form className='flex flex-col pb-10 gap-8 w-full items-center justify-center -mt-24'>
        <div className='flex w-full gap-5'>
          <div className=' w-full'>
            <Field
              className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
              type='username'
              name='name'
              placeholder='Ad'
              value={userData.name}
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
              type='username'
              name='surname'
              placeholder='Soyad'
              value={userData.surname}
            />
            <ErrorMessage
              className='text-mor mt-3'
              name='email'
              component='div'
            />
          </div>
        </div>
        <div className='flex w-full gap-5'>
          <div className=' w-full'>
            <Field
              className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
              type='cell'
              name='cell'
              placeholder='Telefon Numarası'
              value={userData.cellphone}
            />
            <ErrorMessage
              className='text-mor mt-3'
              name='username'
              component='div'
            />
          </div>
          <div className=' w-full'>
            <Field
              className='bg-transparent pb-3 border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
              as='select'
              name='gender'
              value={userData.gender}
            >
              <option value="undefined">Belirtmek İstemiyorum</option>
              <option value="male">Erkek</option>
              <option value="female">Kadın</option>
            </Field>
            <ErrorMessage
              className='text-mor mt-3'
              name='email'
              component='div'
            />
          </div>
        </div>
        <button
          className='bg-mor  text-white justify-self-end self-end w-36 md:w-72 ml-auto mr-auto py-4 hover:bg-mor transition-all'
          type='submit'
          disabled={isSubmitting}
        >
          Kaydet
        </button>
      </Form>
    )}
  </Formik>
  )
}

export default ProfileForm