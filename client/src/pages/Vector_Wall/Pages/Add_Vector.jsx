import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostVectorMutation } from '../Endpoints/vector_endpoints';

const Add_Vector = () => {
  const [postImg, { isSuccess }] = usePostVectorMutation();

  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    price: '',
    covers: [],
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
    const filesArr = Array.from(event.target.files);
    const files = event.target.files;
    setFormData((prevState) => ({ ...prevState, covers: [...files] }));

    const uploadedImages = filesArr.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  // {******OLD CODE --- (DON'T REMOVE)*************}
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const fData = new FormData();
  //     fData.append('title', formData.title);
  //     fData.append('desc', formData.desc);
  //     fData.append('price', formData.price);

  //     for (let i = 0; i < formData.covers?.length; i++) {
  //       fData.append('covers', formData.covers[i]);
  //     }

  //     console.log({ fData });

  //     await axios.post('http://localhost:8000/v1/api/vector', fData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });

  //     // navigate('/');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const fData = new FormData();
      fData.append('title', formData.title);
      for (let i = 0; i < formData.covers?.length; i++) {
        fData.append('covers', formData.covers[i]);
      }
      await postImg(fData);
      // navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mx-auto my-8">
      <h1 className="text-center text-xl font-bold shadow mb-5 py-3 rounded">
        Add New Vector Images
      </h1>
      <form encType="multipart/form-data" onSubmit={handleSubmit} className="">
        <div className="flex gap-5">
          <div className="flex-1 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
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
              <label
                htmlFor="cover"
                className="block text-gray-700 font-bold mb-2"
              >
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
                Add Image
              </button>
            </div>
          </div>

          <div className="flex-1 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <label className="block font-bold mb-1">Preview</label>
            <div className="grid grid-cols-4 gap-4 shadow">
              {images.length > 0 ? (
                images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Uploaded ${index}`}
                    className="w-[100px] h-[200px] object-cover rounded shadow"
                  />
                ))
              ) : (
                <div className="border border-gray-300 p-2 h-48 flex items-center justify-center">
                  No images selected
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add_Vector;
