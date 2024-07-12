import { UserButton } from '@clerk/nextjs';
import MobileNav from './mobile-nav';
import {  currentUser,} from "@clerk/nextjs/server";
import prisma from '@/lib/prisma';
import WebsiteSwitch from './website-switch';

const DashNavbar = async () => {
  const user = await currentUser()
  if(!user){
  redirect("/sign-in")   
  }
  const userId = user.firstName
  const userWebsites = await prisma.website.findMany({
      where: {
        userId: userId,
      },
    });
  return (
    <header className='p-4 border-b h-full flex items-center justify-between bg-white shadow-sm'>
       <div className='flex space-x-4 justify-between items-center'>
            <MobileNav /> 
            <div className='w-32 md:hidden'>
        <WebsiteSwitch items={userWebsites} />
      </div> 
      </div> 
 
      <div className=''>
         <UserButton />
      </div>
    </header>
  );
};

export default DashNavbar;
