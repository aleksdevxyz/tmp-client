import React from 'react'
import styles from './index.module.scss'
import { SearchIcon } from '../svgs'


export default function SearchInput() {
  return (
    <div className={styles.input_container}>
        <SearchIcon className={styles.icon}/>
        <input placeholder='Поиск...' className={styles.input} type="text" />
    </div>
  )
}