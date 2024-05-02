var images = document.getElementsByClassName('miniature');
var currentIndex = 0;
var carouselInterval;

function selectImage(index) {
    var selected = document.querySelector('.selected');
    if (selected) selected.classList.remove('selected');

    var img = images[index];
    img.classList.add('selected');

    var mainImage = document.getElementById('mainImage');
    mainImage.src = img.src;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    selectImage(currentIndex);
}

function previousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    selectImage(currentIndex);
}

function randomImage() {
    var randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * images.length);
    } while (randomIndex === currentIndex);
    selectImage(randomIndex);
}

function toggleToolbar() {
    var toolbar = document.querySelector('.toolbar');
    var defaultButtons = document.querySelector('.default-buttons');
    var thumbnails = document.querySelectorAll('.miniature');
    
    
    var isToolbarHidden = toolbar.style.display === 'none' || toolbar.style.display === '';


    if (!thumbnails[0].dataset.initialDisplay) {
        thumbnails.forEach(function(thumbnail) {
            thumbnail.dataset.initialDisplay = getComputedStyle(thumbnail).display;
        });
    }


    if (isToolbarHidden) {
        toolbar.style.display = 'block';
        defaultButtons.style.display = 'none';
        thumbnails.forEach(function(thumbnail) {
            thumbnail.style.display = 'none';
        });
    } else {
        toolbar.style.display = 'none';
        defaultButtons.style.display = 'block';
        thumbnails.forEach(function(thumbnail) {
   
            thumbnail.style.display = thumbnail.dataset.initialDisplay;
        });
    }
}

function toggleCarousel() {
    var button = document.querySelector('.default-buttons button:nth-child(2)');
    if (carouselInterval) {
        clearInterval(carouselInterval);
        button.textContent = 'Next';
        carouselInterval = null;
    } else {
        carouselInterval = setInterval(nextImage, 1500);
        button.textContent = 'Next';
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowLeft') {
        previousImage();
    } else if (event.code === 'ArrowRight') {
        nextImage();
    } else if (event.code === 'Space') {
        toggleCarousel();
    }
});

window.onload = function() {
    selectImage(currentIndex); 
    document.querySelector('.default-buttons').style.display = 'block';
}