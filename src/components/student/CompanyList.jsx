import { useState, useEffect } from 'react';

export default function CompanyList() {
  const [page, setPage] = useState(1);
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async (page) => {
    const res = await fetch(`http://localhost:5000/api/companies?page=${page}`);
    const data = await res.json();
    setCompanies(data.data);
  };

  useEffect(() => {
    fetchCompanies(page);
  }, [page]);

  return (
    <div>
      <h2>Companies using Greenhouse</h2>
      <ul>
        {companies.map((company) => (
          <li key={company._id}>{company.company_name}</li>
        ))}
      </ul>

      <button onClick={() => setPage(p => Math.max(p - 1, 1))}>Previous</button>
      <button onClick={() => setPage(p => p + 1)}>Next</button>
    </div>
  );
}
