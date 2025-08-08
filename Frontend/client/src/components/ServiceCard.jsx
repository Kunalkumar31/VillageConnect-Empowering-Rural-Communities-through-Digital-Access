import { useEffect, useState } from 'react';
import API from '../api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get('/services')
      .then(res => setServices(res.data))
      .catch(err => {
        console.error("API Error:", err);
        setError("Failed to load services.");
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Available Services</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {services.length === 0 && !error ? (
        <p>No services found.</p>
      ) : (
        <ul>
          {services.map(service => (
            <li key={service._id} className="border p-2 mb-2">{service.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
