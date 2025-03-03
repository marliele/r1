async function loadData() {
    let allData = [];
    let nextPageUrl = 'https://catfact.ninja/breeds';

    while (nextPageUrl) {
        const response = await fetch(nextPageUrl);
        const data = await response.json();

        allData = allData.concat(data.data);
        nextPageUrl = data.next_page_url;
    }
    
    return allData;
}

module.exports = loadData;