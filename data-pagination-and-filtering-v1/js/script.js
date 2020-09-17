/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// Specifies the # of items per page. It is declared here to make it easier to update the number.
let itemsPerPage = 9;
// Accesses the header element for use in functions below.
const header = document.querySelector('header');

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

// This function loops through the data objects and lists their data as seperate elements on the page.
// It only shows a specified # of items per page, set in the itemsPerPage variable.
function showPage(list, page) {

   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;

   const studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = '';

   for ( let i = 0; i < list.length; i++) {
      if ( i >= startIndex && i < endIndex ) {
         let studentItem = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${list[i].picture.thumbnail} alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `;
         studentList.insertAdjacentHTML('beforeend', studentItem);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

// This function creates the buttons required for selecting new pages, then adds an event listener to call the showPage function and provide the correct page number.
function addPagination(list) {
   const numberOfPages = Math.ceil(list.length / itemsPerPage);

   let linkList = document.querySelector('ul.link-list');
   linkList.innerHTML = '';

   for (let i = 0; i < numberOfPages; i++) {
      let buttonHTML = `<li><button type="button">${i+1}</button></li>`;
      linkList.insertAdjacentHTML('beforeend', buttonHTML);
   }

   linkList.firstElementChild.className = 'active';

   linkList.addEventListener('click', (e) => {

      if ( e.target.tagName === 'BUTTON' ){
         document.querySelector('.active').className = '';
         e.target.className = 'active';
      }
      showPage(data, e.target.textContent);
   });
}

// This function creates a searchbar that can search through the list of names and display matches.
function createSearch() {
   header.insertAdjacentHTML('beforeend',`
   <label for="search" class="student-search">
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `);
   searchNames('keyup');
   searchNames('submit');
}

// I learned how to check if a string is contained in another string in this video: https://www.youtube.com/watch?v=1ZA2QC8SKZg
// This function creates the event listeners for our searchbar.
function searchNames(eventParam) {
   const searchbar = header.lastElementChild;
   header.addEventListener(eventParam, () => {
      let searchList = [];
      text = (searchbar.firstElementChild.value).toLowerCase();

      for (let i = 0; i < data.length; i++) {
         let name = '';
         name = (data[i].name.first + ' ' + data[i].name.last).toLowerCase();
         if (name.indexOf(text) !== -1) {
            searchList.push(data[i]);
         }
      }
      showPage(searchList, 1);
      addPagination(searchList);
   });
}

// Call functions
showPage(data, 1);
addPagination(data);
createSearch();