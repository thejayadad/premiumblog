'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input, Button, Spinner } from '@nextui-org/react';
import { FiArrowUpCircle, FiTrash, FiUploadCloud } from 'react-icons/fi';
import ImageUpload from './image-upload';
import { toast, Toaster } from 'react-hot-toast';
import { updateHero } from '@/lib/actions/hero/update-hero';
import { useRouter } from 'next/navigation';

// Validation schema using Yup
const schema = yup.object().shape({
  label: yup.string().required('Hero Title is required'),
  imageUrl: yup.string().required('Image URL is required'),
});

const HeroForm = ({ initialData, id }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      label: initialData?.label || '',
      imageUrl: initialData?.imageUrl || '',
    },
  });

  const [loading, setLoading] = useState(false);
  const imageUrl = watch('imageUrl'); // Get imageUrl from form values
  console.log("Initidata " + initialData.websiteId)
  const router = useRouter()
  const handleUpload = (url) => {
    setValue('imageUrl', url); // Set the uploaded image URL to the form field
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateHero({ ...data, id: id, websiteId: initialData.websiteId });
      toast.success('Hero updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      router.push("/")
    } catch (error) {
      console.error('Error updating hero:', error);
      toast.error('Error updating hero', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className='mt-6 border bg-liteGrey rounded-md p-4'>
    <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
      <input type='hidden' id='websiteId' name='websiteId' defaultValue={initialData.websiteId} />
      <input type='hidden' id='id' name='id' defaultValue={id} />
      <div className='flex items-center mt-4'>
        <Input
          type='text'
          label='Hero Title'
          {...register('label')}
          error={errors.label?.message}
          disabled={isSubmitting}
        />
      </div>
      <div className='mt-2'>
        <ImageUpload
          disabled={isSubmitting}
          defaultValues={watch('imageUrl') ? [watch('imageUrl')] : []}
          onChange={(url) => setValue('imageUrl', url)}
          setImageUrl={(url) => setValue('imageUrl', url)}
        />
      </div>
      <Button
        isIconOnly color="warning"
        className='text-white'
        type='submit' loading={isSubmitting}>
        {isSubmitting ? <Spinner color="warning"/> : <FiArrowUpCircle className='h-4 w-4' />}
      </Button>
    </form>
    <Toaster />
  </div>
  );
};

export default HeroForm;
