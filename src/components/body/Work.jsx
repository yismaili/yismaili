import React, { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import { useOutroContext } from '../../Provider/OutroProvider';
import { useTranslation } from 'react-i18next';


export default function Work() {
  const [isLoaded, setisLoaded] = useState(false);
  const { globalVariable, Data, setOpenMobileNav,setOpenlilmenu } = useOutroContext();
  const [Type, setType] = useState(0);
  const [filteredProjects, setfilteredProjects] = useState(null)
  const [t] = useTranslation();

  useEffect(() => {
    // Store the interval ID in state
    setfilteredProjects([])
    setfilteredProjects(Data? Type === 0 ? Data.sort((a,b)=> b.id - a.id) : Data.filter((project) => project.type === (Type === 1 ? 'web' : Type === 2 ? 'mobile' : 'ui/ux')).sort((a,b)=> b.id - a.id)  : [Type])
    if (globalVariable) {
      setisLoaded(false);
    }
    else {
      
      setType(0);
      const delayTask = setTimeout(() => {
        // Your code to execute after the delay
        setisLoaded(true);
      }, 800);

      // Cleanup by clearing the timeout when the component unmounts
      return () => {
        clearTimeout(delayTask); // Clear the timeout if the component unmounts
      };
    }
  }, [globalVariable, Type])

  useEffect(() => {
    setisLoaded(false);
    setfilteredProjects([]);
    const timing = setTimeout(() => {
      // Your code to execute after the delay
      setfilteredProjects(Data ? Type === 0 ? Data.sort((a,b)=> b.id - a.id) : Data.filter((project) => project.type === (Type === 1 ? 'web' : Type === 2 ? 'mobile' : 'ui/ux')).sort((a,b)=> b.id - a.id)  : [Type]);
      setisLoaded(true);
    }, 800);
  
    return () => {
      clearTimeout(timing);
    }
  }, [Type])
  
  const HandelNavClose = () => {
    setOpenlilmenu(false);
    setOpenMobileNav(false);
  }

  return (
    <div onClick={HandelNavClose} className='px-[5%] 2xl:px-[10%] bg-bg-light dark:bg-bg-dark h-fit min-h-screen pb-10 w-screen'>
      <div className={`pt-[80px] bg-secondary text-white w-fit pr-5 h-[150px] lg:h-[200px] origin-left ${isLoaded ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'} transition-all duration-200 ease-in-out`}>
        <div className={`bg-primary h-full w-fit pr-5 origin-left ${isLoaded ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}  transition-all duration-200 ease-in-out delay-100`}>
          <div className={`bg-bg-dark dark:bg-bg-light h-full w-fit pr-5 flex origin-left ${isLoaded ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}  transition-all duration-200 ease-in-out delay-200`}>
            <h1 className='text-white dark:text-[#242526] my-auto px-5 md:text-xl lg:text-3xl font-bold'>{!isLoaded ? 'Loading ...' : (Type===0 ? t('projects') : Type === 1 ? t('projects')+' - web' : Type === 2 ? t('projects')+' - mobile' : t('projects')+' - ui/ux')}</h1>
          </div>
        </div>
      </div>
      <div id="projects" className={`w-full h-fit bg-slate-50 dark:bg-[#242526] mt-5 rounded-md origin-top ${isLoaded ? 'scale-y-100' : 'scale-y-0'} transition-all duration-300 ease-in-out delay-200`}>
        <div className="w-full h-[80px] flex">
          <div className="m-auto">
            <ul className='flex gap-2 text-[12px] lg:gap-5 lg:text-lg p-5'>
              <li className={`rounded-full ${Type === 0 ? 'border-b-2' : 'border-b-0'} hover:border-b-2 border-black dark:border-white text-black dark:text-white px-4 py-1 transition-all duration-100 ease-in-out`}><button onClick={()=>setType(0)}>{t('all')}</button></li>
              <li className={`rounded-full ${Type === 1 ? 'border-b-2' : 'border-b-0'} hover:border-b-2 border-black dark:border-white text-black dark:text-white px-4 py-1 transition-all duration-100 ease-in-out`}><button onClick={()=>setType(1)}>YO</button></li>
              <li className={`rounded-full ${Type === 2 ? 'border-b-2' : 'border-b-0'} hover:border-b-2 border-black dark:border-white text-black dark:text-white px-4 py-1 transition-all duration-100 ease-in-out`}><button onClick={()=>setType(2)}>YO</button></li>
              <li className={`rounded-full ${Type === 3 ? 'border-b-2' : 'border-b-0'} hover:border-b-2 border-black dark:border-white text-black dark:text-white px-4 py-1 transition-all duration-100 ease-in-out`}><button onClick={()=>setType(3)}>YO</button></li>
            </ul>
          </div>
        </div>
          {filteredProjects && filteredProjects.length > 0 ? (
            <div className='p-4'>
              <ol className='group/list'>
              {filteredProjects.map((data) => (
                <ProjectCard
                  image={data.image}
                  link={data.link}
                  title={data.title}
                  smdesc={data.description}
                  techs={data.techs}
                  key={data.id}
                  isLoaded={isLoaded}
                />
              ))}
              </ol>
            </div>
          ) : (
            <div className='p-4 text-black dark:text-white w-full text-center'>
              {
                isLoaded ? 'No project of this type yet' : 'Loading ...'
              }
            </div>
          )}
      </div>
    </div>
  )
}
