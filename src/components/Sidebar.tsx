import { useStore } from "@nanostores/react";
import { isMenuOpen } from "../menuStore";
import { useEffect, useState } from "react";

function Sidebar() {
    const $isMenuOpen = useStore(isMenuOpen);

    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    return (
        <aside className={`fixed w-svw h-csidebar bg-sidebar 
                    flex flex-col top-14
                    ${$isMenuOpen ? 'translate-x-0' : '-translate-x-[100%]'} 
                    transition-all
                    duration-500
                    shadow-xl
                    z-20
                    `}>
            <nav className="h-[95%] flex flex-col justify-center items-center">
                <ul className="flex flex-col justify-center h-full text-4xl gap-5 text-cText">
                    <li className="bg-cAccent">
                        <a 
                            className={`${currentPath == '/' ? 'text-cAccent' : 'text-cText'}`} 
                            href="/"
                        >
                            <span className="">Inicio</span>
                        </a>
                    </li>
                    <li>
                        <a 
                            className={`${currentPath == '/about' ? 'text-cAccent' : 'text-cText'}`} 
                            href="/about"
                        > 
                            <span>Acerca de</span>
                        </a>
                    </li>
                    <li>
                        <a 
                            className={`${currentPath == '/projects' ? 'text-cAccent' : 'text-cText'}`} 
                            href="/projects"
                        >
                            <span className="">Proyectos</span>
                        </a>
                    </li>
                    <li>
                        <a 
                            className={`${currentPath == '/contact' ? 'text-cAccent' : 'text-cText'}`} 
                            href="/contact"
                        >
                            <span className="">Contacto</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <footer className="flex flex-row justify-center items-center w-full">
                <span className="text-cText">all rights reserved </span>
            </footer>
        </aside>
      );
}

export default Sidebar;