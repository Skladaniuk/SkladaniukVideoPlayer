import styles from './Header.module.scss';
import { Menu } from '../Menu/Menu';
import { Avatar } from '../Avatar/Avatar';
import { Logo } from '../Logo/Logo';

export const Header = () => {
    return (
        <header name='header' className={styles.header}> 
            <Logo className = {styles.logo}/>
            <Menu />
            <Avatar/>
        </header>
    );
}