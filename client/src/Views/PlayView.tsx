import React, { useEffect, useState, SyntheticEvent } from 'react';
import AppLinkPrimary from '../components/AppLinkPrimary'
import { queryPlays } from '../api';

export default function PlayView() {
  const [query, setQuery] = useState('');
  const [querySet, setQuerySet] = useState([]);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const queryResponse: any = await queryPlays(query);
    setQuerySet(queryResponse)
  }

  return (
    <div>
      <h2 className="PlayView__heading">Plays</h2>
      <AppLinkPrimary to="/">Home</AppLinkPrimary>
      <div className="PlayView__formContent">
        <form action="GET" onSubmit={e => handleSubmit(e)}>
          <input
            type="text"
            name="sonnetQuery"
            onChange={event => setQuery(event.target.value)}
            value={query}
            id=""
          />
          <input className="PlayView__formSubmit" type="submit" />
        </form>
      </div>
    </div>
  )
}
