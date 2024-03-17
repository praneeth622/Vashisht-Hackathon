
import React from 'react';
import Navbar from'../components/navbar'
import Footer from '../components/footer'
import { useState } from 'react';

function Post() {

  const [formData, setFormData] = useState({
    name: '',
    cycleBrand: '',
    userPhoneNumber: '',
    userRollNumber: '',
    imageSrc: null,
    pricePerHrColour: '',
    cycleDescription: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming you have an endpoint to send this data to
    fetch('your-post-endpoint', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Reset form after successful submission
        setFormData({
          name: '',
          cycleBrand: '',
          userPhoneNumber: '',
          userRoomNo: '',
          imageSrc: '',
          pricePerHrColour: '',
          cycleDescription: '',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });}

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            imageSrc: file,
        });
    };

  return (
    <div>
        <Navbar />
        <div className="mx-auto max-w-lg py-14">
          <h2 className='ext-left text-2xl font-bold mb-4'>Enter the details to post your cycle</h2>
      <form onSubmit={handleSubmit} className="bg-white  px-4 pt-6 pb-8 mb-4 shadow appearance-none border rounded">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cycleBrand">
            Roll number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rollno"
            type="text"
            name="userRollNumber"
            value={formData.userRollNumber}
            onChange={handleChange}
            placeholder="Enter Roll Number"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cycleBrand">
            Phone Number
          </label>
          <input
            className="shadow border-0 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phoneNumber"
            type="number"
            name="userPhoneNumber"
            value={formData.userPhoneNumber}
            onChange={handleChange}
            placeholder="Enter cycle brand"
          />
        </div>

        <div className="mb-4 items-center space-x-6 flex">
          
          <label className="block text-gray-700 border-none text-sm font-bold mb-2" htmlFor="image" id="">
          Cycle Image
          </label>
          <input
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              id="cycleImage"
              type="file"
              name="imageSrc"
              accept="image/*"
              onChange={(e) => handleImageChange(e)} // Use a separate function for handling image change
          />
        </div>
        <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
        <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cycleBrand">
            Price Per Hour
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="num"
            name="pricePerHrColour"
            value={formData.pricePerHrColour}
            onChange={handleChange}
            placeholder='Price per hour'
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cycleBrand">
            Cycle Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            name="brandDescription"
            value={formData.brandDescription}
            onChange={handleChange}
            placeholder='Descrribe about your cycle'
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    <div>
      <Footer />
    </div>
    </div>
  );
}

export default Post;