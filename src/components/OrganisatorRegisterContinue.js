import React from "react";
import { useEffect, useState } from "react";
import { storage } from "../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useAuthentication from "../utils/hooks/UseAuthHook";
import { updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { flushSync } from "react-dom";

const OrganisatorRegisterContinue = () => {
  const [file, setFile] = useState(""); // progress
  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  const [url, setUrl] = useState(""); // Handle file upload event and update state
  const { user } = useAuthentication();
  const navigate = useNavigate();

  
  function handleChange(event) {
    setFile(event.target.files[0]);
    console.log("first function end");
  }
  const handleUpload = () => {
    if (!file) {
      alert("Lütfen önce bir resim ekleyin.");
    }
    const storageRef = ref(storage, `/users/${user.uid}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
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
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          updateProfile(auth.currentUser, {
            logoURL: url,
          })
            .then(() => {
              console.log("pp added");
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          setUrl(url);
          alert("Profile resminiz eklendi, teşekkürler!");
        });
      }
    );
  };

  return (
    user ?  
    <div className='bg-black text-white flex flex-col items-center justify-center h-screen '>
      <h3 className='text-white font-bold text-5xl'>Kaydolun</h3>
      <div className='flex flex-col mt-12 items-center'>
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            className='w-48 h-48 my-12 rounded-full border-2 border-mor'
          />
        ) : (
          <label
            className='rounded-full border-4 bg-gray-400 w-48 h-48 my-12 flex items-center justify-center text-9xl cursor-pointer'
            htmlFor='image'
          >
            <IoIosAdd />
          </label>
        )}
        <input
          id='image'
          type='file'
          onChange={handleChange}
          className='opacity-0 w-0 h-0'
          accept='/image/*'
        />

        <span className='font-semibold text-xl'>Firma Logosu Ekleyin</span>
      </div>

      {file ? (
        <button
          className='bg-mor text-black px-16 py-4 font-semibold hover:bg-cyan-400 rounded-sm transition-all mt-5'
          onClick={handleUpload}
        >
          Resmi Yükle
        </button>
      ) : null}


      <Link className=' text-gray-500 mt-5 underline' to={`/OrganisatorProfile/${user.displayName}`}>
        Atla
      </Link>
    </div>: <div>Loading</div>
  );
};

export default OrganisatorRegisterContinue;
