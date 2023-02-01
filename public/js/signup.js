const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const role = document.querySelector('#user-role').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && role && password) {
      console.log(name, email, role);
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, role, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
