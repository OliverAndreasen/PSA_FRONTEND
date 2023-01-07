
let myCards = JSON.parse(localStorage.getItem('myCards'));




// Check if the myCards object is empty
if (Object.keys(myCards).length === 0) {
    // If it is, show an error message
    let table = document.querySelector('.table');
    table.innerHTML = `<tr><td colspan="4" class="text-center">You have no cards in your collection.</td></tr>`;
} else {
    // If it is not, create the table header
    let table = document.querySelector('.table');
    let header = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Card Number</th>
        <th>Variety</th>
        <th>Grades</th>
      </tr>
    </thead>
  `;
    table.innerHTML = header;

    // Create the table body
    let body = document.createElement('tbody');

    // Loop through each card in the myCards object
    for (let cardId in myCards) {
        let card = myCards[cardId];

        // Create a table row for the card
        let row = document.createElement('tr');
        row.innerHTML = `
      <td>${cardId}</td>
      <td>${card.cardName}</td>
      <td>${card.cardNumber}</td>
      <td>${card.variety}</td>
    `;

// Create a cell to display the grades
        let gradesCell = document.createElement('td');

// Convert the array of grades into a string of comma-separated values
        let gradesString = card.grades.join(', ');

// Set the cell's inner HTML to the string of grades
        gradesCell.innerHTML = gradesString;

// Add the cell to the row
        row.appendChild(gradesCell);

        // Add the row to the table body
        body.appendChild(row);
    }

    // Add the table body to the table
    table.appendChild(body);
}