const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
};

const displayPhone = phones => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
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

const loadPhoneDetails = Id => {
    const url = `https://openapi.programming-hero.com/api/phone/${Id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}


const displayPhoneDetails = phone => {
    console.log(phone);

    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('col');

    div.innerHTML = `
    <div class="card h-100">

        <div class="card-body">
        <img src="${phone.image}" class="card-img-top w-50" alt="...">
        <h5 class="card-title"><strong>Brand:</strong> ${phone.brand}</h5>
        
        <h5 class="card-title"><strong>Chipset:</strong> ${phone.mainFeatures.chipSet}</h5>
        <h5 class="card-title"><strong>Displaysize:</strong> ${phone.mainFeatures.displaySize}</h5>
        <h5 class="card-title"><strong>Memory:</strong> ${phone.mainFeatures.memory}</h5>
        <h5 class="card-title"><strong>Storage:</strong> ${phone.mainFeatures.storage}</h5>
        <h5 class="card-title"><strong>Sensors:</strong> ${phone.mainFeatures.sensors}</h5>
        <h5class="card-title"><strong>ReleaseDate:</strong> ${phone.releaseDate ? phone.releaseDate : "Not Yet Lunched "}</h5>


        
        </div>
    </div>`;
    phoneDetails.appendChild(div);


}
