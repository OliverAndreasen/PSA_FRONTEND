popReportURL = 'http://localhost:8080/api/popReports';

// create object with myCards
let myCards = {};

function getPopReports() {
    return fetch(popReportURL)
        .then((res) => res.json())
}

document.querySelector('#search-form').addEventListener('submit', function (event) {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();

    // Get the search input value
    let searchInput = document.querySelector('#search-input').value;

    // Search the pop reports for the search input value
    searchPopReports(searchInput);
});


document.addEventListener('DOMContentLoaded', function () {
    getPopReports().then((data) => {
        let prevButton = document.querySelector('#prev-button');
        let nextButton = document.querySelector('#next-button');
        let pageNumberLabel = document.querySelector('#page-number');

        function renderTable(data, index) {
            let container = document.querySelector('#popreport-container');
            let item = data[index];
            let setName = item.setName;
            let table = createTable(item.singleEntities);
            container.innerHTML = `<h1>${setName}</h1>` + table;
        }

        prevButton.addEventListener('click', function () {
            // Decrement the page number and render the previous popreport
        });

        nextButton.addEventListener('click', function () {
            // Increment the page number and render the next popreport
        });

        let pageNumber = 0;

        // Show the first popreport when the page is loaded
        renderTable(data, pageNumber);
        pageNumberLabel.innerHTML = pageNumber + 1;

        prevButton.addEventListener('click', function () {
            if (pageNumber > 0) {
                pageNumber--;
                renderTable(data, pageNumber);
                pageNumberLabel.innerHTML = pageNumber + 1;
            }
        });

        nextButton.addEventListener('click', function () {
            if (pageNumber < data.length - 1) {
                pageNumber++;
                renderTable(data, pageNumber);
                pageNumberLabel.innerHTML = pageNumber + 1;
            }
        });
    });
});

function searchPopReports(searchInput) {
    // Get the pop reports data
    getPopReports().then((data) => {
        // Create an array to store the search results
        let searchResults = [];

        // Loop through each pop report
        data.forEach((popReport) => {
            // Loop through each card in the pop report
            popReport.singleEntities.forEach((card) => {
                // Check if the search input value is in the card name
                if (card.cardName.toLowerCase().includes(searchInput.toLowerCase())) {
                    // If it is, add the card to the search results array
                    searchResults.push(card);
                }
            });
        });

        // Render the search results
        renderSearchResults(searchResults);
    });
}

function renderSearchResults(searchResults) {
    let container = document.querySelector('#popreport-container');

    // Clear the container
    container.innerHTML = '';

    // Check if there are any search results
    if (searchResults.length > 0) {
        // Create a map to store the search results by set name
        let searchResultsBySet = new Map();

        // Loop through each search result
        searchResults.forEach((card) => {
            // Check if the set name already exists in the map
            if (searchResultsBySet.has(card.popReportName)) {
                // If it does, add the card to the existing array for that set
                searchResultsBySet.get(card.popReportName).push(card);
            } else {
                // If it does not, create a new array for that set and add the card
                searchResultsBySet.set(card.popReportName, [card]);
            }
        });

        // Loop through each set in the map
        for (let [setName, cards] of searchResultsBySet) {
            // Create a table for the set
            let table = createTable(cards);

            // Add the set name and table to the container
            container.innerHTML += `<h1>${setName}</h1>` + table;
        }
    } else {
        // If there are no search results, display a message
        container.innerHTML = '<p>No results found.</p>';
    }
}


