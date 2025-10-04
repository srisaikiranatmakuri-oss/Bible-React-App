import React, { useState } from 'react'

export default function SpecificVerse() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [verse, setVerse] = useState(null)

  async function fetchSpecific(passage) {
	setLoading(true)
	setError(null)
	setVerse(null)
	try {
	  const encoded = encodeURIComponent(passage)
	  const url = `https://labs.bible.org/api/?passage=${encoded}&type=json`
	  const res = await fetch(url)
	  if (!res.ok) throw new Error(`HTTP ${res.status}`)
	  const data = await res.json()
	  const text = data.map(v => v.text).join(' ')
	  const ref = data.map(v => `${v.bookname} ${v.chapter}:${v.verse}`).join(' ')
	  setVerse({ text, ref })
	} catch (err) {
	  setError('Could not load passage. Check the input and try again.')
	  console.error(err)
	} finally {
	  setLoading(false)
	}
  }

  function onSubmit(e) {
	e.preventDefault()
	fetchSpecific(input)
  }

  return (
	<div>
	  <form onSubmit={onSubmit} className="search-form">
		<input
		  value={input}
		  onChange={e => setInput(e.target.value)}
		  className="input"
		  aria-label="passage"
		/>
		<button type="submit" className="btn">Get verse</button>
	  </form>

	  <div className="quick-buttons">
		<button onClick={() => fetchSpecific('John 3:16')} className="btn small">John 3:16</button>
		<button onClick={() => fetchSpecific('Psalm 23')} className="btn small">Psalm 23</button>
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