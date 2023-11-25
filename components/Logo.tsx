import Link from 'next/link'
import styles from './Logo.module.css'

type LogoProps = {
    minimal: true | false,
    size: 'sm' | 'md' | 'lg'
}

const Logo = ({minimal, size}: LogoProps) => {
    return (
        <Link href='/' className={`${styles.logo} ${styles[size]}`}>
            <div className={styles['img-container'] }>
                <img src='https://htmlcolorcodes.com/assets/images/colors/purple-color-solid-background-1920x1080.png'/>
            </div>
            {minimal == false ? <p>Aviquo</p> : <></>}
        </Link>
    )
}

export default Logo;