'use client'
// SettingsForm component on the client side

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HeadingText from '@/components/heading-text';
import { FiTrash, FiArrowUpCircle } from 'react-icons/fi';
import { Divider, Input, Button, Spinner } from '@nextui-org/react';
import { toast, Toaster } from 'react-hot-toast';
import { updateWebsite } from '@/lib/actions/website/update-website';
import { deleteWebsite } from '@/lib/actions/website/delete-website';
import ApiAlert from '@/components/api-update/api-alert';
import { useOrigin } from '@/lib/use-origin';
import { useParams } from 'next/navigation';

const schema = yup.object().shape({
  name: yup.string().required('Website name is required'),
});

const SettingsForm = ({ initialData }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });
const origin = useOrigin()
const params = useParams()
  const onSubmit = async (data) => {
    try {
      const { name } = data;
      const websiteId = initialData.id; // Assuming initialData.id contains the websiteId

      // Call updateWebsite function passing an object with websiteId and name
      await updateWebsite({ websiteId, name });
      
      // Show success notification using react-hot-toast
      toast.success('Website updated successfully', {
        icon: '🚀',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });

      // Refresh the page to reflect changes (you may consider using state management for more efficient updates)
      window.location.reload();
    } catch (error) {
      console.error('Error updating website:', error);
      // Handle error and show error notification if needed
      toast.error('Failed to update website');
    }
  };

  const onDelete = async () => {
    try {
      const websiteId = initialData.id; // Assuming initialData.id contains the websiteId

      // Call deleteWebsite function passing the websiteId
      await deleteWebsite({ websiteId });

      // Show deletion success notification
      toast.success('Website deleted successfully', {
        icon: '🗑️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });

      // Redirect to homepage after deletion
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting website:', error);
      // Handle error and show error notification if needed
      toast.error('Failed to delete website');
    }
  };

  return (
    <div className='w-full'>
      <div className='flex items-center w-full justify-between'>
        <HeadingText
          title={'Settings Page'}
          description={'Manage Website Settings'}
        />
        <Button 
        isIconOnly color="danger" 
        onClick={onDelete}>
          <FiTrash className='h-4 w-4' />
        </Button>
      </div>
      <Divider className='mt-8 mb-8' />
      <form className='space-y-4 w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-3 gap-8'>
          {/* Name Input */}
          <div className='col-span-3'>
            <span className='mt-8'>Website Name</span>
            <Input
              type='text'
              label='Website Name'
              {...register('name')}
              defaultValue={initialData.name}
              error={errors.name?.message}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
            )}
          </div>
        </div>
        {/* Submit Button */}
        <div className='flex justify-end'>
          <Button
           isIconOnly color="warning"
           className='text-white'
          type='submit' loading={isSubmitting}>
            {isSubmitting ? <Spinner color="warning"/> : <FiArrowUpCircle className='h-4 w-4' />}
          </Button>
        </div>
      </form>
      <Divider className='mb-8 mt-8' />
           
      <ApiAlert 
      title={'NEXT_PUBLIC_API_URL'}
      description={`${origin}/${params.websiteId}`}
      variant={'public'}
      />
      <Toaster />
    </div>
  );
};

export default SettingsForm;
