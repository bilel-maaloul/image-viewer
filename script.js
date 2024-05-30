var images = document.getElementsByClassName('miniature');
var currentIndex = 0;
var carouselInterval;
var randomImageInterval;

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

function toggleToolbar() {
    var toolbar = document.querySelector('.toolbar');
    var defaultButtons = document.querySelector('.thumbnail-container');
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
        defaultButtons.style.display = 'flex';
        thumbnails.forEach(function(thumbnail) {
            thumbnail.style.display = thumbnail.dataset.initialDisplay;
        });
    }
    
    var toolbarToggle = document.getElementById("toolbarToggle");

  
    if (toolbarToggle.classList.contains("fa-arrow-down")) {
        toolbarToggle.classList.remove("fa-arrow-down");
        toolbarToggle.classList.add("fa-arrow-right");
    } else {
        toolbarToggle.classList.remove("fa-arrow-right");
        toolbarToggle.classList.add("fa-arrow-down");
    }
}

function toggleCarousel() {
    var button = document.querySelector('.toolbar button:nth-child(2)');
    if (carouselInterval) {
        clearInterval(carouselInterval);
        button.innerHTML = '<i class="fas fa-play"></i>';
        carouselInterval = null;
    } else {
        carouselInterval = setInterval(nextImage, 1500);
        button.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

function randomImage() {
    var randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * images.length);
    } while (randomIndex === currentIndex);
    selectImage(randomIndex);
}

function toggleRandomImageLoop() {
    var button = document.querySelector('.toolbar button:nth-child(4)');
    if (randomImageInterval) {
        clearInterval(randomImageInterval);
        button.innerHTML = '<i class="fas fa-random"></i>';
        randomImageInterval = null;
    } else {
        randomImageInterval = setInterval(randomImage, 1500); 
        button.innerHTML = '<i class="fas fa-stop"></i>';
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

    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('click', function() {
            selectImage(i);
            currentIndex = i;
        });
    }
}
