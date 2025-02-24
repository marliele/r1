const orderBy = require('./orderBy');
const data = [{name: 'Bob', age: 30, girl: '0'}, {name: 'Jane', age: 21, girl: '1'}, {name: 'Coal', age: 1, girl: '0'}];

test('Sort with one property', () => {
    const sorted = orderBy(data, ['name']);
    expect(sorted).toEqual([{name: 'Bob', age: 30, girl: '0'}, {name: 'Coal', age: 1, girl: '0'}, {name: 'Jane', age: 21, girl: '1'}]);  
});

test('Sort with mutliply properties', () =>{
    const sorted = orderBy(data, ['girl', 'age']);
    expect(sorted).toEqual([{name: 'Coal', age: 1, girl: '0'}, {name: 'Bob', age: 30, girl: '0'}, {name: 'Jane', age: 21, girl: '1'}]);
});

test('Data = array?', () => {
    expect(() => orderBy({}, ['name'])).toThrow("Where is array?");
});

test('Data = array of objects?', () => {
    expect(() => orderBy([0, 1], ['name'])).toThrow("Where is object array?");
});

test('All properties?', () => {
    expect(() => orderBy(data, ['city'])).toThrow("Missing property");
});