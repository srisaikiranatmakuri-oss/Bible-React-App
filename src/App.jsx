import React from 'react'
import RandomVerse from './components/RandomVerse'
import SpecificVerse from './components/SpecificVerse'


export default function App() {
return (
<div className="app">
<header className="hero">
<h1>Bible Verse Finder</h1>
<p className="subtitle">Get a random verse or look up a specific passage</p>
</header>


<main className="container">
<section className="card">
<h2>Random Verse</h2>
<RandomVerse />
</section>


<section className="card">
<h2>Specific Verse</h2>
<SpecificVerse />
</section>
</main>


<footer className="footer">
Data from <a href="https://labs.bible.org/" target="_blank" rel="noreferrer">Bible.org Labs API</a>
</footer>
</div>
)
}