const title = document.querySelector('h1');
const funBox = document.querySelector('.funBox');
const funBox2 = document.querySelector('.funBox2');
const mainContainer = document.querySelector('.mainContainer');

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

document.addEventListener('keydown', event => {
    if (event.key === 'r') {
        Reset();
    }
});
function Reset(){
    title.textContent = "Title!";
    funBox.style.display = "flex";
    funBox2.style.display = "flex";
    mainContainer.style.backgroundImage = "none";
}