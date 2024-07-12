'use server'
import prisma from "@/lib/prisma";

export async function createHero(eventData) {
  const { label, imageUrl, websiteId } = eventData;

  try {

    // Create hero in database using Prisma
    const createdHero = await prisma.hero.create({
      data: {
        label: label,
        websiteId: websiteId,
        imageUrl: imageUrl,
      },
    });

    return createdHero;
  } catch (error) {
    console.error('Error creating hero:', error);
    throw new Error('Failed to create hero');
  }
}
