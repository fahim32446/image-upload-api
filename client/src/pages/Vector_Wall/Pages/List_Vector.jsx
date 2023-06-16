import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchAllBooksQuery } from '../Endpoints/vector_endpoints';

const List_Vector = () => {
  const [info, setInfo] = useState([]);
  const [url, setUrl] = useState();

  const { data, isSuccess } = useFetchAllBooksQuery();

  useEffect(() => {
    if (isSuccess) {
      setInfo(data?.data?.data);
      setUrl(data?.data?.queryParams[0]);
    }
  }, [data, isSuccess]);

  const handleDelete = async (bookId) => {
    try {
      await axios.delete('http://localhost:8000/v1/api/vector/' + bookId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-10">
          <h5 className="text-2xl font-bold">View All Vector Wallpaper</h5>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            <Link to={'/add-vector'}>Add New Wallpaper</Link>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {info?.map((item, index) => (
            <div className="bg-white shadow-md rounded-md" key={index}>
              <img
                src={`http://${url}/uploads/${item.image}`}
                alt="Book Image"
                className="rounded-t-md"
              />
              <div className="p-6">
                <h2 className="text-lg font-bold mb-2">{item.title}</h2>

                <div className="flex gap-1 justify-end">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-1 py-1 rounded text-[10px]">
                    <Link to={'/update/' + item.id}>Update</Link>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-1 py-1 rounded text-[10px]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List_Vector;
