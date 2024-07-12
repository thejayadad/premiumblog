'use server'
import prisma from "@/lib/prisma"
import {  currentUser } from "@clerk/nextjs/server";


export const getAllIndividualWebsites = async () => {
    const user = await currentUser()
    const userId = user.firstName
    console.log("UserId " + userId)
    if(!user){
        throw new Error('User not found');
    }
    try {
        const websites = await prisma.website.findMany({
            where: {
                userId: userId
            }
        });

        return websites;
    } catch (error) {
        console.error('Error fetching websites:', error);
        throw new Error('Failed to fetch websites');
    }
}