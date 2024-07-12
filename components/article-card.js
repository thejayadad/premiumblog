// components/hero-list.js

import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';

const HeroList = ({ data }) => {
  return (
    <div className=''>
        <div className='flex items-center justify-between  mb-8 w-full'>
            <div className='w-36'>
                <Select
                label="Favorite Animal"
                placeholder="All"
                className="max-w-xs"
                >
                    <SelectItem>
                        Trash
                    </SelectItem>
                </Select>
            </div>
            <div>Manage</div>
        </div>
      {data.map((hero) => (
        <article key={hero.id} className='flex justify-between items-center p-2 border rounded-md cursor-pointer mb-2'>
          <div className='p-2 flex space-x-4'>
            <div>
              <img
                src={hero.imageUrl} // Display imageUrl from each hero object
                alt='Hero Image'
                height={100}
                width={80}
                className='bg-orange-200 rounded-md'
              />
            </div>
            <div flex flex-col>
              <p className='text-gray-400 font-light text-medium'>{hero.label}</p>
              <p className='text-gray-400 text-sm font-extralight'>{new Date(hero.createdAt).toLocaleDateString()}</p> {/* Display createdAt date */}
            </div>
          </div>
          <div>
            Action Items {/* Add action buttons or links */}
          </div>
        </article>
      ))}
    </div>
  );
};

export default HeroList;
