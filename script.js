function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // convert cm to meters

    if (isNaN(weight) || isNaN(height) || height <= 0) {
        alert('ใส่ข้อมูลให้ครบด้วยจ้า...');
        return;
    }

    const bmi = weight / (height * height);
    let category = '';

    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Results</h2>
        <p>BMI: ${bmi.toFixed(2)}</p>
        <p>Category: ${category}</p>
    `;
}
