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

function setupResponsiveTopbarMenu() {
    const topbar = document.querySelector('.topbarContainer');
    const nav = document.querySelector('.topbarNavbarContainer');

    if (!topbar || !nav) {
        return;
    }

    if (topbar.querySelector('.topbarMenuToggle')) {
        return;
    }

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'topbarMenuToggle';
    toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
    toggleButton.setAttribute('aria-expanded', 'false');

    for (let i = 0; i < 3; i += 1) {
        const line = document.createElement('span');
        line.className = 'topbarMenuToggleLine';
        line.setAttribute('aria-hidden', 'true');
        toggleButton.appendChild(line);
    }

    const rightContainer = topbar.querySelector('.topbarRightContainer');
    if (rightContainer) {
        topbar.insertBefore(toggleButton, rightContainer);
    } else {
        topbar.appendChild(toggleButton);
    }

    const closeMenu = () => {
        topbar.classList.remove('menuOpen');
        toggleButton.setAttribute('aria-expanded', 'false');
    };

    toggleButton.addEventListener('click', () => {
        const isOpen = topbar.classList.toggle('menuOpen');
        toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });
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

setupResponsiveTopbarMenu();
updateTopbarUserState();
setupPrototypeAuthButtons();