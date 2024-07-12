'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createWebsite } from '@/lib/actions/website/create-website';
import { Input, Button } from '@nextui-org/react';
import { Toaster, toast } from 'react-hot-toast';

const schema = yup.object().shape({
  name: yup.string().required('Website name is required'),
});

const CreateWebsiteForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const response = await createWebsite(data);
      toast.success('Website created successfully');
      window.location.assign(`/${response.id}`)
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span className='mb-2'>Name Your Website</span>
      <Input {...register('name')} placeholder="Website Name" />
      {errors.name && <span>{errors.name.message}</span>}
      <div className='pt-4 flex items-center justify-end'>
        <Button
          color='primary'
          className='mt-2'
          type="submit"
          disabled={isSubmitting || submitting} // Disable button when submitting
        >
          {submitting ? 'Creating...' : 'Continue'}
        </Button>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </form>
  );
};

export default CreateWebsiteForm;
