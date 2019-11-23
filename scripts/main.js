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
Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon
*/
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
