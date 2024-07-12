'use server'
// update-hero.js
import prisma from '@/lib/prisma';
import {  currentUser } from "@clerk/nextjs/server";


export async function updateHero(eventData) {
  const user = await currentUser();
  const userId = user.firstName;
  console.log("UserId " + userId);
  
  const { label, imageUrl, websiteId, id } = eventData;

  if (!user) {
    throw new Error('User not found');
  }

  try {
    const updatedHero = await prisma.hero.update({
      where: { id: id },
      data: {
        label: label,
        imageUrl: imageUrl,
        websiteId: websiteId
      }
    });

    return updatedHero;
  } catch (error) {
    console.error('Error Update hero', error);
    throw new Error('Failed to update hero');
  }
}
