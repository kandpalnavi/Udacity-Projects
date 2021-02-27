/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const sectionNav = document.querySelectorAll("section");
const NavTag = document.getElementById("navbar__list");
const goToTopBtn = document.getElementById("scrollToTop");
const sectionNavLength = sectionNav.length;
let sectionNavPositions = [];
let prePosition = 0;
let currentPosition = 0;

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

/**
* @name scrollToSection
* @details scrolls the html page to the said section based on the ID
* @param SectionId of the page html section to move to
*/
let scrollToSection = (sectionID) => {
	window.scrollTo(0, sectionID);
};
/**
* @name topFunction
* @details scrolls the html page to the top LEFT corner
* @param none
*/
let topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
sectionNav.forEach((element, index) => {
	let sectionName = element.getAttribute("data-nav");
	let toOffSection = element.offsetTop + 30;
	let liTag = document.createElement("li");
	liTag.setAttribute("class", "menu_link" + index);
	liTag.innerHTML = `<a onClick="scrollToSection(${toOffSection})">${sectionName}</a>`;
	NavTag.appendChild(liTag);
});


// Add class 'active' to section when near top of viewport
document.addEventListener("scroll", () => {
	currentPosition = this.scrollY;
	// Section Positions
	sectionNavPositions = [];
	sectionNav.forEach((element) => sectionNavPositions.push(element.getBoundingClientRect().top + 50));

  if (document.body.scrollTop > 25 || document.documentElement.scrollTop > 25) {
    goToTopBtn.style.display = "block";
  } else {
    goToTopBtn.style.display = "none";
  }


	// Adding and removing active sections
	let addIndex = sectionNavPositions.findIndex((element) => element > 0);
	for (let i = 0; i < sectionNavLength; i++) {
		if (addIndex === i) {
			document.querySelector(".menu_link" + addIndex).classList.add("active");
			document.querySelector(`#section${addIndex + 1}`).classList.add("current-active-class");
		} else {
			document.querySelector(".menu_link" + i).classList.remove("active");
			document.querySelector(`#section${i + 1}`).removeAttribute("class");
		}
	}
});

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active
