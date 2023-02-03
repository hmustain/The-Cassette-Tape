//to add a song

async function newFormHandler(event) {
    event.preventDefault();
  
    const songs = document.querySelector('#songs').value;
  
  
    const response = await fetch(`/api/songs`, {
      method: 'POST',
      body: JSON.stringify({
        songs,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add song');
    }
  }
  
  document
    .querySelector('list-group')
    .addEventListener('submit', newFormHandler);


    //to delete a song

    const delButtonHandler = async (event) => {
        if (event.target.hasAttribute('data-id')) {
          const id = event.target.getAttribute('data-id');
      
          const response = await fetch(`/api/events/${id}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            document.location.replace('/event');
          } else {
            alert('Failed to delete song');
          }
        }
      };
      document
  .querySelector('.song-list')
  .addEventListener('click', delButtonHandler);
