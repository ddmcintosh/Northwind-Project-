"use strict";

let filterSelect = document.getElementById("filterSelect");
let bevTypeDropdown = document.getElementById("bevTypeDropdown");
let productTable = document.getElementById("productTable");
let productTableBody = document.getElementById("productTableBody");

window.onload = function () {
  filterSelect.onchange = FilterSelectOnChange;
  bevTypeDropdown.onchange = BevTypeDropdownOnChange;
};

function FilterSelectOnChange() {
  if (filterSelect.value == "searchByCategory") {
    initBevTypeDropdownSelect(bevTypeDropdown);
    bevTypeDropdown.style.display = "block";
  } else if (filterSelect.value == "viewAll") {
    clearTable(productTableBody);
    bevTypeDropdown.style.display = "none";
    productTable.style.display = "block";
    fetch(`http://localhost:8081/api/products`)
      .then((response) => response.json())
      .then((data) => {
        for (let x of data) {
          let row = productTableBody.insertRow(-1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          cell1.innerHTML = `<a href="details.html?productId=${x.productId}">${x.productName}</a>`;
          cell2.innerHTML = `$${parseFloat(x.unitPrice).toFixed(2)}`;
          cell3.innerHTML = x.productId;
        }
      });
  } else if (filterSelect.value == "selectOne") {
    bevTypeDropdown.style.display = "none";
    productTable.style.display = "none";
  }
}

function initBevTypeDropdownSelect(select) {
  select.length = 0;
  let option = new Option("Select a category", "select");
  select.appendChild(option);
  fetch(`http://localhost:8081/api/categories`)
    .then((response) => response.json())
    .then((data) => {
      for (let x of data) {
        let option = new Option(x.name, x.categoryId);
        select.appendChild(option);
      }
    });
}

function BevTypeDropdownOnChange() {
  clearTable(productTableBody);

  if (bevTypeDropdown.value == "select") {
    productTable.style.display = "none";
  } else {
    productTable.style.display = "block";
    fetch(`http://localhost:8081/api/products`)
      .then((response) => response.json())
      .then((data) => {
        for (let x of data) {
          if (bevTypeDropdown.value == x.categoryId) {
            let row = productTableBody.insertRow(-1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = `<a href="details.html?productId=${x.productId}">${x.productName}</a>`;
            cell2.innerHTML = `$${parseFloat(x.unitPrice).toFixed(2)}`;
            cell3.innerHTML = x.productId;
          }
        }
      });
  }
}

function clearTable(table) {
  table.replaceChildren();
}

function sort(data) {
  data.sort((a, b) => {
    let nameA = a.productName.toLowerCase(),
      nameB = b.productName.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}
