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

// Call functions
showPage(data, 1);
addPagination(data);