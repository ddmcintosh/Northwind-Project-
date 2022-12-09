"use strict";

window.onload = function () {
  const urlParams = new URLSearchParams(location.search);

  let productId = -1;
  if (urlParams.has("productId") === true) {
    productId = urlParams.get("productId");

    fetch("http://localhost:8081/api/products/" + productId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let display = document.getElementById("detailsDisplay");

        display.innerHTML =
          "<span style='color: black; '> Product ID : </span>" +
          data.productId +
          "<br />" +
          "<span style='color: black ; '> Category ID : </span>" +
          data.categoryId +
          "<br />" +
          "<span style='color: black; '> Product Name : </span> " +
          data.productName +
          "<br />" +
          "<span style='color: black ; '>  Unit Price : </span>" +
          data.unitPrice +
          "<br />" +
          "<span style='color: black ; '> Unit in Stock: </span>" +
          data.unitsInStock +
          "<br />" +
          "<span style='color: black ; '> Supplier : </span>" +
          data.supplier;
      });
  }
};
