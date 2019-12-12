/*
--> BEGIN EXPERIMENTAL

//let myHeading = document.querySelector('h2');
//myHeading.textContent = 'Hello world!';


function getNavigationBarHeight() {
  let height = document.getElementById('navigation').clientHeight;
  return height;
}

// call this function on click of Getting Started in navigation bar.
function setAnchorPaddingForGettingStarted() {
  let height = document.getElementById('navigation').clientHeight;
  document.getElementById("gettingStarted").style.paddingTop = height + "px"; // This may looks weird to you but is correct. Without the unit you get a parsing error.
}

var el = document.getElementById('gettingStarted');
el.onclick = setAnchorPaddingForGettingStarted;

function callMe() {
//  let height = document.getElementById('navigation').clientHeight;
  //document.getElementById("about").style.paddingTop = height + "px";

  // Source: https://makandracards.com/makandra/58174-how-to-access-before-after-pseudo-element-styles-with-javascript
let style = window.getComputedStyle(about, '::before');
let height = style.getPropertyValue('height');
return height;
}
--> END EXPERIMENTAL
*/

/* Source based on: w3.com, How To, Responsive Topnav
Toggle between adding and removing the "responsive" class to topnav when the user clicks on icon.

  NOTE: This method gets only called when viewport width is 600px or less (as of November 26, 2019).
*/
function toggleMenuBar() {
  // Toggle class: topnav <- -> topnav.responsive
  // Toggle at the same time symbol: "hamburger <- -> "cross"
  // NOTE: I don't like the name 'responsive' too much. It's confusing in my
  // opinion.
  var x = document.getElementById("myTopnav");
  var hamburgerSymbol = document.getElementById("hamburgerSymbol");
  var crossSymbol = document.getElementById("crossSymbol");
  if (x.className === "topnav") { // menu does not show
    x.className += " responsive";
    hamburgerSymbol.style.display = "none";
    crossSymbol.style.display = "block";
  } else { // menu shows
    x.className = "topnav";
    hamburgerSymbol.style.display = "block";
    crossSymbol.style.display = "none";
  }
}

/*
function toggle() {// Get the DOM reference
  var hamburgerSymbol = document.getElementById("hamburgerSymbol");
  if (hamburgerSymbol.style.display === "none") {
    hamburgerSymbol.style.display = "block";
  } else {
    hamburgerSymbol.style.display = "none";
  }

  var crossSymbol = document.getElementById("crossSymbol");

  if (crossSymbol.style.display === "none" ) {
    crossSymbol.style.display = "block";
  } else {
    crossSymbol.style.display = "none";
  }
}
*/

/*
function drawFrame() {
  var x = document.getElementById("navItem");

    x.style.border = "1px solid black";

}
*/

function create() {
  var btnObject = document.getElementById('openMe');
/*
  var object =  '<img src = "media/images/anImage.png" style="width:100%;" >';
  var object =  '<svg width="100" height="40"><circle cx="20" cy="20" r="10" stroke="green" stroke-width="4" fill="yellow" ></svg>';

  var object = 'email address';
*/
  var object =  '<img src="media/images/drawing.svg" width="291px" height="20px" style="vertical-align:middle"/>';
  /*var object = 'here we go'; */
  /*var img = new Image();*/
  /*
  btnObject.innerHTML = "john@example.com";
  btnObject.style.color = '#000';
  btnObject.style.fontFamily = 'Courier'
  */
  /*
  img.src = 'media/images/anImage.png';
  btnObject.apppendChild(img);
  */
  btnObject.innerHTML  = object;
}
