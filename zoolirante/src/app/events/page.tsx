import { FormEvent } from 'react'
'use client';

export default function EventsPage() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/events', {
      method: 'POST',
      body: formData,
    })
    'use client';
    // Handle response if necessary
    const data = await response.json()
    // ...
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}