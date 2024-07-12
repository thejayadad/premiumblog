import { Snippet } from '@nextui-org/react';
import React from 'react';
import { FiServer, FiShield } from 'react-icons/fi';

const ApiAlert = ({ title, description, variant }) => {
  const badgeColor = variant === 'admin' ? 'bg-blue-500' : 'bg-green-500';
  const badgeText = variant === 'admin' ? 'Admin' : 'Public';

  return (
    <div className='bg-gray-100 p-4 rounded-md'>
      <div className='flex items-center space-x-2'>
        <FiServer className='h-4 w-4' />
        <div className='flex items-center gap-x-2'>
          {title}
        </div>
        <div className={`ml-auto py-1 px-2 text-xs rounded-md text-white ${badgeColor}`}>
          {badgeText}
        </div>
       </div>
      <div className='w-full mt-2'>
        <Snippet
        className='w-full'
        size='lg' symbol="#" variant="bordered">
          {description}
        </Snippet>
      </div>
    </div>
  );
};

export default ApiAlert;
