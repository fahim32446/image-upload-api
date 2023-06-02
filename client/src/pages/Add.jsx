import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    price: '',
    covers: [], // Change to an array
  });
  

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (event) => {
    const files = event.target.files;
    setFormData((prevState) => ({ ...prevState, covers: [...files] }));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const fData = new FormData();
      fData.append('title', formData.title);
      fData.append('desc', formData.desc);
      fData.append('price', formData.price);
  
      for (let i = 0; i < formData.covers?.length; i++) {
        fData.append('covers', formData.covers[i]);
      }

      console.log({fData});
  
      await axios.post('http://localhost:8000/books', fData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto my-8">
      <h1 className="text-center text-3xl font-bold mb-4">Add New Book</h1>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
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
            value={formData.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter price"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cover" className="block text-gray-700 font-bold mb-2">
            Cover Photo
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cover"
            type="file"
            name="covers"
            accept="image/*"
            multiple 
            onChange={handlePhotoUpload}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
