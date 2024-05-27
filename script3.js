document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.getElementById('number');
    const baseFromSelect = document.getElementById('base-from');
    const baseToSelect = document.getElementById('base-to');
    const convertBtn = document.getElementById('convert-btn');
    const resetBtn = document.getElementById('reset-btn');
    const copyBtn = document.getElementById('copy-btn');
    const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
    const resultDiv = document.getElementById('result');
    const historyDiv = document.getElementById('history');

    const isValidNumber = (number, base) => {
        const validChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, base);
        return number.split('').every(char => validChars.includes(char.toUpperCase()));
    };

    const convertNumber = () => {
        const number = numberInput.value.trim();
        const baseFrom = parseInt(baseFromSelect.value);
        const baseTo = parseInt(baseToSelect.value);

        if (number === '') {
            resultDiv.textContent = 'โปรดใส่ตัวเลขที่ถูกต้อง';
            return;
        }

        if (!isValidNumber(number, baseFrom)) {
            resultDiv.textContent = `ข้อมูลไม่ถูกต้อง เลขฐาน ${baseFrom}.`;
            return;
        }

        try {
            const decimalNumber = parseInt(number, baseFrom);
            const convertedNumber = decimalNumber.toString(baseTo).toUpperCase();
            resultDiv.textContent = `ผลลัพธ์: ${convertedNumber}`;
            addHistoryItem(number, baseFrom, convertedNumber, baseTo);
        } catch (error) {
            resultDiv.textContent = error.message;
        }
    };

    const addHistoryItem = (number, baseFrom, convertedNumber, baseTo) => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.textContent = `${number} (ฐาน ${baseFrom}) -> ${convertedNumber} (ฐาน ${baseTo})`;
        historyDiv.appendChild(historyItem);
    };

    const resetFields = () => {
        numberInput.value = '';
        resultDiv.textContent = '';
    };

    const copyResultToClipboard = () => {
        const resultText = resultDiv.textContent.replace('Result: ', '');
        navigator.clipboard.writeText(resultText)
            .then(() => alert('Result copied to clipboard!'))
            .catch(err => alert('Failed to copy result.'));
    };

    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
    };

    convertBtn.addEventListener('click', convertNumber);
    resetBtn.addEventListener('click', resetFields);
    copyBtn.addEventListener('click', copyResultToClipboard);
    toggleDarkModeBtn.addEventListener('click', toggleDarkMode);
});
