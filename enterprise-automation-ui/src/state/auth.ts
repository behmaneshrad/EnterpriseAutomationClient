import React from 'react';
import { atom } from 'jotai';
import { Session } from 'next-auth';

// Atom for storing session information
export const sessionAtom = atom<Session | null>(null);
 
// Atom for storing accessToken
export const accessTokenAtom = atom<string | undefined>((get) => {
    const session = get(sessionAtom);
    return session?.accessToken;
});


// Atom for maintaining authentication status
export const authStatusAtom = atom<'loading' | 'authenticated' | 'unauthenticated'>('loading');
