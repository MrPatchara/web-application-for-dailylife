const ctx = document.getElementById('myChart').getContext('2d');
let incomeData = [];
let expensesData = [];
let netData = [];
let labels = [];

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'รายรับ',
                data: incomeData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'รายจ่าย',
                data: expensesData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'คงเหลือ',
                data: netData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function addData() {
    const date = document.getElementById('date').value;
    const income = parseFloat(document.getElementById('income').value);
    const expenses = parseFloat(document.getElementById('expenses').value);
    const total = income - expenses;

    if (date && !isNaN(income) && !isNaN(expenses)) {
        labels.push(date);
        incomeData.push(income);
        expensesData.push(expenses);
        netData.push(total);
        myChart.update();
        updateTable(date, income, expenses, total);
        updateOverallTotal();
        document.getElementById('dataForm').reset();
    }
}

function updateTable(date, income, expenses, total) {
    const tableBody = document.getElementById('reportTable').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
    const dateCell = newRow.insertCell(0);
    const incomeCell = newRow.insertCell(1);
    const expensesCell = newRow.insertCell(2);
    const totalCell = newRow.insertCell(3);
    dateCell.textContent = date;
    incomeCell.textContent = income;
    expensesCell.textContent = expenses;
    totalCell.textContent = total;
}

function updateOverallTotal() {
    const overallTotalCell = document.getElementById('overallTotal');
    const overallTotal = netData.reduce((sum, value) => sum + value, 0);
    overallTotalCell.textContent = overallTotal;
}

function exportToExcel() {
    const table = document.getElementById('reportTable');
    const wb = XLSX.utils.table_to_book(table, { sheet: "Report" });
    XLSX.writeFile(wb, 'report.xlsx');
}
