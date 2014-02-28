
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

//check urls for trailing slash
//if trailing slash exists in object or array, simply remove that object/array

