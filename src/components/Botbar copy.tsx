// ---
import { useEffect, useState } from "react";
import NavItem from "./NavItem";

const routes = [
    {
        url: '/',
        title: 'Inicio'
    },
    {
        url: '/about',
        title: 'Acerca'
    },
    {
        url: '/projects',
        title: 'Proyectos'
    },
]
// ---


function Botbar() {
    const [isVisible, setIsVisible] = useState(true); // Estado para controlar la visibilidad del header
    const [lastScrollTop, setLastScrollTop] = useState(0); // Estado para guardar el último scroll
    
    console.log("🚀 ~ Botbar ~ isVisible:", isVisible)
    useEffect(() => {
        const handleScroll = () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop) {
            // Si hace scroll hacia abajo
            console.log('arriba');
            
            setIsVisible(false);
            // setTimeout(() => {
            //     setIsVisible(true);
            // }, 3000)
        } else {
            // Si hace scroll hacia arriba
            console.log('arriba2');
            setIsVisible(true);
        }

        setLastScrollTop(currentScrollTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll); // Limpia el evento al desmontar el componente
        };
    }, [lastScrollTop]); 

    return ( 
    <div className={`fixed  ${isVisible ? 'bottom-0' : '-bottom-20'} flex flex-row justify-center items-center w-svw p-4 z-10 bg-transparent transition-all`}>
        <nav className="w-full h-10  rounded-full text-black shadow-xl z-20  backdrop-blur-3xl ">
            <ul className="flex flex-row justify-evenly items-center h-full w-full font-semibold">
                {routes.map( r => <NavItem url={r.url} title={r.title} />)}
            </ul>
        </nav>
    </div>
     );
}

export default Botbar;