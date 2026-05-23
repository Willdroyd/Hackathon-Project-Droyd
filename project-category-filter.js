const categoryContainer = document.getElementById('projectCategories');
const categoryButtons = document.querySelectorAll('.categoryButton');
const projectCards = document.querySelectorAll('.projectCardGrid .projectCard');

if (categoryContainer && categoryButtons.length > 0 && projectCards.length > 0) {
    categoryContainer.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('.categoryButton');
        if (!clickedButton) {
            return;
        }

        const selectedCategory = clickedButton.dataset.category;

        categoryButtons.forEach((button) => {
            button.classList.remove('is-active');
        });
        clickedButton.classList.add('is-active');

        projectCards.forEach((card) => {
            const cardCategory = card.dataset.category;
            if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}
