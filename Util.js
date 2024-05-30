function randomImage() {
    var randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * images.length);
    } while (randomIndex === currentIndex);
    selectImage(randomIndex);
}