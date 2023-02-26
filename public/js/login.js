const loginHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#userName').value.trim();

    const password = document.querySelector('#password').value.trim();

    if (userName && password){
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({userName, password}),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok){
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const signUpHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('.newUserName').value.trim();
    const password = document.querySelector('.newPassword').value.trim();

    if (userName && password){
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({userName, password}),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok){
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#signUpButton').addEventListener('click', signUpHandler);

document.querySelector('#loginButton').addEventListener('click', loginHandler);

