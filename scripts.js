const title = document.querySelector('h1');
const funBox = document.querySelector('.funBox');
const funBox2 = document.querySelector('.funBox2');
const mainContainer = document.querySelector('.mainContainer');

if (funBox && funBox2 && mainContainer && title) {
    funBox.addEventListener('click', () => {
        title.textContent = "File Corrupted, You Should not have clicked random buttons.";
        funBox.style.display = "none";
        funBox2.style.display = "none";
        mainContainer.style.backgroundImage = "url('photos/error.png')";
    });

    funBox2.addEventListener('click', () => {
        title.textContent = "Thank you for clicking that button, you saved me!";
        funBox.style.display = "none";
        funBox2.style.display = "none";
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'r') {
            resetFunBoxes();
        }
    });
}

function resetFunBoxes() {
    if (!funBox || !funBox2 || !mainContainer || !title) {
        return;
    }

    title.textContent = "Title!";
    funBox.style.display = "flex";
    funBox2.style.display = "flex";
    mainContainer.style.backgroundImage = "none";
}

function setCookie(name, value, days) {
    const expires = new Date(Date.now() + (days * 24 * 60 * 60 * 1000)).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
    const cookiePrefix = `${name}=`;
    const allCookies = document.cookie.split(';');

    for (let i = 0; i < allCookies.length; i += 1) {
        const cookie = allCookies[i].trim();
        if (cookie.startsWith(cookiePrefix)) {
            return decodeURIComponent(cookie.substring(cookiePrefix.length));
        }
    }

    return null;
}

function clearCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

function updateTopbarUserState() {
    const loginButton = document.querySelector('.loginButton');
    const userName = getCookie('unionUserName');
    const provider = getCookie('unionProvider');

    if (!loginButton) {
        return;
    }

    if (userName) {
        loginButton.textContent = userName;
        loginButton.classList.add('signedInBadge');

        if (provider) {
            loginButton.title = `Signed in via ${provider}`;
        }

        const parentLink = loginButton.closest('a');
        if (parentLink) {
            parentLink.removeAttribute('href');
            parentLink.style.cursor = 'default';
        }

        loginButton.style.cursor = 'default';
    }
}

function setupPrototypeAuthButtons() {
    const googleBtn = document.getElementById('googleSignInBtn');
    const facebookBtn = document.getElementById('facebookSignInBtn');
    const signOutBtn = document.getElementById('signOutBtn');
    const statusText = document.getElementById('signinStatus');

    if (!googleBtn || !facebookBtn) {
        return;
    }

    const showStatus = (message) => {
        if (statusText) {
            statusText.textContent = message;
        }
    };

    const completePrototypeLogin = (providerName) => {
        const enteredName = window.prompt(`Prototype ${providerName} sign in. Enter your display name:`);
        if (!enteredName) {
            showStatus('Sign in cancelled.');
            return;
        }

        const safeName = enteredName.trim();
        if (!safeName) {
            showStatus('Please enter a valid name.');
            return;
        }

        setCookie('unionUserName', safeName, 7);
        setCookie('unionProvider', providerName, 7);
        updateTopbarUserState();

        if (signOutBtn) {
            signOutBtn.style.display = 'inline-flex';
        }

        showStatus(`Signed in as ${safeName} via ${providerName}.`);
    };

    googleBtn.addEventListener('click', () => {
        completePrototypeLogin('Google');
    });

    facebookBtn.addEventListener('click', () => {
        completePrototypeLogin('Facebook');
    });

    if (signOutBtn) {
        signOutBtn.addEventListener('click', () => {
            clearCookie('unionUserName');
            clearCookie('unionProvider');
            window.location.reload();
        });
    }

    const existingName = getCookie('unionUserName');
    const existingProvider = getCookie('unionProvider');
    if (existingName) {
        showStatus(`Signed in as ${existingName}${existingProvider ? ` via ${existingProvider}` : ''}.`);
        if (signOutBtn) {
            signOutBtn.style.display = 'inline-flex';
        }
    }
}

updateTopbarUserState();
setupPrototypeAuthButtons();