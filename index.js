const popReportURL = 'http://localhost:8080/api/popReports';

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
                // If it does not, create a new array for that set and add the card to it
                searchResultsBySet.set(card.popReportName, [card]);
            }
        });

        // Loop through each set in the map
        for (let [popReportName, setCards] of searchResultsBySet) {
            // Create a heading for the set
            let heading = `<h3>${popReportName}</h3>`;

            // Create a table to display the set's cards
            let table = `
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>cardName</th>
              <th>cardNumber</th>
              <th>Variety</th>
              <th>Grade1</th>
              <th>Grade2</th>
              <th>Grade3</th>
              <th>Grade4</th>
              <th>Grade5</th>
              <th>Grade6</th>
              <th>Grade7</th>
              <th>Grade8</th>
              <th>Grade9</th>
              <th>Grade10</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
      `;
            // Loop through each card in the set and add a row to the table for each card
            setCards.forEach((card) => {
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
                        <td>${card.grade1 + card.grade2 + card.grade3 + card.grade4 + card.grade5 + card.grade6 + card.grade7 + card.grade8 + card.grade9 + card.grade10}</td>
                         </tr>`
                ;
            });

            table += '</tbody></table>';

            // Add the heading and table to the container
            container.innerHTML += heading + table;
        }
    } else {
        // If there are no search results, display a message to the user
        container.innerHTML = '<p>No search results found</p>';
    }
}

function createTableRow(card) {
    let total = 0;
    for (let i = 1; i <= 10; i++) {
        total += card[`grade${i}`];
    }

    return `
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
      <td>${total}</td>
    </tr>
  `;
}

function createTable(cards) {
    let table = `
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>cardName</th>
          <th>cardNumber</th>
          <th>Variety</th>
          <th>Grade1</th>
          <th>Grade2</th>
          <th>Grade3</th>
          <th>Grade4</th>
          <th>Grade5</th>
          <th>Grade6</th>
          <th>Grade7</th>
          <th>Grade8</th>
          <th>Grade9</th>
          <th>Grade10</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
  `;
    cards.forEach((card) => {
        table += createTableRow(card);
    });
    table += `</tbody></table>`;
    return table;
}
document.addEventListener('DOMContentLoaded', getPopReports);
