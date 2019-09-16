const lineReader = require('line-reader');



// this is a callback function to find out final result
function userlist(filename,distance,latitude,longitude,cb)
{
    var x=[];
    var finaluser;
    
lineReader.eachLine(filename, function(line,last) {
   
    x.push(JSON.parse(line));

    if(last){
        
     finaluser= calculate(x,distance,latitude,longitude).sort(function(a, b) {
        return a.user_id - b.user_id;
  
      }) ;

      cb(finaluser);
      }
    
});

}

//for filtering out of those users who are within 100km

function calculate(users,distance,latitude,longitude)
{
    let selecteduser=[];
    var R = 6371; // Radius of the earth in km
    for(var i=0;i<users.length;i++)
   {
    
    var dLat = degreetorad(users[i].latitude-latitude);  
    var dLon = degreetorad(users[i].longitude-longitude); 
    var a =  Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(degreetorad(latitude)) * Math.cos(degreetorad(users[i].latitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    if(d<=distance)
    {
        var shakti={
            name:users[i].name,
            user_id:users[i].user_id
        }
        selecteduser.push(shakti);   
    }
    }
    return selecteduser;
}

function degreetorad(deg) { //to convert from degree to radian
    return deg * (Math.PI/180)
  }

  
  
  module.exports = userlist;