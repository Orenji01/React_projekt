import Link from "next/link"
import styles from "./navbar.module.css"

const Navbar = () => {
    return (
        <>
        <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link href="/">Hem</Link>
                </li>
                <li>
                    <Link href="balance">Balans</Link>
                </li>
                <li>
                    <Link href="addTransaction">Lägg till post</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default Navbar
