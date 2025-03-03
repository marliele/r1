function orderBy (arr, properties) {
    if (!Array.isArray(arr)){
        throw new Error ('Where is array?');
    }

    arr.forEach(item => {
        if (typeof item != 'object'){
            throw new Error ('Where is object array?');
        };

        for (const property of properties){
            if (!(property in item)){
                throw new Error('Missing property');
            }
        }
    });
    return [...arr].sort((a, b) =>{
        for (const property of properties){
            if (a[property] > b[property]) return 1;
            if (a[property] < b[property]) return -1;
        }
        return 0;
    });
}

module.exports = orderBy;