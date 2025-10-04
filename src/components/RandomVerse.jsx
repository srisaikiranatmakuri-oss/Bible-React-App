import React, { useState } from 'react'

export default function RandomVerse() {
const [verse, setVerse] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)


async function fetchRandom() {
setLoading(true)
setError(null)
setVerse(null)
try {
// API: https://labs.bible.org/api/?passage=random&type=json
const res = await fetch('https://labs.bible.org/api/?passage=random&type=json')
if (!res.ok) throw new Error(`HTTP ${res.status}`)
const data = await res.json()
// data is an array of verse objects; join them just in case
const text = data.map(v => v.text).join(' ')
const ref = data.map(v => `${v.bookname} ${v.chapter}:${v.verse}`).join(' ')
setVerse({ text, ref })
} catch (err) {
setError('Could not load verse. Try again.')
console.error(err)
} finally {
setLoading(false)
}
}


return (
<div>
<div className="controls">
<button onClick={fetchRandom} className="btn">Get random verse</button>
</div>


{loading && <p className="muted">Loading…</p>}
{error && <p className="error">{error}</p>}


{verse && (
<article className="verse">
<p className="verse-text">“{verse.text}”</p>
<p className="verse-ref">— {verse.ref}</p>
</article>
)}
</div>
)
}