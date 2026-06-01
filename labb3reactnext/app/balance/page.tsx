import styles from "./page.module.css"

interface BalanceItem {
    id: number;
    title: string;
    type: "Inkomst" | "Avgifter" | "Lån" | "Sparande";
    amount: number;
    date: string;
}

const placeholderItems: BalanceItem[] = [
    {
        id: 1,
        title: "Lön",
        type: "Inkomst",
        amount: 24000,
        date: "2026-06-01"
    },
    {
        id: 2,
        title: "Hyra",
        type: "Avgifter",
        amount: 8000,
        date: "2026-06-01"
    },
    {
        id: 3,
        title: "Lån från banken",
        type: "Lån",
        amount: 100000,
        date: "2026-06-01"
    }


];

export default function BalancePage() {
    return (
        <>
            <section className={styles.balanceContainer}>
                <div className={styles.balanceCard}>

                    <h1 className={styles.title}>Balans</h1>

                    <ul className={styles.balanceList}>
                        {placeholderItems.map((item) => (
                            <li key={item.id} className={styles.balanceItem}>
                                <div>
                                    <h2>{item.title}</h2>
                                    <p>Typ: {item.type}</p>
                                </div>

                                <div>
                                    <p>{item.amount} kr</p>
                                    <p>{item.date}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}
