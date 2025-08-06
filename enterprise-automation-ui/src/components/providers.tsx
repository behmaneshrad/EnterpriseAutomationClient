"use client";

import React, {ReactNode} from 'react';
import { SessionProvider } from 'next-auth/react';
import {Provider as JotaiProvider} from "jotai";
import Header from './Header';


const Providers = ({children} : {children: ReactNode}) => {
  return (
    <div>
      <SessionProvider>
        <JotaiProvider>
            <Header/>
        </JotaiProvider>
      </SessionProvider>
    </div>
  )
}

export default Providers
