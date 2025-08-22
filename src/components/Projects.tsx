import { motion } from "motion/react";
import { useRef } from "react";

interface IProject {
    name: string;
    href: string;
    img: string;
    role: string;
}

const projects: IProject[] = [
	{
		name: "El Girasol Surveys",
		href: "/projects/elgirasol",
		img: "/img/img_projects/elgirasol/1.png",
		role: "Full Stack Web Developer"
	},
	{
		name: "ERP Academia Global",
		href: "/projects/ag",
		img: "/img/img_projects/erp_ag/main.png",
		role: "Full Stack Web Developer"
	},
	{
		name: "Module of CRM Wedoox",
		href: "/projects/wedoox",
		img: "/img/img_projects/crm_wedoox/1.png",
		role: "Frontend Developer"
	}
];

interface Props {
    projects: IProject[]
}

function Projects({ projects }: Props) {
    const carouselRef = useRef(null);

    return ( 
        <div className="overflow-hidden">
            <motion.div
                ref={carouselRef}
                className="flex lg:flex-row gap-4 p-4 sm:p-2 xs:flex-col sm:flex-col md:flex-col 2xs:flex-col "
                drag="x"
                dragConstraints={{ right: 0, left: -1000 }}
            >
                {projects.map((project, index) => (
                <motion.a
                    key={index}
                    className="min-w-[300px] rounded-lg bg-white shadow-lg p-2 hover:cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    href={project.href}
                >
                    <img
                        src={project.img}
                        alt={project.name}
                        className="w-full h-48 object-cover rounded"
                    />
                    <div className="mt-2">
                    <h3 className="font-bold">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.role}</p>
                    </div>
                </motion.a>
                ))}
            </motion.div>
        </div>
     );
}

export default Projects;