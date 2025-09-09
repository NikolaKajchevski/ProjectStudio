import { FormEvent } from 'react'
'use client';

export default function EventsPage() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const response = await fetch('api/route', {
      method: 'POST',
      body: formData,
    })
    // Handle response if necessary
    const data = await response.json()
    // ...
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="first" />
      <input type="text" name="second"/>
      <button type="submit">Submit</button>
    </form>
  );
}