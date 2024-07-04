"use client"

import { IEvent } from '@/lib/database/models/event.model'
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'

const CheckoutButton = ({ event , driveLink }: { event: IEvent , driveLink:  string}) => {
    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string;
    const hasEventFinished = new Date(event.endDateTime) < new Date();

    return (
        <div className="flex items-center gap-3">
            {hasEventFinished ? (
                <p className="p-2 text-red-400">Sorry, tickets are no longer available.</p>
            ): (
                <>
                    <SignedOut>
                        <SignInButton>
                            <Button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                Get Tickets
                            </Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <a href={driveLink} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                Buy Tickets
                            </Button>
                        </a>
                    </SignedIn>
                </>
                )}
        </div>
    )
}

export default CheckoutButton