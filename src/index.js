/**
 * @param preferences - an array of integers. Indices of people, whom they love
 * @returns number of love triangles
 */

module.exports = function getLoveTrianglesCount(preferences = []) {
  let numberOfTriangles = 0;
  const loveTriangles = [];
  const loveTriangleKeys = [];
  debugger;
  
  for (let i = 0; i < preferences.length; i++) {
    let triangle = [];

    if(getTriangle(i, preferences, triangle)){
      
      if(triangle.length < 3) {
        continue;
      }

      if(ifTriangleNotExists(loveTriangleKeys, triangle))
      {
        const key = generateTriangleKey(triangle);

        loveTriangleKeys.push(key);
        loveTriangles.push(triangle);
      }
    }
  }

  debugger;

  return loveTriangles.length;
};

function generateTriangleKey(triangle) {
  return triangle.join('|');
}

function generateAllTriangleKeys(triangle) {
  const keyArray = [];

  for (let i = 0; i < triangle.length; i++) {
    let key = null;

    for (let j = i; j < triangle.length; j++) {
      if(!key) {
        key = `${triangle[j]}`;
      } else {
        key += `|${triangle[j]}`;
      }
    }

    for (let j = 0; j < i; j++) {
      if(!key) {
        key = `${triangle[j]}`;
      } else {
        key += `|${triangle[j]}`;
      }
    }

    if(key) {
      keyArray.push(key);
    }
  }

  return keyArray;
}

function ifTriangleNotExists(loveTriangleKeys, triangle) {
  const allTriangleKeys = generateAllTriangleKeys(triangle);

  return !loveTriangleKeys.some(existKey => allTriangleKeys.some(newKey => newKey === existKey));
}

function getTriangle(position, preferences, triangle) {
  if (!preferences[position]) {
    triangle.length = 0;
    return false;
  }

  const corner = preferences[position];
  const nextCorner = position + 1;

  if (triangle[0] === corner) {
    return true;
  }

  const nextPosition = preferences.findIndex(p => p === nextCorner);

  triangle.push(corner);

  return getTriangle(nextPosition, preferences, triangle)
}