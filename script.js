document.addEventListener("DOMContentLoaded", function() {
  const table = document.getElementById('menuTable');
  const totalRow = document.getElementById('totalRow');
  const overallQuantityElement = document.getElementById('overallQuantity');
  const overallTotalElement = document.getElementById('overallTotal');

  // Add event listener to the table for click events
  table.addEventListener('click', function(event) {
    const target = event.target;

    // Check if the clicked element is a button with the class 'add' or 'remove'
    if (target.classList.contains('add') || target.classList.contains('remove')) {
      const row = target.closest('tr'); // Find the closest ancestor tr element

      if (row) {
        const index = Array.from(row.parentNode.children).indexOf(row); // Get the index of the row

        // Call the updateQuantity function with the index and the appropriate change value
        updateQuantity(index, target.classList.contains('add') ? 1 : -1);

        // Update the overall total
        updateOverallTotal();
      }
    }
  });

  // Function to update quantity, price, and total
  function updateQuantity(index, change) {
    const quantityElement = document.querySelector(`#menuTable tr:nth-child(${index + 1}) .quantity span`);
    const priceElement = document.querySelector(`#menuTable tr:nth-child(${index + 1}) .price`);
    const totalElement = document.querySelector(`#menuTable tr:nth-child(${index + 1}) .total`);
    
    let quantity = parseInt(quantityElement.innerText);
    let price = parseInt(priceElement.innerText);

    // Update quantity and prevent going below 0
    quantity = Math.max(0, quantity + change);

    // Update total
    const total = quantity * price;
    totalElement.innerText = total;

    // Update quantity display
    quantityElement.innerText = quantity;
  }

  // Function to update the overall total
  function updateOverallTotal() {
    let overallQuantity = 0;
    let overallTotal = 0;
    const currencySymbol = 'Rs. ';
  
    // Loop through each row (excluding the last row, which is the total row)
    for (let i = 0; i < table.rows.length - 1; i++) {
      const quantityElement = document.querySelector(`#menuTable tr:nth-child(${i + 1}) .quantity span`);
      const totalElement = document.querySelector(`#menuTable tr:nth-child(${i + 1}) .total`);
  
      // Check if the elements are not null before reading properties
      if (quantityElement && totalElement) {
        overallQuantity += parseInt(quantityElement.innerText);
        overallTotal += parseInt(totalElement.innerText);
      }
    }
  
    // Update the overall total row
    if (overallQuantityElement && overallTotalElement) {
      overallQuantityElement.innerText = overallQuantity;
      overallTotalElement.innerText = currencySymbol + overallTotal;
    }
  }
  
});
