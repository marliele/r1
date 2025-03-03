const calcStatsFromAPI = require('./calcStatsFromAPI');
const loadData = require('./loadData');

jest.mock('./loadData');

test('calcStatsFromAPI returns correct stats', async () => {
    const mockData = [
        { breed: 'Abyssinian', country: 'Ethiopia', origin: 'Natural', coat: 'Short', pattern: 'Ticked' },
        { breed: 'Aegean', country: 'Greece', origin: 'Natural', coat: 'Semi-long', pattern: 'Bi- or tri-colored' },
        { breed: 'American Bobtail', country: 'United States', origin: 'Mutation', coat: 'Short', pattern: 'All' },
        { breed: 'American Curl', country: 'United States', origin: 'Mutation', coat: 'Short', pattern: 'All' },
    ];

    loadData.mockResolvedValue(mockData);

    const stats = await calcStatsFromAPI();

    expect(stats).toEqual({
        'Ethiopia': 1,
        'Greece': 1,
        'United States': 2,
    });
});