import React, { ChangeEvent, useState } from 'react'
import AppInput from './AppInput';


interface PlayFormProps {
  handleSubmit: (v: any) => void
  playTitles: string[]
}

export default function PlayForm({ handleSubmit, playTitles }: PlayFormProps) {
  const [formData, setFormData] = useState<any>({
    query: '',
    title: '',
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value
    }));
  }


  function onSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    handleSubmit(formData)
  }

  return (
    <form action="GET" onSubmit={e => onSubmit(e)}>
      <label htmlFor="titles-select">Filter by Play</label>
      <select
        onChange={(event: ChangeEvent<HTMLSelectElement>) => handleChange(event)}
        name="title"
        id="titles-select"
        value={formData.title}
        >
        <option value=""></option>
        {
          playTitles.length ? playTitles.map((title, i) => (
            <option key={i} value={title}>{title}</option>
          )) : null
        }
      </select>
      <AppInput
        name="query"
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}
        value={formData.query}
      />
      <input className="PlayPage__formSubmit" type="submit" />
    </form>)
}
