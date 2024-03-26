import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';

async function getData() {
    const res = await fetch('https://restcountries.com/v3.1/all');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function Page() {
    const data = await getData();

    return (
        <main className={styles.container}>
            <h1 className={styles.mainText}>Click on the country card to see more</h1>
            {data.map((country, index) => (
                <Link key={index} href={`/${country.name.common}/`} className={styles.countryCard}>
                    <h2>{country.name.common}</h2>
                    <img src={country.flags.png} alt={country.name.common}/>
                    <p>Population: {country.population}</p>
                    <p>Area: {country.area} km²</p>
                </Link>
            ))}
        </main>
    );
}