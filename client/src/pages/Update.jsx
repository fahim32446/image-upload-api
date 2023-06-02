import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [formData, setFormData] = useState({
    cover: '',
    title: '',
    desc: '',
    price: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    const fetchSingleBook = async () => {
      try {
        const res = await axios.get('http://localhost:8000/books/' + id);
        setFormData(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleBook();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      await axios.put('http://localhost:8000/books/' + id, formData);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <h1 className="text-center text-3xl font-bold mb-4">Update Books</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="cover" className="block text-gray-700 font-bold mb-2">
            Cover Image
          </label>
          <input
            type="text"
            required
            name="cover"
            value={formData.cover}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter cover image URL"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            name="desc"
            required
            value={formData.desc}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter description"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter price"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
