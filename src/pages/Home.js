import React from "react";
import { useEffect, useState } from "react";
import CompanyDetails from "../components/CompanyDetails";
import CreateCompanyForm from "../components/CreateCompanyForm";
import useSession from "../hooks/useSession";

const Home = () => {
  const [companies, setCompanies] = useState(null);

  const session=useSession()
  console.log(session)

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_MONGODB_URL_SERVER}/companies`
      );
      const data = await res.json();

      if (res.ok) {
        setCompanies(data);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      <h2 className="mt-20 p-3">Lista Aziende</h2>
      <br></br>
      <div className="companies grid grid-cols-1 sm:grid-cols-2 w-full">
        {companies &&
          companies.companies.map((company) => {
            return <CompanyDetails key={company._id} company={company} />;
          })}
      </div>
      <CreateCompanyForm />
    </div>
  );
};

export default Home;
