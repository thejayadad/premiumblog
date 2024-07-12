'use server'
import prisma from "@/lib/prisma"
import {  currentUser } from "@clerk/nextjs/server";


export async function updateWebsite(eventData) {
    const user = await currentUser()
    const userId = user.firstName
    console.log("UserId " + userId)
    const { websiteId, name } = eventData;
    if(!user){
        throw new Error('User not found');
    }
    try {
        const updatedWebsite = await prisma.website.update({
            where: {
                id: websiteId
            },
            data: {
                name: name
            }
        })
        return updatedWebsite
    } catch (error) {
        console.log("Error Update Website " + error)
    }
}