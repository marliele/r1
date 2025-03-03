const calcStatsFromAPI = require('./calcStatsFromAPI');
const loadDataModule = require('./loadData');

jest.mock('./loadData');
const mockData = [
    { breed: 'Abyssinian', country: 'Ethiopia' },
    { breed: 'Aegean', country: 'Greece' },
    { breed: 'American Bobtail', country: 'United States' },
    { breed: 'American Curl', country: 'United States' }
];

test('calcStatsFromAPI returns correct stats (mock)', async () => {
    loadDataModule.loadData.mockResolvedValue(mockData);

    const stats = await calcStatsFromAPI();

    expect(stats).toEqual({
        Ethiopia: 1,
        Greece: 1,
        'United States': 2,
    });

    expect(loadDataModule.loadData).toHaveBeenCalledTimes(1);
});

test('calsStatsFromAPI returns correct stats (spyOn)', async () => {
    const spyloadData = jest.spyOn(loadDataModule, "loadData");
    spyloadData.mockResolvedValue(mockData);

    const result = await calcStatsFromAPI();

    expect(result).toEqual({
        Ethiopia: 1,
        Greece: 1,
        'United States': 2,
    });

    expect(spyloadData).toHaveBeenCalledTimes(2);

    spyloadData.mockRestore();
})