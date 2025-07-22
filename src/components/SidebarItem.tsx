
import { motion } from "motion/react";

interface Props {
    href: string
    title: string
    currentPath: string
}
function SidebarItem({ currentPath, title, href }: Props) {
    console.log("🚀 ~ currentPath:", currentPath)
    console.log("🚀 ~ currentPath:", currentPath.includes(href))
    return ( 
        <li className="text-3xl transition duration-300 ease-in-out">
            {
                currentPath.includes(href) ? (
                    <motion.a
                        className={`
                            ${currentPath.includes(href) ? 'text-mars-red' : 'text-white'}
                            
                             bg-gradient-to-r bg-clip-text text-transparent hover:cursor-pointer`}
                        initial={{ backgroundSize: "0% 100%" }}
                        animate={{ backgroundSize: "100% 100%" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        href={href}
                        style={{
                            backgroundRepeat: "no-repeat",
                            backgroundImage: "linear-gradient(to right, #E63946, #E63946)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        <span className="">{title}</span>
                    </motion.a>
                ) : (
                    <a 
                        className={`text-star-white transition-all duration-300 ease-in-out hover:text-mars-red`} 
                        href={href}
                    >
                        <span className="">{title}</span>
                    </a>
                )
            }


            {/* <motion.a
                className={`
                    ${currentPath == href ? 'text-cosmic-pink text-4xl' : 'text-white'}
                    text-3xl 
                    font-bold bg-gradient-to-r bg-clip-text text-transparent hover:cursor-pointer`}
                initial={{ backgroundSize: "0% 100%" }}
                animate={{ backgroundSize: "100% 100%" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                href={href}
                style={{
                    backgroundRepeat: "no-repeat",
                    backgroundImage: "linear-gradient(to right, #ec4899, #ec4899)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                }}
            >
                <span className="">{title}</span>
            </motion.a> */}
        </li>
     );
}

export default SidebarItem;