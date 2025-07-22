import { useStore } from "@nanostores/react";
import { isMenuOpen } from "../menuStore";
import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";

function Sidebar() {
    const $isMenuOpen = useStore(isMenuOpen);

    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    return (
        <aside className={` h-svh 
                    bg-blue-black
                    text-white 
                    flex flex-col
                    translate-x-0
                    transition-all
                    duration-500
                    shadow-md
                    z-20
                    `}>
            <nav className="h-full flex flex-col justify-center items-center">
                <ul className="flex flex-col justify-center h-full text-4xl gap-5 text-cText">
                    <SidebarItem 
                        href="/home" 
                        title="Inicio" 
                        currentPath={currentPath} 
                    />
                    <SidebarItem href="/about" title="Acerca de" currentPath={currentPath} />
                    <SidebarItem href="/projects" title="Proyectos" currentPath={currentPath} />
                    <SidebarItem href="/contact" title="Contacto" currentPath={currentPath} />
                </ul>
            </nav>
            <footer className="flex flex-row justify-center items-center w-full py-8">
                <span className="font-semibold text-cosmic-pink">Leeroy Garcia all rights reserved </span>
            </footer>
        </aside>
      );
}

export default Sidebar;