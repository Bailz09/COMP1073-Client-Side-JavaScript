// Assignment 1 | COMP1073 Client-Side JavaScript

/* Variables
-------------------------------------------------- */
// Create a new speechSynthesis object
var synth = window.speechSynthesis;
// Learn more about SpeechSynthesis.speak() at https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak
var textToSpeak = '';

let storyContainer = document.getElementById('story-container');
let errorMessage = document.getElementById('error-message');
let firstNounButton = document.getElementById('first-noun-button');
let verbButton = document.getElementById('verb-button');
let adjectiveButton = document.getElementById('adjective-button');
let secondNounButton = document.getElementById('second-noun-button');
let locationButton = document.getElementById('location-button');
let revealStoryButton = document.getElementById('reveal-story');
let generateRandomButton = document.getElementById('generate-random');
let clearStoryButton = document.getElementById('clear-story');
// Arrays for each category
const firstNounArray = ['The turkey', 'Mom', 'Dad', 'The Dog', 'My teacher', 'The elephant', 'The cat'];
const verbArray = ['sat on', 'ate', 'danced with', 'saw', "doesn't like", 'kissed'];
const adjectiveArray = ['a funny', 'a scary', 'a goofy', 'a slimy', 'a barking', 'a fat'];
const secondNounArray = ['goat', 'monkey', 'fish', 'cow', 'frog', 'bug', 'worm'];
const locationArray = ['on the moon', 'on the chair', 'in my spaghetti', 'in my soup', 'on the grass', 'in my shoes'];
//Array for the correct story order and to track each click
const buttonOrder = ['first-noun-button', 'verb-button', 'adjective-button', 'second-noun-button', 'location-button'];
var buttonsClicked = [];

/* Functions
-------------------------------------------------- */
function speakNow(string) {
	// Create a new speech object, attaching the string of text to speak
	var utterThis = new SpeechSynthesisUtterance(string);
	// Actually speak the text
	synth.speak(utterThis);
}

//a function for making the story, takes 2 parameters buttonId and speak
function storyMaker(buttonId, speak=true) {
	//checks to see if the button is already in the buttonsClicked array
	if (buttonsClicked.includes(buttonId)) {
		errorMessage.textContent = "Button has already been chosen"
	}

	/*ok this was a bit tricky to figure out but this else if checks to see if the next button pressed
	is in the right order for the story by comparing the length of the buttonsClicked array to the 
	buttonOrder array. The length is used as an index for the corresponding item in the buttonOrder
	array*/
	else if (buttonOrder[buttonsClicked.length] !== buttonId) {
		errorMessage.textContent = "Please Select Buttons in the correct order"
	}

	else {

		let selectedWord = "";
		//a switch case for each button that selects a random item from its corresponding array
		switch (buttonId) {

			case 'first-noun-button':
				selectedWord = firstNounArray[Math.floor(Math.random() * firstNounArray.length)];
				break;

			case 'verb-button':
				selectedWord = verbArray[Math.floor(Math.random() * verbArray.length)];
				break;
			case 'adjective-button':
				selectedWord = adjectiveArray[Math.floor(Math.random() * adjectiveArray.length)];
				break;
			case 'second-noun-button':
				selectedWord = secondNounArray[Math.floor(Math.random() * secondNounArray.length)];
				break;
			case 'location-button':
				selectedWord = locationArray[Math.floor(Math.random() * locationArray.length)];
				break;
			default:
				storyContainer.textContent = "An error has occurred please try again";
				return;
		}

		buttonsClicked.push(buttonId); //add the clicked button the the end of the buttonsClicked array
		textToSpeak += ' ' + selectedWord;//add each selected word to textToSpeak variable
		storyContainer.textContent = textToSpeak; //display the story in the storyContainer
		
		if (speak)//default to true, used for the random story function not to read each word and then the entire story
		{
			speakNow(selectedWord); //to read each word as its selected
		}
	}
}

function randomStory() {

	buttonsClicked.length=0;
	textToSpeak = ''; // Reset the story string

	// Add a random word from each category to the story string (passes false for the speak condition)
	storyMaker('first-noun-button', false);
	storyMaker('verb-button', false);
	storyMaker('adjective-button', false);
	storyMaker('second-noun-button', false);
	storyMaker('location-button', false);
}

//a function to reset the textToSpeak variable and update the container
function resetStory() {
	textToSpeak = '';
	storyContainer.textContent = textToSpeak;
	buttonsClicked.length = 0;
	errorMessage.textContent = '';
}

//functions for each button click
function firstNounClick() {
	storyMaker('first-noun-button');
}
function verbClick() {
	storyMaker('verb-button');
}
function adjectiveClick() {
	storyMaker('adjective-button');
}
function secondNounClick() {
	storyMaker('second-noun-button');
}
function locationClick() {
	storyMaker('location-button')
}
function revealStoryClick() {
	speakNow(textToSpeak);
}
function generateRandomClick() {
	randomStory();
	speakNow(textToSpeak);
}
function clearStoryClick() {
	resetStory();
}
/* Event Listeners
-------------------------------------------------- */
firstNounButton.addEventListener('click', firstNounClick);
verbButton.addEventListener('click', verbClick);
adjectiveButton.addEventListener('click', adjectiveClick);
secondNounButton.addEventListener('click', secondNounClick);
locationButton.addEventListener('click', locationClick);
revealStoryButton.addEventListener('click', revealStoryClick);
generateRandomButton.addEventListener('click', generateRandomClick);
clearStoryButton.addEventListener('click', clearStoryClick);