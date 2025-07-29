import { useEffect } from "react";
import { useLocation } from '@tanstack/react-router';

export function PageScrollToTop(){
    // SCROLLS TO TOP OF PAGE AFTER NAVIGATION 
    const location = useLocation()
    const pathname = location.pathname

    useEffect(()=>{
        window.scrollTo(0, 0);

    },[pathname])

    return null;

}