import { useState } from "react";
import { storage } from "../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useAuthentication from "../utils/hooks/UseAuthHook";
import { updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
const AddProfilePic = () => {
  const [file, setFile] = useState(""); // progress
  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  const [url, setUrl] = useState(""); // Handle file upload event and update state
  const { user } = useAuthentication();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
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
            photoURL: url,
          })
            .then(() => {
              console.log("pp added");
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          setUrl(url);
        });
      }
    );
  };
  return (
    <div className='bg-black text-white flex flex-col items-center justify-center h-screen '>
      <h3 className='text-white font-bold text-5xl'>Kaydolun</h3>
      <div className='flex flex-col my-12 items-center'>
        {url ? (
          <img
            src={url}
            className='w-48 h-48 rounded-full border-2 border-neonBlue'
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
        <span className='font-semibold text-xl'>Profil Resmi Ekle</span>
        <span className='text-gray-500'>Zorunlu Değil*</span>
      </div>
      <button
        className='bg-neonBlue text-black px-16 py-4 font-semibold hover:bg-cyan-400 rounded-sm transition-all'
        onClick={handleUpload}
      >
        Resim Ekle
      </button>
      <Link className='mt-5 text-gray-500 underline' to='/'>Atla</Link>
    </div>
  );
};

export default AddProfilePic;
