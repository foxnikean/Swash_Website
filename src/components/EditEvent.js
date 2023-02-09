import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { IoIosAdd, IoIosCalendar, IoIosPin } from "react-icons/io";
import partyex from "../assets/partyex.png";
import { DatePicker, TimeInput } from "@mantine/dates";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { storage } from "../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useAuthentication from "../utils/hooks/UseAuthHook";
import { updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import OrganisatorNavbar from "./OrganisatorNavbar"
import { useParams } from "react-router";

const EditEvent = () => {
  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState();
  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  const [url, setUrl] = useState(); // Handle file upload event and update state
  const { user } = useAuthentication();
  const [data, setData] = useState();
  const { id } = useParams();

  function handleChange(event) {
    setFile(event.target.files[0]);
    setFileUrl(URL.createObjectURL(file))
  }
  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }

    
    const storageRef = ref(storage, `/events/${uuidv4()}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        alert("Image Uploaded");
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setUrl(url);
        });
      }
    );
  };
  const handleClick = async () => {
    console.log(id.replace(/%/g, ''))
    const querySnapshot = await getDoc(
      doc(db, "events", id.replace(/%/g, ''))
    );
    const data = querySnapshot.data()
    console.log(data)
    setData(data)
  };
  useEffect(() => {
    handleClick();
  }, []);

  return (
    data ? 
    <div className='bg-backgroundColor min-w-screen min-h-screen flex flex-col '>
      <OrganisatorNavbar/>
      <div className='container mx-auto mt-12'>
        <div className='flex items-start gap-32 pb-24'>
          <Formik
            initialValues={{
              eventName: data.eventName,
              organisatorName: data.organisatorName,
              eventType: data.eventType,
              eventCat: data.eventCat,
              subEventCat: data.subEventCat,
              showVisitors: data.showVisitors,
              placeType: data.placeType,
              placeName: data.placeName,
              placeAddress: data.placeAddress,
              eventDate: data.eventDate,
              eventDesc: data.eventDesc,
              eventRules: data.eventRules,
              eventTime: data.eventTime,
              ticketName: data.ticketName,
              ticketDuration: data.ticketDuration,
              ticketPrice: data.ticketPrice,
              maxTicketAmount: data.maxTicketAmount,
              insta: data.insta,
              twitter: data.twitter,
              fb: data.fb,
              youtube: data.youtube,
              image: data.image,
            }}  
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setDoc(doc(db, `events`,"organisatorevents", auth.currentUser.uid, values.eventName), {
                eventName: values.eventName,
                organisatorName: values.organisatorName,
                eventType: values.eventType,
                eventCat: values.eventCat,
                subEventCat: values.subEventCat,
                showVisitors: values.showVisitors,
                placeType: values.placeType,
                placeName: values.placeName,
                placeAddress: values.placeAddress,
                eventDate: values.eventDate,
                eventDesc: values.eventDesc,
                eventTime: values.eventTime,
                eventRules: values.eventRules,
                ticketName: values.ticketName,
                ticketDuration: values.ticketDuration,
                ticketPrice: values.ticketPrice,
                maxTicketAmount: values.maxTicketAmount,
                insta: values.insta,
                twitter: values.twitter,
                fb: values.fb,
                youtube: values.youtube,
                image: url,
              });
            }}
          >
            {({ isSubmitting, values }) => (
              <Form className='flex flex-col gap-24 w-full justify-between'>
                <div className='flex w-full justify-center '>
                  <div className='text-white w-full flex flex-col gap-0.5 '>
                    <h2 className='text-2xl px-28 border-b-2 border-solid border-mor mb-8 text-center'>
                      Etkinlik Bilgileri
                    </h2>
                    <div className='flex gap-0.5 w-full '>
                      <div className='flex flex-col  w-full  items-center justify-center gap-0.5'>
                        <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4 rounded-tl-lg'>
                          <h4 className='text-2xl'> Etkinlik Adı: </h4>
                          <Field
                            className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                            type='text'
                            name='eventName'
                            placeholder='Etkinliğinizin ismini giriniz.'
                          />
                        </div>
                        <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4 '>
                          <h4 className='text-2xl'> Organizatör Adı: </h4>
                          <Field
                            className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                            type='text'
                            name='organisatorName'
                            placeholder='Düzenleyen ismini giriniz.'
                          />
                        </div>
                        <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4 rounded-bl-lg '>
                          <h4 className='text-2xl'> Etkinlik Türü: </h4>
                          <Field
                            className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                            as='select'
                            name='eventType'
                          >
                            <option value='fest'> Festival </option>
                            <option value='concert'> Konser </option>
                            <option value='party'> Party </option>
                          </Field>
                        </div>
                      </div>
                      <div className='flex flex-col  w-full items-center justify-center gap-0.5'>
                        <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4'>
                          <h4 className='text-2xl'> Kategori: </h4>
                          <Field
                            className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                            as='select'
                            name='eventCat'
                          >
                            <option value='music'> Müzik </option>
                            <option value='dance'> Dans </option>
                          </Field>
                        </div>
                        <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4 '>
                          <h4 className='text-2xl'> Alt Kategori: </h4>
                          <Field
                            className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                            as='select'
                            name='subEventCat'
                          >
                            <option value='alternative'>
                              Alternatif Müzik
                            </option>
                          </Field>
                        </div>
                        <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4  '>
                          <h4 className='text-2xl'> Katılımcı Görünümü: </h4>
                          <Field
                            className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                            as='select'
                            name='showVisitors'
                            placeholder=' Etkinliğinize uygun olanı seçiniz.'
                          >
                            <option value='public'> Herkes </option>
                            <option value='private'> Özel </option>
                            <option value='ticketOwners'>
                              Sadece Bilet Alanlar
                            </option>
                          </Field>
                        </div>
                      </div>
                      <div className='flex flex-col  w-full items-center justify-center gap-0.5'>
                        <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4 rounded-tr-lg'>
                          <h4 className='text-2xl'> Mekan Türü: </h4>
                          <Field
                            className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                            as='select'
                            name='placeType'
                            placeholder=' Etkinliğinize uygun olanı seçiniz.'
                          >
                            <option value='standart'>
                              Standart(Belirli düzen gereksinimleri olmayan
                              etkinlikler)
                            </option>
                            <option value='seated'>
                              Belirli Düzen(Oturma düzenine sahip olan
                              etkinlikler)
                            </option>
                          </Field>
                        </div>
                        <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4 '>
                          <h4 className='text-2xl'> Mekan İsmi: </h4>
                          <Field
                            className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                            type='text'
                            name='placeName'
                            placeholder=' Etkinliğin gerçekleşeceği mekanın adını yazınız.'
                          />
                        </div>
                        <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4 rounded-br-lg '>
                          <h4 className='text-2xl'> Mekan Adresi: </h4>
                          <Field
                            className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                            type='text'
                            name='placeAddress'
                            placeholder=' Etkinliğin gerçekleşeceği mekanın adresini yazınız.'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex w-full justify-center'>
                  <div className='text-white flex w-full flex-col gap-0.5'>
                    <div className='flex gap-0.5 w-full'>
                      <div className='flex flex-col  w-full items-center justify-center gap-0.5'>
                        <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4'>
                          <h4 className='text-2xl'> Etkinlik Tarihi </h4>
                          <Field
                            className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                            type='date'
                            name='eventDate'
                            placeholder=' Etkinliğinize uygun olanı seçiniz.'
                          />
                        </div>
                        <div className=' bg-mor bg-opacity-50 h-64 flex flex-col w-full px-4 py-4  '>
                          <h4 className='text-2xl'> Etkinlik Açıklaması </h4>
                          <Field
                            className='bg-transparent border-b-2 h-full border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                            as='textarea'
                            name='eventDesc'
                            placeholder=' Etkinliğinizin açıklamasını giriniz.'
                          />
                        </div>
                      </div>
                      <div className='flex flex-col  w-full items-center justify-center gap-0.5'>
                        <div className=' bg-mor bg-opacity-50  h-28 flex justify-center flex-col w-full px-4 '>
                          <h4 className='text-2xl'> Etkinlik Zamanı </h4>
                          <Field
                            className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none fill-white text-gray-200 focus:border-mor transition-all'
                            type='time'
                            name='eventTime'
                            required
                            pattern='\d{4}-\d{2}-\d{2}'
                          />
                        </div>
                        <div className=' bg-mor bg-opacity-50 h-64 flex justify-center flex-col w-full px-4 rounded-br-lg py-4'>
                          <h4 className='text-2xl'> Etkinlik Kuralları </h4>
                          <Field
                            className='bg-transparent h-full border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                            as='textarea'
                            name='eventRules'
                            placeholder=' Etkinliğinizin kurallarını giriniz.'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col items-center justify-center mt-20'>
                      <h2 className='text-2xl px-28 border-b-2 border-solid border-mor mb-8 text-center'>
                        Etkinlik Görseli
                      </h2>
                      <div className='flex mt-10 items-center justify-center w-full gap-3'>
                        <div className='flex w-full items-center justify-center flex-col'>
                          <label
                            htmlFor='image1'
                            className='w-2/3 h-72 flex items-center border  justify-center'
                          >
                            {file ? (
                              <img
                                className='w-full h-72 border '
                                src={URL.createObjectURL(file)}
                                alt=''
                              />
                            ) : (
                              <IoIosAdd />
                            )}
                          </label>
                          <input
                            className='invisible w-0'
                            id='image1'
                            onChange={handleChange}
                            type='file'
                            accept='/image/*'
                          />
                          <span
                            onClick={handleUpload}
                            className='cursor-pointer'
                          >
                            Resim Ekle
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-between items-end'>
                      <div className='mt-20 w-2/3'>
                        <h2 className='text-2xl px-28 border-b-2 border-solid border-mor mb-8 text-center'>
                          Etkinlik Biletleri
                        </h2>
                        <div className='flex w-full gap-0.5'>
                          <div className='w-full gap-0.5 flex flex-col'>
                            <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4'>
                              <h4 className='text-2xl'> Bilet Adı: </h4>
                              <Field
                                className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                                type='text'
                                name='ticketName'
                                placeholder=' Bilet uygun olan ismi yazınız.'
                              />
                            </div>
                            <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4'>
                              <h4 className='text-2xl'>
                                Biletin Satışta Kalma Süresi
                              </h4>
                              <Field
                                className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                                as='select'
                                name='ticketDuration'
                              >
                                <option value='end'>
                                  Etkinlik Bitene Kadar
                                </option>
                                <option value='start'>
                                  Etkinlik Başlayana Kadar
                                </option>
                                <option value='30'>
                                  Başlamaya 30 dk Kalaya Kadar
                                </option>
                                <option value='24'>24 saat Kalaya Kadar</option>
                              </Field>
                            </div>
                          </div>
                          <div className='w-full gap-0.5 flex flex-col'>
                            <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4'>
                              <h4 className='text-2xl'> Bilet Fiyatı: </h4>
                              <Field
                                className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                                type='number'
                                name='ticketPrice'
                                placeholder=' Etkinliğinize uygun olanı seçiniz.'
                              />
                            </div>
                            <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4'>
                              <h4 className='text-2xl'>
                                Alınabilir Maksimum Bilet Sayısı:
                              </h4>
                              <Field
                                className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                                type='number'
                                name='maxTicketAmount'
                                placeholder=' Bu Bilet Türünden Alınabilir Maksimum Bilet Sayısı'
                              />
                            </div>
                          </div>
                        </div>
                        <button className='flex items-center justify-center gap-2 mt-5 font-semibold text-xl'>
                          <IoIosAdd /> Bilet Ekle
                        </button>
                      </div>
                      <div className='  bg-white pb-3 w-1/5 rounded-3xl flex  flex-col gap-2 mx-4 select-none'>
                        {file ? (
                          <img
                            className=' mb-1 rounded-t-3xl h-44  pointer-events-none '
                            alt=''
                            src={URL.createObjectURL(file)}

                          />
                        ) : (
                          <img
                            className=' mb-1 rounded-t-3xl h-44  pointer-events-none '
                            alt=''
                            src={partyex}
                          />
                        )}

                        <span className='self-center font-medium text-xl '>
                          {values.eventName}
                        </span>
                        <div className='flex flex-col border-t-[1px] pt-3'>
                          <div className='text-black font-light text-lg flex gap-1 md:gap-3 ml-2 items-center justify-start'>
                            <IoIosPin /> {values.placeName}
                          </div>
                          <div className='text-black font-light text-lg flex gap-1 md:gap-3 ml-2 items-center justify-start'>
                            <IoIosCalendar /> {values.eventDate}{" "}
                            {values.eventTime}
                          </div>
                        </div>
                        <div className='flex items-center w-full  justify-center px-2'>
                          <button className=' bg-lightPurple  border-solid border-2 rounded-xl border-transparent  shadow-md shadow-mor  transition-all py-2 text-white w-full'>
                            <span className='font-semibold'>
                              {" "}
                              {values.ticketPrice} ₺
                            </span>
                            <span> 'den Başlayan Fiyatlarla </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-end justify-between'>
                      <div className='mt-20 w-2/3'>
                        <h2 className='text-2xl px-28 border-b-2 border-solid border-mor mb-8 text-center'>
                          Sosyal Medya
                        </h2>
                        <div className='flex w-full gap-0.5'>
                          <div className='w-full gap-0.5 flex flex-col'>
                            <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4'>
                              <h4 className='text-2xl'> Instagram Linki: </h4>
                              <Field
                                className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                                type='url'
                                name='insta'
                                placeholder=' Organizasyonunuzun Instagram Linki'
                              />
                            </div>
                            <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4'>
                              <h4 className='text-2xl'> Twitter Linki: </h4>
                              <Field
                                className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                                type='url'
                                name='twitter'
                                placeholder=' Organizasyonunuzun Twitter Linki'
                              />
                            </div>
                          </div>
                          <div className='w-full gap-0.5 flex flex-col'>
                            <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4'>
                              <h4 className='text-2xl'> Facebook Linki: </h4>
                              <Field
                                className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                                type='url'
                                name='fb'
                                placeholder='  Organizasyonunuzun Facebook Linki'
                              />
                            </div>
                            <div className=' bg-mor bg-opacity-50 h-28 flex justify-center flex-col w-full px-4'>
                              <h4 className='text-2xl'> Youtube Linki: </h4>
                              <Field
                                className='bg-transparent border-b-2 border-gray-300 border-solid p-2 w-full outline-none text-gray-200 focus:border-mor transition-all'
                                type='url'
                                name='youtube'
                                placeholder='  Organizasyonunuzun Youtube Linki'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className='font-bold border-b-2 border-mor w-36 text-2xl'
                        type='submit'
                        disabled={isSubmitting}
                      >
                        Oluştur
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div> : null
  );
};

export default EditEvent;
