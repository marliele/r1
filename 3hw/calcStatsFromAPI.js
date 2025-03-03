const loadData = require('./loadData');
const calcStats = require('./calcStats');

async function calcStatsFromAPI() {
    const catsInfo = await loadData();

    return calcStats(catsInfo);
}

module.exports = calcStatsFromAPI;