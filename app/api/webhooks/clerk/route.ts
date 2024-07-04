import { Webhook } from 'svix'
import { headers } from 'next/headers'
import {clerkClient, WebhookEvent} from '@clerk/nextjs/server'
import {createUser, deleteUser, updateUser} from "@/lib/actions/user.action";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    console.log('Webhook endpoint hit')

    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        console.error('WEBHOOK_SECRET is not defined')
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    console.log('WEBHOOK_SECRET is defined')

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error('Missing svix headers')
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }



    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhooks:', err);
        return new Response('Error occured', {
            status: 400
        })
    }

    console.log('Received webhook event:', evt.type, evt.data)

    // Do something with the payload
    // For this guide, you simply log the payload to the console
    const { id } = evt.data;
    const eventType = evt.type;
    if(eventType === 'user.created') {
        const {id, email_addresses, image_url, first_name, last_name, username } = evt.data;
        const user = {
            clerkId: id,
            email: email_addresses[0].email_address,
            username: username!,
            firstName: first_name!,
            lastName: last_name!,
            photo: image_url,

        }

        console.log('Creating user with data:', user)
        const newUser = await createUser(user);
        console.log('User created:', newUser)
        if(newUser) {
            await clerkClient.users.updateUserMetadata(id, {
                publicMetadata: {
                    userId: newUser._id
                }
            })
        }

        return NextResponse.json({ message: 'OK', user: newUser })
    }

    if (eventType === 'user.updated') {
        const {id, image_url, first_name, last_name, username } = evt.data

        const user = {
            firstName: first_name!,
            lastName: last_name!,
            username: username!,
            photo: image_url,
        }

        const updatedUser = await updateUser(id, user)

        return NextResponse.json({ message: 'OK', user: updatedUser })
    }

    if (eventType === 'user.deleted') {
        const { id } = evt.data

        const deletedUser = await deleteUser(id!)

        return NextResponse.json({ message: 'OK', user: deletedUser })
    }

    return new Response('', { status: 200 })
}