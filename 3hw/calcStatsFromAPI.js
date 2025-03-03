const loadDataModule = require('./loadData');
const calcStats = require('./calcStats');

async function calcStatsFromAPI() {
    const catsInfo = await loadDataModule.loadData();

    return calcStats(catsInfo);
}

module.exports = calcStatsFromAPI;