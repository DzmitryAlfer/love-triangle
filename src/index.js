/**
 * @param preferences - an array of integers. Indices of people, whom they love
 * @returns number of love triangles
 */

module.exports = function getLoveTrianglesCount(preferences = []) {
  const loveTriangleKeys = [];

  for (let i = 0; i < preferences.length; i++) {
    let currentLoveTriangles = [];

    getLoveTriangles(i, preferences, currentLoveTriangles, []);

    currentLoveTriangles.forEach(triangle => {
      if(ifTriangleNotExists(loveTriangleKeys, triangle))
      {
        const key = generateTriangleKey(triangle);

        loveTriangleKeys.push(key);
      }
    });
  }

  return loveTriangleKeys.length;
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

function getLoveTriangles(position, preferences, currentLoveTriangles, currentTriangle) {
  if (preferences.length <= position) {
    return;
  }

  const currentCorner = preferences[position];

  if(currentTriangle.length === 3) {
    if (currentTriangle[0] === currentCorner) {
      currentLoveTriangles.push(currentTriangle);
    }
    return;
  }

  currentTriangle.push(currentCorner);

  const nextCorner = position + 1;

  if(nextCorner === currentCorner)
  {
    return;
  }

  const nextPositions = preferences.reduce((acc, cur, idx) => {
    if(cur === nextCorner) {
      acc.push(idx);
    }
    
    return acc;
  }, []);

  nextPositions.forEach(nextPosition => {
    getLoveTriangles(nextPosition, preferences, currentLoveTriangles, currentTriangle.slice(0))
  });
}