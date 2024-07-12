'use client'
import React, { useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, Pagination, TableCell } from "@nextui-org/react";
import { FiEdit, FiMoreHorizontal } from 'react-icons/fi';
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import { useParams, useRouter } from 'next/navigation';


const INITIAL_VISIBLE_COLUMNS = ["Image", "Label", "Date", "Actions"];
const rowsPerPage = 2; // Number of hero banners per page

const HeroList = ({ data }) => {
  const [page, setPage] = useState(1);

  // Calculate total number of pages based on data length and rowsPerPage
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Calculate the start and end index of items to display for the current page
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Slice the data array to get the items for the current page
  const itemsOnPage = data.slice(startIndex, endIndex);
  const router = useRouter()
  const params = useParams()
  return (
    <div className="flex flex-col gap-3">
      <Table aria-label="Hero Banners Table">
        <TableHeader>
          {INITIAL_VISIBLE_COLUMNS.map((column) => (
            <TableColumn key={column}>{column}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {itemsOnPage.map((hero) => (
            <TableRow key={hero.id}>
              <TableCell>
                <img
                  src={hero.imageUrl}
                  alt="Hero Image"
                  height={50}
                  width={50}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>{hero.label}</TableCell>
              <TableCell>{new Date(hero.createdAt).toLocaleDateString()}</TableCell>
              <TableCell
              >
                {/* Action Buttons or Links */}
                    <div className=''>
           
                  <Popover 
                  
                  placement="bottom" showArrow={true}>
                <PopoverTrigger>
                    <Button
                    variant='light'
                    className=''
                    >
                                 <FiMoreHorizontal
                className='h-4 w-4'
                />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="px-1 py-2">
                        <div className='flex items-center'>
                        <div className="text-tiny">
                            <Button
                            variant='light'
                            onClick={() => router.push(`/${params.websiteId}/hero/${hero.id}`)} // Corrected URL construction
                            >
                                <FiEdit className='h-4 w-4' />
                            </Button>
                        </div>
                        <div className="text-tiny">
                            Delete
                        </div>
                        </div>
                    </div>
                </PopoverContent>
                </Popover>
                    </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination component */}
      <div className="flex w-full justify-center mt-4">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={totalPages}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default HeroList;
