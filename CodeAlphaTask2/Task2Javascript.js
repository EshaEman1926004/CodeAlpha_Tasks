document.addEventListener('DOMContentLoaded', () => {
    const expenseTable = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
    const addExpenseButton = document.getElementById('addExpense');
    const totalAmountElem = document.getElementById('totalAmount');
    let totalAmount = 0;

    addExpenseButton.addEventListener('click', () => {
        const expenseName = document.getElementById('expenseName').value.trim();
        const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

        if (expenseName === '' || isNaN(expenseAmount) || expenseAmount <= 0) {
            alert('Please enter a valid expense name and amount.');
            return;
        }

        addExpense(expenseName, expenseAmount);
        updateTotalAmount();
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
    });

    function addExpense(name, amount) {
        const row = expenseTable.insertRow();
        row.innerHTML = `
            <td>${name}</td>
            <td>$${amount.toFixed(2)}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;

        row.querySelector('.edit').addEventListener('click', () => editExpense(row, name, amount));
        row.querySelector('.delete').addEventListener('click', () => deleteExpense(row, amount));
    }

    function editExpense(row, oldName, oldAmount) {
        const newName = prompt('Enter new name:', oldName);
        const newAmount = parseFloat(prompt('Enter new amount:', oldAmount));

        if (newName && !isNaN(newAmount) && newAmount > 0) {
            row.cells[0].innerText = newName;
            row.cells[1].innerText = $${newAmount.toFixed(2)};
            updateTotalAmount();
        } else {
            alert('Please enter valid values.');
        }
    }

    function deleteExpense(row, amount) {
        row.remove();
        totalAmount -= amount;
        updateTotalAmount();
    }

    function updateTotalAmount() {
        totalAmount = 0;
        const rows = expenseTable.getElementsByTagName('tr');
        for (let row of rows) {
            const amountCell = row.cells[1];
            if (amountCell) {
                totalAmount += parseFloat(amountCell.innerText.replace('$', ''));
            }
        }
        totalAmountElem.innerText = totalAmount.toFixed(2);
    }
});