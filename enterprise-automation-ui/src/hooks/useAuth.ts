import {useEffect} from 'react';
import { useAtom } from "jotai";
import { sessionAtom, accessTokenAtom, authStatusAtom } from "@/state/auth";
import { useSession } from "next-auth/react";

export function useAuth () {
    const {data: session, status} = useSession();

    const [authSession, setAuthSession] = useAtom(sessionAtom);
    const [authStatus, setAuthStatus] = useAtom(authStatusAtom);
    const [accessToken] = useAtom(accessTokenAtom);

    useEffect(() => {
        setAuthSession(session);
        setAuthStatus(status);
    }, [session, status, setAuthSession, setAuthStatus]);
  
  
    return {
        session: authSession,
        status: authStatus,
        accessToken,
    };
}

