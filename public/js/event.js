const eventCreate = async (event) => {
    event.preventDefault();
  
    const eventInput = document.querySelector('#event-input').value.trim();
    const startDate = document.querySelector('#start-date').value.trim();
    const endDate = document.querySelector('#end-date').value.trim();
    const description = document.querySelector('#description').value.trim();
  
    // alert(eventInput)

    if (eventInput && startDate && endDate && description) {
      const response = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({ eventInput, startDate, endDate, description }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/events');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  document
  .querySelector('#create')
  .addEventListener('click', eventCreate);
 
