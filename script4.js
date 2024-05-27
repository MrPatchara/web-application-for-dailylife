let history = [];

function calculateGrade() {
  const studentNumber = document.getElementById('studentNumber').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const scoreInput = document.getElementById('score');
  const score = parseFloat(scoreInput.value);

  if (isNaN(score) || score < 0 || score > 100) {
    alert('กรุณาระบุคะแนนที่ถูกต้อง (0-100)');
    return;
  }

  let grade = '';

  if (score >= 90) {
    grade = 'A';
  } else if (score >= 80) {
    grade = 'B';
  } else if (score >= 70) {
    grade = 'C';
  } else if (score >= 60) {
    grade = 'D';
  } else {
    grade = 'F';
  }

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `ได้เกรด : <strong>${grade}</strong>`;

  const entry = {
    studentNumber: studentNumber,
    firstName: firstName,
    lastName: lastName,
    score: score,
    grade: grade
  };
  history.push(entry);

  updateHistoryTable();
}

function updateHistoryTable(data) {
  const historyBody = document.getElementById('historyBody');
  historyBody.innerHTML = '';

  (data || history).forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.studentNumber}</td>
      <td>${entry.firstName}</td>
      <td>${entry.lastName}</td>
      <td>${entry.score}</td>
      <td>${entry.grade}</td>
    `;
    historyBody.appendChild(row);
  });

  calculateStatistics();
}

function calculateStatistics() {
  if (history.length === 0) {
    document.getElementById('averageGrade').innerText = '-';
    document.getElementById('minGrade').innerText = '-';
    document.getElementById('maxGrade').innerText = '-';
    document.getElementById('stdDev').innerText = '-';
    return;
  }

  const grades = history.map(entry => entry.score);

  const sum = grades.reduce((total, grade) => total + grade, 0);
  const average = sum / history.length;
  const minGrade = Math.min(...grades);
  const maxGrade = Math.max(...grades);
  const stdDev = calculateStandardDeviation(grades);

  document.getElementById('averageGrade').innerText = average.toFixed(2);
  document.getElementById('minGrade').innerText = minGrade;
  document.getElementById('maxGrade').innerText = maxGrade;
  document.getElementById('stdDev').innerText = stdDev.toFixed(2);
}

function calculateStandardDeviation(values) {
  const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
  const variance = values.reduce((acc, val) => acc + (val - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}


function clearHistory() {
  history = [];
  updateHistoryTable();
}

function filterHistory() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const filteredHistory = history.filter(entry => {
    return (
      entry.studentNumber.toLowerCase().includes(searchTerm) ||
      entry.firstName.toLowerCase().includes(searchTerm) ||
      entry.lastName.toLowerCase().includes(searchTerm) ||
      entry.score.toString().includes(searchTerm) ||
      entry.grade.toLowerCase().includes(searchTerm)
    );
  });

  updateHistoryTable(filteredHistory);
}

updateHistoryTable();

