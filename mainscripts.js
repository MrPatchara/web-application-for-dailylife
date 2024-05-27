document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const aboutMeBtn = document.getElementById('aboutMeBtn');
    const modal = document.getElementById('aboutMeModal');
    const closeBtn = document.querySelector('.modal .close');

    // Confirm navigation
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            const confirmNavigation = confirm(`คุณต้องการไปที่ :  ${link.textContent} ใช่หรือไม่?`);
            if (!confirmNavigation) {
                event.preventDefault();
            }
        });

        link.addEventListener('mouseenter', () => {
            link.style.backgroundColor = '#FF6F61';
        });

        link.addEventListener('mouseleave', () => {
            link.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        });
    });

    // Open modal
    aboutMeBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
