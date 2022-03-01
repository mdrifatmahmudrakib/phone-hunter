const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = "";

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

            div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top w-50" alt="...">
                <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text ">${phone.brand}</p>
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



    div.innerHTML = `
    <div class="card h-100">

        <div class="card-body">


        <h3>Name:${phone.name}</h3>
        <h6>Brand:${phone.brand}</h6>
        <img src="${phone.image}" class="card-img-top w-50" alt="...">
        <h4>Specifications</h4><br>
    
    
        <h5>Mainfeatures:</h5>
    
        <h6>Chipset:${phone.mainFeatures.chipSet}</h6>
        <h6>Displaysize:${phone.mainFeatures.displaySize}</h6>
        <h6>Memory:${phone.mainFeatures.memory}</h6>
        <h6>sensors:${phone.mainFeatures.sensors}</h6>
        <h6>storage:${phone.mainFeatures.storage}</h6><br>
    
        <h5>Others</h5>
        <h6>Bluetooth:${phone.others ? phone.others.Bluetooth : "None"}</h6>
        <h6>GPS:${phone.others ? phone.others.GPS : "None"}</h6>
        <h6>NFC:${phone.others ? phone.others.NFC : "None"}</h6>
        <h6>Radio:${phone.others ? phone.others.Radio : "None"}</h6>
        <h6>USB:${phone.others ? phone.others.USB : "None"}</h6>
        <h6>WLAN:${phone.others ? phone.others.WLAN : "None"}</h6>
    
        <h6>releaseDate:${phone.releaseDate ? phone.releaseDate : "Not Yet Lunched "}</h6>



        


        </div>
    </div>`;
    phoneDetails.appendChild(div);



}
