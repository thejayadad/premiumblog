'use client'
// components/image-upload.js

import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React, { useRef } from 'react';
import { FiTrash2, FiUploadCloud } from 'react-icons/fi';

const ImageUpload = ({ disabled, onChange, setImageUrl, defaultValues }) => {
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'uploadsite'); // Replace with your Cloudinary upload preset

      try {
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/socialsite/image/upload', // Replace with your Cloudinary URL
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await res.json();
        const imageUrl = data.secure_url;
        onChange(imageUrl); // Pass updated image URL to parent component
        setImageUrl(imageUrl); // Update imageUrl state in parent component
      } catch (err) {
        console.error('Error uploading image', err);
      }
    }
  };

  const handleImageRemove = () => {
    setImageUrl(''); // Reset imageUrl state in parent component
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      {defaultValues && defaultValues.length > 0 && (
        <div className='mb-4 relative'>
          <div className='relative w-[500px] rounded-lg overflow-hidden'>
            <Image
              className='object-cover'
              alt='Uploaded Image'
              src={defaultValues[0]} // Display default image if available
              width={450}
              height={250}
            />
            <div className='absolute top-0 right-8 z-30'>
              <Button
             isIconOnly color="warning"
             className="bg-red-600" 
              variant='primary' onClick={handleImageRemove}>
                <FiTrash2 className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      )}
      <Button disabled={disabled} onClick={handleClick} className="px-4 py-2 rounded-md">
        <FiUploadCloud className='h-4 w-4' /> Upload Image
      </Button>
    </div>
  );
};

export default ImageUpload;
