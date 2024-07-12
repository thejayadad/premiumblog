'use server'
import prisma from "@/lib/prisma"
import {  currentUser } from "@clerk/nextjs/server";



export async function deleteWebsite(eventData) {
    const user = await currentUser()
    const userId = user.firstName
    console.log("UserId " + userId)
    const { websiteId,  } = eventData;
    if(!user){
        throw new Error('User not found');
    }
    try {
        const deletedWebsite = await prisma.website.delete({
            where: {
                id: websiteId
            }
        })
        return deletedWebsite
    } catch (error) {
        console.log("Delete Website Error " + error)
    }
}