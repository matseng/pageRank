
var graphObj = getGraphObject();

var hasTrailingSlash = function(str){
  if(str[str.length - 1] === "/")
    return true;
  return false;
}

var removeTrailingSlashes = function (graphObj) {
  for(var key in graphObj){
    if(hasTrailingSlash(key))
      delete graphObj[key];
    else {
      var arr = graphObj[key];
      for(var i = 0; i < arr.length; i++){
        if(hasTrailingSlash(arr[arr.length - 1]))
          arr.splice(i, 1);
      }
    }
  }
  return graphObj;
}

cleanGraphObj = removeTrailingSlashes(graphObj);
console.log(cleanGraphObj);

//Sum of entire column - the first column in index 1 (one) NOT 0
Matrix.prototype.sumCol = function(j){
  var col = this.col(j);
  var sum = 0;
  col.each(function(val){
    sum += val;
  });
  return sum;
}

//Sets each value of column j to val. Recall that the first column is 1 (one)
Matrix.prototype.setColumn = function(j, val){
  for(var i = 0; i < this.elements.length; i++){
    this.elements[i][j - 1] = val;  
  }
}

Matrix.prototype.setAllToValue = function(x, y, val){
  var arr = [];
  for(var i = 0; i < x; i++){
    var arrRow = [];
    for(var j = 0; j < y; j++){
      arrRow.push(val);
    }
    arr.push(arrRow);
  }
  return Matrix.create(arr);
}

//Dangling nodes do not have outbound links
var getDanglingNodesMatrix = function(M){
  var length = M.rows();  //same are number of columns
  var dnMatrix = Matrix.Zero(length, length);

  for(var j = 1; j <= length; j++){
    if(M.sumCol(j) === 0){
      dnMatrix.setColumn(j, 1 / length);
    }
  }
  return dnMatrix;
}


var main = function(){
  var dF = 0.85;  //damping factor

//Left stochastic matrix is a square matrix of nonnegative real numbers, with each column summing to 1.
  var adjacencyMatrix = $M(
    [[0, .5, 0], 
    [1, 0, 0],
    [0, .5, 0]]
  );

  var length = adjacencyMatrix.elements[0].length;
  console.log(adjacencyMatrix.inspect());

  var danglingNodesMatrix = getDanglingNodesMatrix(adjacencyMatrix);
  console.log(danglingNodesMatrix.inspect());

  var onesMatrix = Matrix.prototype.setAllToValue(length, length, 1);
  console.log(onesMatrix.inspect());

  var G = (adjacencyMatrix.add(danglingNodesMatrix)).multiply(dF)
    .add(onesMatrix.multiply((1 - dF) / length));
  console.log(G.inspect());

}();


/*

[Offset + Matrix] * x = Eig * x 
Count number of nodes -> 1 / sum * 0.15 is offset



[5 x 5] [5 x 1] = [5 x 1]

*/
