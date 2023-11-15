//an array of colour names to correspond with the image file names
var colours = ['pink', 'purple', 'red', 'white', 'yellow'];
//variables to identify html elements
var thumbnailList = document.getElementById('thumbnail-list');
var featuredImage = document.getElementById('featured-image');
var imageCaption = document.getElementById('image-caption');
var randomButton = document.getElementById('random-button');

//an Event Listener for the random button
randomButton.addEventListener('click', function(){
    //a variable for a random number within the length of the array
    var randomNumber = Math.floor(Math.random()* colours.length);
    //a variable to store the array item at the random index
    var randomColour = colours[randomNumber];
    //change the featured image source to the large version of the random image selected
    featuredImage.src = `images/flowers-${randomColour}-large.jpg`;
    //update the image caption to tell you what image was selected randomly
    //this function was added in after the fact, see below for explanation for Capitalizing first char
    imageCaption.textContent = "Your Random Image is: " + randomColour.charAt(0).toUpperCase() + randomColour.slice(1) + " Flowers";
});
//a forEach method that iterates through each colour in the array and....
colours.forEach(colour => {
    //creates a new list item element
    var li = document.createElement('li');
    //creates a new image element
    var img = document.createElement('img');
    //sets the image src to the small version of the image
    img.src = `images/flowers-${colour}-small.jpg`;
    //sets the alt tag which we later use for the caption
    img.alt = `${colour} Flowers`;
    //sets the width of the image
    img.width = 240;
    //sets the height of the image
    img.height = 160;
    //add it to the thumbnail class for styling purposes
    img.classList.add('thumbnail');
    //an event listener for each thumbnail with a click function that..
    img.addEventListener('click', function () {
        //changes the source of the featured image to the large version of the clicked image
        featuredImage.src = `images/flowers-${colour}-large.jpg`;
        //changes the text content of the image caption element to the below message and 
        //capitalizes the first letter of the alt tag 
        imageCaption.textContent = "Your Chosen Image is: " +`${img.alt.charAt(0).toUpperCase() + img.alt.slice(1)}`;
    });

    //append the image to the list item
    li.appendChild(img);
    //append the list item to the thumbnaillist ul element dynamically adding each thumbnail 
    //to the html document
    thumbnailList.appendChild(li);
});
