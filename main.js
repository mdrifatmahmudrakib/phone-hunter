const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = "";


    // error handling
    const errorMsg = document.getElementById('error-result');
    const errorempty = document.getElementById('error-empty');
    const searchResult = document.getElementById('search-result');
    const phoneDetails = document.getElementById('phone-details');
    if (searchText == '') {
        phoneDetails.textContent = '';
        searchResult.textContent = '';
        errorMsg.style.display = 'none';
        errorempty.style.display = 'block';
    }
    else {
        errorempty.style.display = 'none';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data.slice(0, 20)))
    }


};
// Display item after search result
const displayPhone = phones => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    const phoneDetails = document.getElementById('phone-details');

    phoneDetails.textContent = '';

    const errorMsg = document.getElementById('error-result');
    if (phones.length == 0) {
        errorMsg.style.display = 'block';
    }
    else {
        errorMsg.style.display = 'none';
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');

            // dynamic Div for search result
            div.innerHTML = `
        <div class="card h-100 pt-3 shadow-lg p-3 bg-body rounded">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body mx-auto">
            <h5 class="card-title text-center">${phone.phone_name}</h5>
            <p class="card-text text-center ">${phone.brand}</p>
        
                </div>
                <div class="mx-auto">
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" type="button">View Details</button>
                </div>
        </div>`;
            searchResult.appendChild(div);
        })
    }


}

const loadPhoneDetails = Id => {
    const url = `https://openapi.programming-hero.com/api/phone/${Id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}


const displayPhoneDetails = phone => {
    console.log(phone);

    const phoneDetails = document.getElementById('phone-details');

    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col');

    // dynamic Div for each product 

    div.innerHTML = `
    
    <div class="card h-100 mt-4 shadow-lg p-3 mb-5 bg-body rounded">
    <h2 class="text-center"><b>${phone.name}</b></h2>
    <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body">
        <h4 class="text-center"><b>Specifications</b></h4>
        <h5>Mainfeatures</h5>
        <h6><strong>Chipset:</strong> ${phone.mainFeatures.chipSet}</h6>
        <h6><strong>Displaysize:</strong> ${phone.mainFeatures.displaySize}</h6>
        <h6><strong>Memory:</strong> ${phone.mainFeatures.memory}</h6>
        <h6><strong>Sensors:</strong> ${phone.mainFeatures.sensors}</h6>
        <h6>
        <strong>Storage:</strong>
        ${phone.mainFeatures.storage}</h6><br>
    
        <h5>Others</h5>
        <h6><strong>Bluetooth:</strong>
        ${phone.others ? phone.others.Bluetooth : "No"}</h6>
        <h6>
        <strong>GPS:</strong> ${phone.others ? phone.others.GPS : "No"}</h6>
        <h6><strong>NFC:</strong> ${phone.others ? phone.others.NFC : "No"}</h6>
        <h6><strong>Radio:</strong> ${phone.others ? phone.others.Radio : "No"}</h6>
        <h6><strong>USB:</strong> ${phone.others ? phone.others.USB : "No"}</h6>
        <h6><strong>WLAN:</strong> ${phone.others ? phone.others.WLAN : "No"}</h6>
    
        <h6><strong>Release date:</strong> ${phone.releaseDate ? phone.releaseDate : "Date not Found "}</h6>

        </div>
    </div>`;
    phoneDetails.appendChild(div);



}
