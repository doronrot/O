function findEvents(options){
	const timestamp = options.timestamp;
	const limit = options.limit;
	const events = options.events;	// array

	closestTimestampIndex = binarySearchTimestamp(events, timestamp);

	eventsByLimit = getEventsByLimit(events, closestTimestampIndex, timestamp, limit);

	return eventsByLimit;
}

// finds and returns index of event with timestamp x or the closest to it if doesn't exist
function binarySearchTimestamp(arr, x){
	let arrLength = arr.length;
	if (arrLength == 0){
		return "empty array"; // or error
	}

	let closestEventIndex = 0;
	let left = 0;
	let right = arr.length - 1;
	let mid;
	let minTimestampDiff = Math.abs(arr[closestEventIndex].timestamp - x);

	while (left <= right){
		mid = Math.floor(left + (right - left) / 2);
		currEventTimestamp = arr[mid].timestamp;
		currTimestampDiff = x - currEventTimestamp; // pos or neg. if neg then go left
		if (currTimestampDiff == 0){	// timestmap x found
			return mid;
		}

		currTimestampDiffAbs = Math.abs(currTimestampDiff);
		if (currTimestampDiffAbs < minTimestampDiff){
			minTimestampDiff = currTimestampDiffAbs;
			closestEventIndex = mid;
		}

		if (currTimestampDiff < 0){ // keep searching to the left
			right = mid - 1;
		}
		else {
			left = mid + 1;
		}
	}
	return closestEventIndex;
}

function getEventsByLimit(arr, closestIndex, x, limit){
	let arrLength = arr.length;
	if (arrLength == 0){
		return "empty array"; // or error
	}
	if (limit == 0){
		return "limit is 0."; // or error
	}
	if (arrLength <= limit){
		return arr;
	}

	let resultEvents = [arr[closestIndex]];
	let leftIndex = closestIndex - 1;
	let rigthIndex = closestIndex + 1;
	let leftDiff;
	let rightDiff;

	// adding closest event (by timestamp) to result array by comparing left and right closest indexes
	while (resultEvents.length < limit && leftIndex >= 0 && rigthIndex < arrLength){
		
		leftDiff = x - arr[leftIndex].timestamp;
		rightDiff = arr[rigthIndex].timestamp - x;
		if (leftDiff <= rightDiff){
			resultEvents.push(arr[leftIndex]);
			leftIndex--;
		}
		else{
			resultEvents.push(arr[rigthIndex]);
			rigthIndex++;
		}
	}

	// if we reached the end (or beginning, respectively) of the array, we'll move only to the other side
	while (resultEvents.length < limit && leftIndex >= 0){
		resultEvents.push(arr[leftIndex]);
		leftIndex--;
	}
	while (resultEvents.length < limit && rigthIndex < arrLength){
		resultEvents.push(arr[rigthIndex]);
		rigthIndex++;
	}

	return resultEvents;
}

module.exports = { findEvents };
