'use server'
import prisma from "@/lib/prisma"
import {  currentUser } from "@clerk/nextjs/server";


export async function createWebsite(eventData){
    const user = await currentUser()
    const userId = user.firstName
    console.log("UserId " + userId)
    if(!user){
        throw new Error('User not found');
    }
    try {
        const {name} = eventData
        const newWebsite= await prisma.website.create({
            data: {
                name, userId
            }
        })
        return newWebsite
    } catch (error) {
        console.log("Error creating website:", error);
        throw new Error('Error: ' + error.message); // Throw the actual error message
    }
}