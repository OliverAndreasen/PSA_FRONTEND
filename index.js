const popReportURL = 'http://localhost:8080/api/popReports';

function getPopReports() {
    fetch(popReportURL)
        .then((res) => res.json())
        .then((data) => {
            renderTables(data);
        });
}

let pageable = {
    page: 0,
    size: 10
};

function renderTables(data) {
    let container = document.querySelector('#popreport-container');
    data.forEach((item) => {
        let setName = item.setName;
        let table = createTable(item.singleEntities);
        container.innerHTML += `<h1>${setName}</h1>` + table;
    });
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

function createTableRow(card) {
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
      <td>${card.grade1 + card.grade2 + card.grade3 + card.grade4 + card.grade5 + card.grade6 + card.grade7 + card.grade8 + card.grade9 + card.grade10}</td>
    </tr>
  `;
}

document.addEventListener('DOMContentLoaded', getPopReports);
