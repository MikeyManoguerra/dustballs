import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import AppInput from './AppInput'


interface SonnetFormProps {
  handleSubmit: (v: string) => void
}

export default function SonnetForm({ handleSubmit }: SonnetFormProps) {

  const [userQuery, setUserQuery] = useState('');

  function submit(e: SyntheticEvent) {
    e.preventDefault();
    handleSubmit(userQuery);
  }

  return (
    <form
      className="SonnetPage__form"
      action="GET"
      onSubmit={e => submit(e)}
    >
      <AppInput
        name="sonnetQuery"
        value={userQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setUserQuery(e.target.value)}
      />
      <input
        className="SonnetPage__formButton"
        type="submit"
        value="Search"
      />
    </form>
  )
}
