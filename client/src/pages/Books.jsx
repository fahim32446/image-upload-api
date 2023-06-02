import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [url, setUrl] = useState();

  console.log(books);

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get('http://localhost:8000/books');
      console.log({ res });
      setBooks(res.data.data);
      setUrl(res.data.queryParams[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      await axios.delete('http://localhost:8000/books/' + bookId);
      fetchAllBooks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">My Book Collection</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            <Link to={'/add'}>Add New Book</Link>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((item, index) => (
            <div className="bg-white shadow-md rounded-md" key={index}>
              <img
                src={`http://${url}/uploads/${item.cover}`}
                alt="Book Image"
                className="rounded-t-md"
              />
              <div className="p-6">
                <h2 className="text-lg font-bold mb-2">{item.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                <h5 className="text-lg font-bold text-blue-500">
                  ${item.price}
                </h5>
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

export default Books;
