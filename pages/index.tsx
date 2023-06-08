import Head from 'next/head';
import Image from 'next/image';
import UnderConstruction from '../components/UnderConstruction';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Final Show - Showcase</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <UnderConstruction />
        </div>
    );
}
