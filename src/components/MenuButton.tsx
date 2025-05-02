import { useStore } from "@nanostores/react";
import { isMenuOpen } from "../menuStore";
import { Icon } from '@iconify-icon/react';
import { useEffect, useState } from "react";

function MenuButton () {
    // const $isMenuOpen = useStore(isMenuOpen);
    const [isDarkMode, setIsDarkMode] = useState(false);
    console.log("🚀 ~ MenuButton ~ isDarkMode:", isDarkMode)

    // const toggleMenu = () => isMenuOpen.set(!$isMenuOpen);
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
          setIsDarkMode(true);
          document.documentElement.classList.add('dark');
        } else {
          setIsDarkMode(false);
          document.documentElement.classList.remove('dark');
        }
      }, []);
    
      const toggleDarkMode = () => {
        if (isDarkMode) {
          setIsDarkMode(false);
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        } else {
          setIsDarkMode(true);
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
      };

    return (
        <button className={`relative group h-[35px] w-[35px] bg-transparent lg:hidden  overflow-hidden`} onClick={toggleDarkMode}>
            {
                // isDarkMode?
                // <Icon className="text-cPurple dark:text-white shadow-xl" icon="fa-solid:sun" width="1.8rem" height="1.8rem" />:
                // <Icon className="text-cPurple dark:text-white shadow-xl" icon="fa-solid:moon" width="1.8rem" height="1.8rem" /> 
            }
            <Icon className={`absolute ${isDarkMode ? 'top-0 left-0' : 'translate-y-5'} transition-all duration-500 text-cPurple dark:text-white shadow-xl`} icon="fa-solid:sun" width="1.8rem" height="1.8rem" />
            <Icon className={`absolute  ${isDarkMode ? 'translate-y-5' : 'top-0 left-0'} transition-all duration-500 text-cPurple dark:text-white shadow-xl`} icon="fa-solid:moon" width="1.8rem" height="1.8rem" /> 
        </button>
    )
}

export default MenuButton;
