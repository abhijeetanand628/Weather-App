//// Initializing all elements constants
const tempField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

//// Adding event listener to the form
form.addEventListener("submit", search);

//// Default Location
let target = "Patna"

//// Function to fetch data from Weather API
const fetchData = async(target) => {

    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=166105141e2a491db7a55054242609&q=${target}`


        const response = await fetch(url);
        const data = await response.json();
    
        // console.log(data);  // Fetches the data's location and current situation in the form of object
    
        const {
            current:{
                temp_c,  // Used to know current temp in deg Celcius
            condition:{text, icon},    // Used to know the icon(emoji) and proper condition(text) of the weather(ex- sunny,light drizzle,mist,etc)
        },  
            location:{name, localtime},  // Used to know the location's name
        } = data;
    
        //// Calling update DOM function
        updateDom(temp_c,name,localtime,icon,text); // It updates the HTML text
        
    } catch (error) {
        alert("Location not found")
    }

};

//// Function to update DOM
function updateDom (temp,city,time,emoji,text) {

    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = new Date(exactDate).getDay(); // Gets the day of the week using local time

    tempField.innerText = temp;  // It updates the HTML text
    cityField.innerText = city;  // It updates the HTML text
    dateField.innerText = ` ${exactTime} - ${getDayFullName(exactDay)} - ${exactDate}`;
    emojiField.src = emoji;  // Changes the icon of the weather
    weatherField.innerText = text; // Changes the text of the weather and tells the proper weather(ex- sunny,light drizzle,mist,etc)
}


fetchData(target);

//// Function to search the location
function search (e) {
    e.preventDefault();

    target = searchField.value;

    fetchData(target); // It calls the target and show the weather of the searhed place
}

//// Fucntion to get the name of the day
function getDayFullName (num) {
    switch(num) {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";
        
        case 2:
            return "Tuesday";
           
        case 3:
            return "Wednesday";

        case 4:
            return "Thursday";

        case 5:
            return "Friday";
            
        case 6:
            return "Saturday";   

        default:
            return "Don't Know"; 
    }
};