function createTable(cards) {
    let table = `
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Card Number</th>
                    <th>Variety</th>
                    <th>Grade 1</th>
                    <th>Grade 2</th>
                    <th>Grade 3</th>
                    <th>Grade 4</th>
                    <th>Grade 5</th>
                    <th>Grade 6</th>
                    <th>Grade 7</th>
                    <th>Grade 8</th>
                    <th>Grade 9</th>
                    <th>Grade 10</th>                
                    <th>My Grade</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Loop through each card and add a row to the table
    cards.forEach((card) => {
        table += `
            <tr>
                <td>${card.cardName}</td>
                <td>${card.cardNumber}</td>
                <td>${card.variety}</td>
                <td>${card.grade1}</td>
                <td>${card.grade2}</td>
                <td>${card.grade3}</td>
                <td>${card.grade4}</td>
                <td>${card.grade5}</td>
                <td>${card.grade6}</td>
                <td>${card.grade7}</td>
                <td>${card.grade8}</td>
                <td>${card.grade9}</td>
                <td>${card.grade10}</td>
                <td>
                    <select id="gradeSelect" class="dropdown">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </td>
                <td>
                    <button id="add-to-my-cards-button" class="btn-primary btn" data-id="${card.id}" data-cardname="${card.cardName}" data-cardnumber="${card.cardNumber}" data-cardvariety="${card.variety}">Add to My Cards</button>
                </td>
            </tr>
        `;
    });

    table += `
            </tbody>
        </table>
    `;

    return table;
}

document.addEventListener('click', function (event) {
    if (event.target.id === 'add-to-my-cards-button') {
        let cardId = event.target.getAttribute('data-id');
        let cardName = event.target.getAttribute('data-cardname');
        let cardNumber = event.target.getAttribute('data-cardnumber');
        let cardVariety = event.target.getAttribute('data-cardvariety');
        let gradeSelect = event.target.parentElement.previousElementSibling.querySelector('#gradeSelect');
        let grade = gradeSelect.options[gradeSelect.selectedIndex].value;

        addToMyCards(cardId, cardName, cardNumber, cardVariety, grade);
    }
});

function addToMyCards(cardId, cardName, cardNumber, cardVariety, grade) {
    // Check if the card already exists in the myCards object
    if (myCards.hasOwnProperty(cardId)) {
        // If it does, update the grade for the card
        myCards[cardId].grades.push(grade);
    } else {
        // If it does not, add the card to the myCards object
        myCards[cardId] = {
            id: cardId,
            cardName: cardName,
            cardNumber: cardNumber,
            variety: cardVariety,
            grades: [grade]
        };
    }


    // Convert the myCards object to a JSON string
    let myCardsJson = JSON.stringify(myCards);

    // Save the myCards object to local storage
    localStorage.setItem('myCards', myCardsJson);

    let event = new Event('myCardsChanged');
    document.dispatchEvent(event);
}

function displayMyCards() {
    let myCardsContainer = document.querySelector('#my-cards-container');

    // Clear the container
    myCardsContainer.innerHTML = '';

    // Check if the myCards object is empty
    if (Object.keys(myCards).length === 0) {
        //check if the localStorage myCards is empty
        if (localStorage.getItem('myCards') === null) {
            myCardsContainer.innerHTML = '<p>You have no cards in your collection.</p>';
        }
    } else {
        // Create a table to display the cards
        let table = document.createElement('table');
        table.classList.add('table');

        // Add the table header row
        table.innerHTML = `
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Card Number</th>
                    <th scope="col">Variety</th>
                    <th scope="col">Grades</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        // Loop through each card in the myCards object
        for (let cardId in myCards) {
            let card = myCards[cardId];

            // Create the table row element
            let row = document.createElement('tr');

            // Add the card name, card number, and variety to the row
            row.innerHTML = `
                <td>${card.cardName}</td>
                <td>${card.cardNumber}</td>
                <td>${card.variety}</td>
            `;

            // Create a td element to display the grades
            let gradesTd = document.createElement('td');

            // Get the list of grades as a comma-separated string
            let gradesString = card.grades.join(', ');

            // Set the innerHTML of the td element to the grades string
            gradesTd.innerHTML = gradesString;

            // Append the td element to the row
            row.appendChild(gradesTd);

            // Add a button to the row to remove the card from the myCards object

            let button = document.createElement('button');
            button.classList.add('btn', 'btn-danger');
            button.innerHTML = 'Remove';
            button.addEventListener('click', function () {
                // Remove the card from the myCards object
                delete myCards[cardId];

                // Re-display the myCards table
                displayMyCards();
            });
            row.appendChild(button);

            // Append the row to the table body
            table.querySelector('tbody').appendChild(row);
        }

        // Add the table to the container
        myCardsContainer.appendChild(table);
    }
}


document.addEventListener('myCardsChanged', function () {
    displayMyCards();
});






