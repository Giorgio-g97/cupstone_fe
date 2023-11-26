import React from "react";
import { useNavigate, useNavigationType } from "react-router-dom";

const CompanyDetails = ({ company }) => {

  const navigate = useNavigate()

    const delCompanies = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_MONGODB_URL_SERVER}/companies/delete/${company._id}`, {
          method: "DELETE"
        }
      );
      const data = await res.json();
      navigate(0)
    };

  return (
    <div className="w-[350px] bg-slate-50 drop-shadow-lg rounded-lg mx-8 p-5 flex justify-between">
      <div className="flex">
        <div>
          <img className="rounded-full w-20 sm: w-10" src={company.cover} />
        </div>
        <div className="mx-2 sm: text-sm">
          <p key={company._id}>Nome/Rag. Sociale: {company.nome}</p>
          <p key={company._id}>Codice Fiscale: {company.codiceFiscale}</p>
          <p key={company._id}>P. IVA: {company.pIva}</p>
        </div>
      </div>
      <div>
        <button onClick={delCompanies} className="w-20 text-black rounded-md bg-red-500 sm: text-sm">Elimina</button>
      </div>
    </div>
  );
};

export default CompanyDetails;
