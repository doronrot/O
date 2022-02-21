const utils = require("./utils");
const findEvents = utils.findEvents;


test('Should return one event', () => {
	const events = [{
		id: 0,
		name: 'Tiffany',
		timestamp: 1546300800
	}];
	const res = findEvents({
		timestamp: 1546300800,
		limit: 1,
		events,
	});

	expect(res.length).toBe(1);
});

test('Should return closest events - small offset', () => {
	// Arrange
	const events = createEvents();
	const someEvent = events.find(e => e.id === 2);

	// Act
	const result = findEvents({
		timestamp: someEvent.timestamp + 1,
		limit: 3,
		events,
	});

	// Assert
	const expectedIds = [2, 3, 1]
	const actualIds = result.map(e => e.id);
	expect(actualIds).toEqual(expectedIds);
});

test('Should return closest events - set', () => {
	// Arrange
	const events = createEvents();
	const someEvent = events.find(e => e.id === 2);

	// Act
	const result = findEvents({
		timestamp: someEvent.timestamp + 1,
		limit: 3,
		events,
	});

	// Assert
	const expectedIds = new Set([1, 2, 3])
	const actualIds = new Set(result.map(e => e.id));
	expect(actualIds).toEqual(expectedIds);
});

test('Should return closest events - 2', () => {
	// Arrange
	const events = createEvents();
	const someEvent = events.find(e => e.id === 2);

	// Act
	const result = findEvents({
		timestamp: someEvent.timestamp,
		limit: 4,
		events,
	});

	// Assert
	const expectedIds = [2, 1, 3, 4]
	const actualIds = result.map(e => e.id);
	expect(actualIds).toEqual(expectedIds);
});

test('Should return closest events - 3', () => {
	// Arrange
	const events = createEvents();
	const someEvent = events.find(e => e.id === 2);

	// Act
	const result = findEvents({
		timestamp: someEvent.timestamp,
		limit: 5,
		events,
	});

	// Assert
	const expectedIds = [2, 1, 3, 4, 0]
	const actualIds = result.map(e => e.id);
	expect(actualIds).toEqual(expectedIds);
});

test('Should return closest events - 3 set', () => {
	// Arrange
	const events = createEvents();
	const someEvent = events.find(e => e.id === 2);

	// Act
	const result = findEvents({
		timestamp: someEvent.timestamp,
		limit: 5,
		events,
	});

	// Assert
	const expectedIds = new Set([0, 1, 2, 3, 4])
	const actualIds = new Set(result.map(e => e.id));
	expect(actualIds).toEqual(expectedIds);
});

test('Should return closest events - near the end of the array TS+2', () => {
	// Arrange
	const events = createEvents();
	const someEvent = events.find(e => e.id === 4);

	// Act
	const result = findEvents({
		timestamp: someEvent.timestamp + 2,
		limit: 4,
		events,
	});

	// Assert
	const expectedIds = [4, 3, 5, 2]
	const actualIds = result.map(e => e.id);
	expect(actualIds).toEqual(expectedIds);
});

test('Should return closest events - near the end of the array TS+1', () => {
	// Arrange
	const events = createEvents();
	const someEvent = events.find(e => e.id === 4);

	// Act
	const result = findEvents({
		timestamp: someEvent.timestamp + 1,
		limit: 4,
		events,
	});

	// Assert
	const expectedIds = [4, 3, 2, 5]
	const actualIds = result.map(e => e.id);
	expect(actualIds).toEqual(expectedIds);
});

test('Should return closest events - near the end of the array', () => {
	// Arrange
	const events = createEvents();
	const someEvent = events.find(e => e.id === 4);

	// Act
	const result = findEvents({
		timestamp: someEvent.timestamp,
		limit: 4,
		events,
	});

	// Assert
	const expectedIds = [4, 3, 2, 1]
	const actualIds = result.map(e => e.id);
	expect(actualIds).toEqual(expectedIds);
});

test('Should return closest events - near the end of the array - set', () => {
	// Arrange
	const events = createEvents();
	const someEvent = events.find(e => e.id === 4);

	// Act
	const result = findEvents({
		timestamp: someEvent.timestamp,
		limit: 4,
		events,
	});

	// Assert
	const expectedIds = new Set([1, 2, 3, 4]);
	const actualIds = new Set(result.map(e => e.id));
	expect(actualIds).toEqual(expectedIds);
});

test('Should return closest events - near the end of the array - set TS+1', () => {
	// Arrange
	const events = createEvents();
	const someEvent = events.find(e => e.id === 4);

	// Act
	const result = findEvents({
		timestamp: someEvent.timestamp + 1,
		limit: 4,
		events,
	});

	// Assert
	const expectedIds = new Set([2, 3, 4, 5]);
	const actualIds = new Set(result.map(e => e.id));
	expect(actualIds).toEqual(expectedIds);
});

test('Should return closest events - near the end of the array - set TS+2', () => {
	// Arrange
	const events = createEvents();
	const someEvent = events.find(e => e.id === 4);

	// Act
	const result = findEvents({
		timestamp: someEvent.timestamp + 2,
		limit: 4,
		events,
	});

	// Assert
	const expectedIds = new Set([2, 3, 4, 5]);
	const actualIds = new Set(result.map(e => e.id));
	expect(actualIds).toEqual(expectedIds);
});

test('Should return closest events - near the start of the array', () => {
	// Arrange
	const events = createEvents();
	const someEvent = events.find(e => e.id === 1);

	// Act
	const result = findEvents({
		timestamp: someEvent.timestamp - 0.5,
		limit: 4,
		events,
	});

	const expectedIds = [1, 2, 3, 0]
	const actualIds = result.map(e => e.id);
	expect(actualIds).toEqual(expectedIds);
});

test('Should return closest events - TS greater than max TS in array', () => {
	// Arrange
	const events = createEvents();
	const someEvent = events.find(e => e.id === 5);

	// Act
	const result = findEvents({
		timestamp: someEvent.timestamp + 1,
		limit: 3,
		events,
	});

	// Assert
	const expectedIds = [5, 4, 3]
	const actualIds = result.map(e => e.id);
	expect(actualIds).toEqual(expectedIds);
});

function createEvents() {
	const events = [
		{
			id: 0,
			name: 'Tiffany',
			timestamp: 1546300800
		},
		{
			id: 1,
			name: 'Ronald',
			timestamp: 1546300809
		},
		{
			id: 2,
			name: 'Monica',
			timestamp: 1546300811
		},
		{
			id: 3,
			name: 'Izabella',
			timestamp: 1546300813
		},
		{
			id: 4,
			name: 'Liz',
			timestamp: 1546300819
		},
		{
			id: 5,
			name: 'Rachel',
			timestamp: 1546300830
		},
	];
	return events;
}