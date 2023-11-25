import React from 'react'
import styles from './Search.module.css'
import {Button} from './Button'
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

 const Search = () => {
  return (
    <div className={styles.search}>
        <FontAwesomeIcon className='fa' icon={faMagnifyingGlass}/>
        <input type='text' placeholder='Search'/>
    </div>
  )
}

export default Search;
