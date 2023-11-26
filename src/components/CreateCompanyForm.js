import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCompanyForm = () => {

  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  console.log(formData);

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // UPLOAD CLOUDINARY
  const uploadFile = async (cover) => {
    const fileData = new FormData();
    fileData.append("cover", cover);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_MONGODB_URL_SERVER}/companies/cloudUpload`,
        {
          method: "POST",
          body: fileData,
        }
      );
      return await res.json();
    } catch (error) {
      console.log(error, "Errore Uplaod File");
    }
  };

  // AL SUBMIT
  const onSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      // se file esiste
      try {
        const uploadCover = await uploadFile(file); //Upload del file
        const finalBody = {
          ...formData,
          cover: uploadCover.cover,
        };
        await axios.post(
          `${process.env.REACT_APP_MONGODB_URL_SERVER}/companies/create`,
          finalBody
        );
        navigate(0)
        console.log(finalBody);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("File obbligatorio");
    }
  };
  return (
    <form
      encType="multipart/form-data" //saprà che gestirà sia normali input che file
      onSubmit={onSubmit}
      className="create bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h3 className="sm: text-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        Aggiungi una nuova azienda
      </h3>

      <label className="sm: text-sm block text-gray-700 text-md font-bold mb-2">
        Nome Azienda/Rag. Sociale:
      </label>
      <input
        name="nome"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        onChange={handleInputChange} // Ogni input verrà registrato nello stato
        // ogni ripristino verrà registrato dallo stato in maniera bidirezionale
      />

      <label className="sm: text-sm block text-gray-700 text-md font-bold mb-2">
        Codice Fiscale:
      </label>
      <input
        name="codiceFiscale"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        onChange={handleInputChange}
      />

      <label className="sm: text-sm block text-gray-700 text-md font-bold mb-2">
        P. IVA:
      </label>
      <input
        name="pIva"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        onChange={handleInputChange}
      />

      <label className="sm: text-sm block text-gray-700 text-md font-bold mb-2">
        Carica Immagine Profilo Utente:
      </label>
      <input
        name="cover"
        className="sm: text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="file"
        onChange={handleFileChange}
      />

      <button
        type="submit"
        className="sm: text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Aggiungi Azienda
      </button>
    </form>
  );
};

export default CreateCompanyForm;
