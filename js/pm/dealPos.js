//dealPos.js used to deal with the position from map to axis or reverse 

//Get the address bar parameters
function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

//Get the AOD value of the space position
function getAODValue(px,py,pz)
{
return 0;
}


//get Longitude, latitude and height according to the position of the particles in the map
var position2HeightLonLat1 = function (px,py,pz)
{
 var lon,lat,height;
 
 var fromx = - (SVGTOGRIDX - SVGFROMGRIDX) / 2;
 var fromy = - (SVGTOGRIDY - SVGFROMGRIDY) / 2;
 //Calculate the conversion ratio of SVG image coordinates and canvas coordinates
 var radioX = SVGTOGRIDX / window.innerWidth ;
 var radioY = SVGFROMGRIDY / window.innerHeight ;
 
 lon = SVGFROMLON + ((SVGTOLON - SVGFROMLON) / (SVGTOGRIDX - SVGFROMGRIDX)) * (px * radioX - fromx );
 lat = SVGFROMLAT + ((SVGTOLAT - SVGFROMLAT) / (SVGTOGRIDY - SVGFROMGRIDY)) * (py * radioY - fromy);
 height = 0 + ((MAXHEIGHT - 0) / (TOGRIDH - FROMGRIDH)) * (pz - FROMGRIDH);
 console.log(radioX,radioY);
 return [lon,lat,height];

};

//get Longitude, latitude and height according to the position of the particles in the map 
var position2HeightLonLat = function (px,py,pz)
{
 var lon,lat,height;
 
 //lon = SVGFROMLON + ((TOLON - FROMLON) / (TOGRIDX - FROMGRIDX)) * (px - FROMGRIDX);
 //lat = SVGFROMLAT + ((TOLAT - FROMLAT) / (TOGRIDY - FROMGRIDY)) * (py - FROMGRIDY);
 lon = FROMLON + ((TOLON - FROMLON) / (TOGRIDX - FROMGRIDX)) * (px - FROMGRIDX);
 lat = FROMLAT + ((TOLAT - FROMLAT) / (TOGRIDY - FROMGRIDY)) * (py - FROMGRIDY); 
 height = 0 + ((MAXHEIGHT - 0) / (TOGRIDH - FROMGRIDH)) * (pz - FROMGRIDH);
 //console.log(pz);
 return [lon,lat,height];

};

//Obtaining the sequence number of the array based on height and latitude and longitude
function heightLonLat2Grid(curHeight,curLat,curLon)
{
  var index,xn,yn,zn;
  
  xn = Math.round((curLon-FROMLON)/((TOLON - FROMLON) / LONCOUNT));
  yn = Math.round((curLat-FROMLAT)/((TOLAT - FROMLAT) / LATCOUNT));
  zn = Math.round((curHeight)/(MAXHEIGHT / HCOUNT));
  
  index = zn * (LONCOUNT + 1) * (LATCOUNT + 1 ) + yn * (LONCOUNT + 1) + xn;
  return index;
}

  //get position value
  
  function getValue(px,py,pz){
  
  var temp = Math.log(pz);
  temp = temp * Math.sin( py  / 500);
  temp = temp * Math.cos( px  / 1000);
  
  temp = temp/5;
   if (temp < 0)
   {
     temp = 0.1;
    }
   if (temp > 1)
   {
     temp = 0.9;
    }

   
  return temp;   
  }