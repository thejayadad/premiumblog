'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import { FiArrowDown } from 'react-icons/fi';


const WebsiteSwitch = ({items}) => {
    const params = useParams()
    const router = useRouter()
    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }))
    const currentWebsite = formattedItems.find((item) => item.value === params.websiteId)
    
    const onWebsiteSelect = (websiteId) => {
        router.push(`/${websiteId}`);
      };
  return (
//     <Popover placement="bottom">
//     <PopoverTrigger>
//       <Button
//       variant='light'
//       >{currentWebsite.label}</Button>
//     </PopoverTrigger>
//     <PopoverContent>
//       <div className="px-1 py-2 flex flex-col gap-1">
//         {items.map((website) => (
//           <Button
//             variant='light'
//             color='primary'
//             key={website.id}            
//             onClick={() => onWebsiteSelect(website.id)}
//             className="text-sm"
//           >
//             {website.name}
//           </Button>
//         ))}
//       </div>
//     </PopoverContent>
//   </Popover>

    <div>
    <Select
    placeholder={currentWebsite.label}
    disableSelectorIconRotation
    selectorIcon={<FiArrowDown />}
    >
        {items.map((website) =>(
            <SelectItem
            key={website.id}
            onClick={() => onWebsiteSelect(website.id)}
            >
                {website.name}
           </SelectItem>
        ))}

    </Select>
    </div>
  )
}

export default WebsiteSwitch