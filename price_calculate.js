const purchasePrice = document.getElementById("purchasePrice");
const priceWithGst = document.getElementById("priceWithGst");
const shippingCharge = document.getElementById("shippingCharge");
const netPrice = document.getElementById("netPrice");
const exchangeRate = document.getElementById("exchangeRate");
const finalPrice = document.getElementById("finalPrice");
const selectedCurrency = document.getElementById("selectedCurrency");
const convertCurrency = document.getElementById("convertCurrency");
const ebayCommission = document.getElementById("ebayCommission");

// GST Calucation
const gstCalculation = () => {
	if(purchasePrice.value !== "") {
		let gstAmount = (purchasePrice.value*(18/100));
	priceWithGst.value = parseInt(purchasePrice.value) + gstAmount;
	netPriceCalculate();
	} else {
		priceWithGst.value = "";
		netPriceCalculate();
	}
	
};

// Total Price With Shipping Charge
const netPriceCalculate = () => {
	if(shippingCharge.value !== "" && priceWithGst.value !== "") {
		netPrice.value = parseInt(shippingCharge.value) + parseInt(priceWithGst.value);
	} else {
		netPrice.value = "";
	}
};

//Check Currency Rate
const checkCurrencyRate = () => {
	if(exchangeRate.value !== "") {
		if(parseInt(exchangeRate.value) >= 40 && parseInt(exchangeRate.value) < 50) {
		selectedCurrency.innerText = "Final Price in AUD $";
		} else if (parseInt(exchangeRate.value) >= 50  && parseInt(exchangeRate.value) < 56) {
			selectedCurrency.innerText = "Final Price in CAD $";
		} else if (parseInt(exchangeRate.value) >= 60  && parseInt(exchangeRate.value) < 75){
			selectedCurrency.innerText = "Final Price in USD $";
		} else {
			selectedCurrency.innerText = "$";
		}
	} else {
		selectedCurrency.innerText = "$";
	}
}

// Get final Price
const getFinalPrice = () => {
	if(netPrice.value !== "" && exchangeRate.value !== "") {
		let getExchangePrice = parseInt(netPrice.value)/parseInt(exchangeRate.value);

		if(ebayCommission.value !== "") {
			finalPrice.value = getExchangePrice + (getExchangePrice*(parseInt(ebayCommission.value)/100));
		} else {
			finalPrice.value = "";
			ebayCommission.focus();
		}
		
		checkCurrencyRate();
	} else {
		finalPrice.value = "";
	}
}

purchasePrice.addEventListener("keyup", gstCalculation);

shippingCharge.addEventListener("keyup", netPriceCalculate);

// exchangeRate.addEventListener("keyup", checkCurrencyRate);

convertCurrency.addEventListener("click", getFinalPrice);