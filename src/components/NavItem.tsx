import { useStore } from "@nanostores/react";
import { isMenuOpen } from "../menuStore";
import { useEffect, useState } from "react";

interface Props {
    url: string;
    title: string;
}

function NavItem({url, title}: Props) {
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    return ( 
        <li className="">
            <a href={url} className={`${currentPath == url ? 'text-mars-red' : 'text-star-white' }`}>
                {title}
            </a> 
        </li>

     );
}

export default NavItem;