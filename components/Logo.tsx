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
                <img src='https://www.aviato.co/static/media/Aviato.271d4d95950b92c7cb50.png'/>
            </div>
            {minimal == false ? <p>Aviquo</p> : <></>}
        </Link>
    )
}

export default Logo;