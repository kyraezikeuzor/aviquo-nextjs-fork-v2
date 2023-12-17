import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import SearchBar from './SearchBar'
import Icon from './Icon'
import Modal from './Modal'

import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {getPath} from '../lib/utilities'

import ecItems from '../lib/ecItems.json'

export default function DashNavbar() {
    const [navbarIcons, setNavbarIcons] = useState(true)

    useEffect(() => {
        const handleSmallScreenShowNavbar = () => {
          if(window.innerWidth <= 960) {
            setNavbarIcons(false);
          } else {
            setNavbarIcons(true);
          }
        }
    
        //handleSmallScreenShowSidebar([])
    
        window.addEventListener('resize', handleSmallScreenShowNavbar);
        
      }, []);


      const [searchText, setSearchText] = useState('');

      const searchDataFiltered = [];
      for (let i = 0; i < ecItems.length; i++) {
          if (ecItems[i].name.toLowerCase().includes(searchText.toLowerCase())) {
            searchDataFiltered.push(ecItems[i]);
          }
      }
    const modalSearchContent = searchDataFiltered.slice(0, 6);

  return (
    <nav className='flex flex-row gap-4 p-4 justify-between'>
        <ul>
            <li>
                <SearchBar placeholder="Search" searchFunction={setSearchText}/>
            </li>
            <Modal showModal={searchText != ''}>

              {modalSearchContent.map((item,index)=>(
                <span key={index} className='flex flex-row items-center gap-4 hover:bg-[var(--clr-grey-200)]'>
                  <FontAwesomeIcon icon={faMagnifyingGlass} className='w-4'/>
                  <Link href={`/ecs${getPath(item.name)}`} className='text-base font-medium'>{item.name}</Link>

                </span>
              ))}
              
          </Modal>
        </ul>
        

        {navbarIcons && <div className='flex items-center gap-5'>
            <Icon icon='notification-bell' fillColor="black"/>
            <img className='w-1/3 h-auto rounded-3xl' src='https://lh3.googleusercontent.com/a-/AOh14GgeD4LTuYuvwpMah5byGlk8eREsrmb9xO691yO3VQ=s96-c'></img>
        </div>}
    </nav>
  )
}
