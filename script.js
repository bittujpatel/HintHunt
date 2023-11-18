function redeemVachan() {
    const redemptionCodeInput = document.getElementById('redemptionCode');
    const redeemedMessageSection = document.getElementById('redeemedMessage');

    // Check if the entered code is correct
    if (redemptionCodeInput.value === '8088') {
        // Hide QR and redemption sections
        document.getElementById('qrSection').style.display = 'none';
        document.getElementById('redemptionSection').style.display = 'none';

        // Display the redeemed message
        redeemedMessageSection.style.display = 'block';
    } else {
        // Handle incorrect redemption code
        alert('Incorrect redemption code. Please try again.');
    }
}
