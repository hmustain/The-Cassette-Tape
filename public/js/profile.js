const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#event-name').value.trim();
    const event_playlist = document.querySelector('#event-playlist').value.trim();
    const description = document.querySelector('#event-descr').value.trim();
  
    if (name && event_playlist && description) {
      const response = await fetch(`/api/events`, {
        method: 'POST',
        body: JSON.stringify({ name, event_playlist, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete event');
      }
    }
  };
  
  document
    .querySelector('.new-event-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.playlist')
    .addEventListener('click', delButtonHandler);
  