import React, { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi'


export default function ProjectCard({title, smdesc, link, techs, isLoaded }) {
   // const techsArray = techs.split(',');
    const [Hovered, setHovered] = useState(false)
    return (
        <li className={`max-w-full ${Hovered ? 'dark:bg-[#525252] bg-gray-100' : ''} md:max-w-1/2 lg:max-w-1/4 m-2 p-3 border-2 lg:border-0 relative origin-top rounded-lg ${isLoaded ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} transition-all duration-500 ease-in-out group lg:hover:!opacity-100 lg:group-hover/list:opacity-50`}>
            <a href={link} target='_blank' onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)} rel="noreferrer">
                <div className='flex flex-col'>
                    <div id="title" className='py-3 flex gap-3'>
                        <h1 className={`text-4xl text-bg-dark dark:text-bg-light font-bold origin-bottom ${isLoaded ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} transition-all duration-150 ease-in-out delay-700`}>{title}</h1>
                        <div className='w-[40px] h-[40px] flex'>
                            <p className={`text-white text-2xl origin-top ${Hovered ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} transition-all ease-in-out duration-200`}><FiArrowUpRight /></p>
                        </div>
                    </div>
                    <div id="description_tags" className={`border-t-4 border-black dark:border-white py-5 flex flex-col lg:flex-row gap-3 justify-between origin-left ${isLoaded ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'} transition-all duration-300 ease-in-out delay-500`}>
                        <div className='my-auto'>
                            <p className={`capitalize text-bg-dark dark:text-bg-light origin-top ${isLoaded ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} transition-all duration-150 ease-in-out delay-700`}>{smdesc}</p>
                        </div>
                        <div className={`grid grid-cols-2 lg:flex gap-3 origin-bottom  ${isLoaded ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} transition-all duration-300 ease-in-out delay-700`}>
                            {/* {techsArray.map((tech, index) => (
                                <p key={index} className='lg:px-4 lg:py-1 px-2 py-[2px] border-bg-dark text-bg-dark dark:border-bg-light dark:text-bg-light border-[1px] lg:border-[2px] rounded-full text-sm'>{tech}</p>
                            ))} */}
                        </div>
                    </div>
                </div>
            </a>
        </li>
    );
}
