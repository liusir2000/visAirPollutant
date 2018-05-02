//pmModel.js: the function to build model for pollution

  //Create a cube, length, width, height and position (with a flat flat cube)
function createMesh(geom, imageFile, direct, opacity , visible) {
       var texture = THREE.ImageUtils.loadTexture(imageFile);
      //var mat = new THREE.MeshPhongMaterial();
	  var mat = new THREE.MeshBasicMaterial({transparent:true,opacity: opacity, visible:visible});
      mat.map = texture;//The Map attribute of the material used to load texture
	  var bricks = [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)];
	  geom.faceVertexUvs[0] = [];
	  geom.faceVertexUvs[0][0] = [ bricks[3], bricks[1], bricks[0] ];
      geom.faceVertexUvs[0][1] = [ bricks[1], bricks[2], bricks[3] ];	  
	  geom.faceVertexUvs[0][2] = [ bricks[0], bricks[1], bricks[3] ];
      geom.faceVertexUvs[0][3] = [ bricks[1], bricks[2], bricks[3] ];

	  geom.faceVertexUvs[0][4] = [ bricks[0], bricks[1], bricks[3] ];
      geom.faceVertexUvs[0][5] = [ bricks[1], bricks[2], bricks[3] ];
	  geom.faceVertexUvs[0][6] = [ bricks[0], bricks[1], bricks[3] ];
      geom.faceVertexUvs[0][7] = [ bricks[1], bricks[2], bricks[3] ];
	  
      geom.faceVertexUvs[0][8] = [ bricks[3], bricks[0], bricks[2] ];
      geom.faceVertexUvs[0][9] = [ bricks[0], bricks[1], bricks[2] ];
	  geom.faceVertexUvs[0][10] = [ bricks[2], bricks[1], bricks[3] ];
      geom.faceVertexUvs[0][11] = [ bricks[1], bricks[0], bricks[3] ];
	  
	  if (direct == 'lon') 
	  //x direct
	  {
	    geom.faceVertexUvs[0][0] = [  bricks[2], bricks[3], bricks[1] ];
        geom.faceVertexUvs[0][1] = [  bricks[3], bricks[0], bricks[1] ];	  
	    geom.faceVertexUvs[0][2] = [  bricks[1], bricks[0], bricks[2] ];
        geom.faceVertexUvs[0][3] = [  bricks[0], bricks[3], bricks[2] ];
	   }
	   
	  if (direct == 'lat') 
	  //y direct
	  {
	    geom.faceVertexUvs[0][4] = [ bricks[0], bricks[3], bricks[1] ];
        geom.faceVertexUvs[0][5] = [ bricks[3], bricks[2], bricks[1] ];
	    geom.faceVertexUvs[0][6] = [ bricks[3], bricks[0], bricks[2] ];
        geom.faceVertexUvs[0][7] = [ bricks[0], bricks[1], bricks[2] ];
	  }
	  
	  //z direct
	  if (direct == 'lev')
	  {
	    geom.faceVertexUvs[0][8] = [ bricks[3], bricks[0], bricks[2] ];
        geom.faceVertexUvs[0][9] = [ bricks[0], bricks[1], bricks[2] ];
	    geom.faceVertexUvs[0][10] = [ bricks[2], bricks[1], bricks[3] ];
        geom.faceVertexUvs[0][11] = [ bricks[1], bricks[0], bricks[3] ];
	  }	  
      var mesh = new THREE.Mesh(geom, mat);
      return mesh;

    }  
  
function createPlaneCute(params, opacity, visible){

       var dirstr = './pic/' + params[6] + '/'+ maps[mapIndex];
	   console.log(params[8]);
       var imagefile = dirstr + '1/FY3_PM_' + params[6] + '_' + params[7] + '_' +  (params[8]+1) + '.png';
	   console.log(imagefile);
	   var sphere = createMesh(new THREE.BoxGeometry( params[0], params[1], params[2] ),imagefile, params[7], opacity, visible);
	   sphere.position.set( params[3], params[4], params[5] );  
	   return sphere; 
  
  }

function getParamOfPlane( selection, datastr )
{
                      if (selection.name == 'X')
                         {
						   if (selection.geometry.vertices[0].y == selection.geometry.vertices[1].y)
						      {
							    var i = Math.round((selection.geometry.vertices[1].y - TOGRIDY) / (( FROMGRIDY-TOGRIDY )/ LATGRIDNUM));
							    params = [ GRIDLENGTHX, 2, GRIDLENGTHH, 0, selection.geometry.vertices[1].y, TOGRIDH / 2 ,datastr, 'lat', i];
							  }
						   else
						      {
							    var i = Math.round((selection.geometry.vertices[1].z - FROMGRIDH) / ((TOGRIDH - FROMGRIDH) / HGRIDNUM));
							    params = [ GRIDLENGTHX, GRIDLENGTHY, 2 , 0, 0, selection.geometry.vertices[1].z ,datastr, 'lev', i];
							  }
						 }

                      if (selection.name == 'Y')
                         {
						   if (selection.geometry.vertices[0].x == selection.geometry.vertices[1].x)
						      {
							    var i = Math.round((selection.geometry.vertices[1].x - FROMGRIDX) / ((TOGRIDX - FROMGRIDX) / LONGRIDNUM));	  
							    params = [ 2 ,GRIDLENGTHY, GRIDLENGTHH,  selection.geometry.vertices[1].x ,0, TOGRIDH / 2, datastr, 'lon', i];
							  }
						   else
						      {
							    var i = Math.round((selection.geometry.vertices[1].z - FROMGRIDH) / ((TOGRIDH - FROMGRIDH) / HGRIDNUM) );							  
							    params = [ GRIDLENGTHX, GRIDLENGTHY, 2 , 0, 0, selection.geometry.vertices[1].z ,datastr, 'lev', i];
							  }
						 }

                      if (selection.name == 'Z')
                         {
						   if (selection.geometry.vertices[0].y == selection.geometry.vertices[1].y)
						      {
							    var i = Math.round((selection.geometry.vertices[1].y - TOGRIDY) / (( FROMGRIDY-TOGRIDY )/ LATGRIDNUM));
							    params = [ GRIDLENGTHX, 2, GRIDLENGTHH, 0, selection.geometry.vertices[1].y, TOGRIDH / 2 ,datastr, 'lat', i];
							  }
						   else
						      {
							    var i = Math.round((selection.geometry.vertices[1].x - FROMGRIDX) / ((TOGRIDX - FROMGRIDX) / LONGRIDNUM));
							    params = [ 2 ,GRIDLENGTHY, GRIDLENGTHH,  selection.geometry.vertices[1].x ,0, TOGRIDH / 2, datastr, 'lon', i];
							  }
						 }
		return params;

}
 
//A flat long cube with a map is added to the scene  
function addPlaneCute(selection, params, opacity, visible){	
        if (( planteshow )&&(showWhichProfile == params[7]))
             {		
					  showPlante = createPlaneCute(params, opacity, visible);      				  
	   				  showPlante.name = "maps";
	   				  group.add( showPlante );
			  }
}

//Show the first picture
function showFirstPlane( datastr )
{
		if (showPlante) {
                     group.remove(showPlante);
					 showPlante = null;
					 }
 		if ( planteshow ) 
				  {
			  
                 if (showWhichProfile=='lon')
 				   {
  				    showPlaneParams =  [ 2 ,GRIDLENGTHY, GRIDLENGTHH,  FROMGRIDX ,0, TOGRIDH / 2, datastr, 'lon', 0];
 				   }
  				  else if (showWhichProfile=='lat')
  				  {
  				    showPlaneParams = [ GRIDLENGTHX, 2, GRIDLENGTHH, 0, FROMGRIDY, TOGRIDH / 2 ,datastr, 'lat', 0];
 				   }
 				   else
  				  {
 				     showPlaneParams = [ GRIDLENGTHX, GRIDLENGTHY, 2 , 0, 0, FROMGRIDH ,datastr, 'lev', 0];
  				  }	 
				     addPlaneCute(selection, showPlaneParams, 1.0, true);
					 
				  }
}				  
function showNextPlane( datastr )
{
 
		if (showPlante) {
                     group.remove(showPlante);
					 showPlante = null;
					 }
 				  if (( planteshow )&&(showWhichProfile == showPlaneParams[7]))
				  {
			  
    				   if (showPlaneParams[7] == 'lev')
	 				  {
	 
	   				      showPlaneParams[8] = (showPlaneParams[8] + 1) % (HGRIDNUM + 1);				  
						  showPlaneParams[5] = showPlaneParams[5] + gridStepH;
						  if (showPlaneParams[5] > TOGRIDH)
						  {
						     showPlaneParams[5] = FROMGRIDH;
						  }
		
	 				  }
	 				  else if ( showPlaneParams[7] == 'lon' )
	 				  {
	 
	    				  showPlaneParams[8] = (showPlaneParams[8] + 1) % (LONGRIDNUM + 1 );
						  showPlaneParams[3] = showPlaneParams[3] + gridStepX;
						  if (showPlaneParams[3] > TOGRIDX)
						  {
						     showPlaneParams[3] = FROMGRIDX;
						  }
	 
				  	 }
				  	 else
				  	 {
				  	    showPlaneParams[8] = (showPlaneParams[8] - 1);
				  		showPlaneParams[4] = showPlaneParams[4] - gridStepY;
                        if ( showPlaneParams[8] < 0 )	
                           {
						      showPlaneParams[8] = LATGRIDNUM;
						    }
				  		if (showPlaneParams[4] < TOGRIDY)
				  		{
				  		   showPlaneParams[4] = FROMGRIDY;
				  		}
		
				  	 }	 
				     addPlaneCute(selection, showPlaneParams, 1.0, true);
					 
				  }
}

function showLastPlane()
{
		if (showPlante) {
                     group.remove(showPlante);
					 showPlante = null;
					 }
				  console.log('before'+showPlaneParams[8]);
 				  if (( planteshow )&&(showWhichProfile == showPlaneParams[7])) 
				  {
			  
    				   if (showPlaneParams[7] == 'lev')
	 				  {
	 
	   				      showPlaneParams[8] = (showPlaneParams[8] - 1);
                          if ( showPlaneParams[8]<0 )	
                           {
						      showPlaneParams[8] = HGRIDNUM ;
						    }						  
						  showPlaneParams[5] = showPlaneParams[5] - gridStepH;
						  if (showPlaneParams[5] < FROMGRIDH)
						  {
						     showPlaneParams[5] = TOGRIDH;
						  }
		
	 				  }
	 				  else if ( showPlaneParams[7] == 'lon' )
	 				  {
	 
	    				  showPlaneParams[8] = (showPlaneParams[8] - 1);
                          if ( showPlaneParams[8] < 0 )	
                           {
						      showPlaneParams[8] = LONGRIDNUM;
						    }						  
						  showPlaneParams[3] = showPlaneParams[3] - gridStepX;
						  if (showPlaneParams[3] < FROMGRIDX)
						  {
						     showPlaneParams[3] = TOGRIDX;
						  }
	 
				  	 }
				  	 else
				  	 {
	 
				  	    showPlaneParams[8] = (showPlaneParams[8] + 1) % (LATGRIDNUM + 1);					
				  		showPlaneParams[4] = showPlaneParams[4] + gridStepY;
				  		if (showPlaneParams[4] > FROMGRIDY)
				  		{
				  		   showPlaneParams[4] = TOGRIDY;
				  		}
		
				  	 }	
                     console.log(showPlaneParams);					 
				     addPlaneCute(selection, showPlaneParams, 1.0, true);
					 
				  }
}

var addLonLatHeight = function( font )
{
    //Add the height coordinate axis
	var materialRed = new THREE.LineBasicMaterial( { color: 0xff0000,opacity:0.3} );
	var materialBlue = new THREE.LineBasicMaterial( { color: 0x0000ff,opacity:0.3} );
	var materialWhite = new THREE.LineBasicMaterial( { color: 0xffffff,opacity:0.3} );
	
	var text, g;
	var m = new THREE.MeshBasicMaterial({color:0xff0000});
	var mesh;
	
	//add LONG&LAT grid

	if (Math.sin(targetRotationY) >= 0)
	{
	  var yy = TOGRIDY;
	}
	else
	{
	  var yy = FROMGRIDY;
	}
	
	for(var i = 0; i <= HGRIDNUM; i++)
	     {
	      var geometry = new THREE.Geometry();
          geometry.vertices.push(new THREE.Vector3(FROMGRIDX, yy, i * gridStepH));
          geometry.vertices.push(new THREE.Vector3(TOGRIDX, yy, i * gridStepH)); 
		  if (i==0)
		  {
		    line = new THREE.Line(geometry, materialWhite);
		  }
		  else
		  {
		    line = new THREE.Line(geometry, materialBlue);
		  }
		  line.name = 'Y';
	      group.add(line);
		  xyz = position2HeightLonLat(TOGRIDX, TOGRIDY, i * gridStepH);
		  
          textstr = (xyz[2]/1000).toFixed(1) + ' km';
          g = new THREE.TextGeometry(textstr,{//Set text fonts，                
                font:font,               
                size:20,               
                height:3,
            });

          g.computeBoundingBox();
		  
            //3D text material
    
          mesh = new THREE.Mesh(g,m);
	      mesh.position.set( TOGRIDX, yy, i * gridStepH);
		  mesh.rotation.x = Math.PI / 2;
	      LatGroupLonLatGrid.add(mesh);		  
	    }
		
	for(var j = 0; j <= LONGRIDNUM; j++)
	   {
	      var geometry = new THREE.Geometry();
          geometry.vertices.push(new THREE.Vector3(FROMGRIDX + j * gridStepX, yy, FROMGRIDH));
          geometry.vertices.push(new THREE.Vector3(FROMGRIDX + j * gridStepX, yy, TOGRIDH)); 
		  if (j==0)
		  {
		    line = new THREE.Line(geometry, materialWhite);
		  }
		  else
		  {
		    line = new THREE.Line(geometry, materialBlue);
		  }		 
		  line.name = 'Y';
	      LatGroupLonLatGrid.add(line);	
	   }
	   
	//Longitude grid 
	for(var i = 0; i <= HGRIDNUM; i++)
	     {
	      var geometry = new THREE.Geometry();
          geometry.vertices.push(new THREE.Vector3(FROMGRIDX, FROMGRIDY, i * gridStepH));
          geometry.vertices.push(new THREE.Vector3(FROMGRIDX, TOGRIDY, i * gridStepH)); 

		  if (i==0)
		  {
		    line = new THREE.Line(geometry, materialWhite);
		  }
		  else
		  {
		    line = new THREE.Line(geometry, materialBlue);
		  }	

		  line.name = 'X' ;
	      LonGroupLonLatGrid.add(line);		  
	    }
		
	for(var j = 0; j <= LATGRIDNUM; j++)
	   {
	      var geometry = new THREE.Geometry();
          geometry.vertices.push(new THREE.Vector3(FROMGRIDX , FROMGRIDY - j * gridStepY, FROMGRIDH));
          geometry.vertices.push(new THREE.Vector3(FROMGRIDX, FROMGRIDY - j * gridStepY, TOGRIDH)); 
		  if (j==0)
		  {
		    line = new THREE.Line(geometry, materialWhite);
		  }
		  else
		  {
		    line = new THREE.Line(geometry, materialBlue);
		  }	
		  line.name = 'X' ;
	      LonGroupLonLatGrid.add(line);
	  
	   }
	   
	 //Height grid
	for(var i = 0; i <= LONGRIDNUM; i++)
	     {
	      var geometry = new THREE.Geometry();
          geometry.vertices.push(new THREE.Vector3(FROMGRIDX + i * gridStepX, FROMGRIDY, FROMGRIDH));
          geometry.vertices.push(new THREE.Vector3(FROMGRIDX + i * gridStepX, TOGRIDY, FROMGRIDH)); 
		  if (i==0)
		  {
		    line = new THREE.Line(geometry, materialWhite);
		  }
		  else
		  {
		    line = new THREE.Line(geometry, materialBlue);
		  }	
		  line.name = 'Z' ;
	      HGroupLonLatGrid.add(line);
		  xyz = position2HeightLonLat( FROMGRIDX + i * gridStepX, FROMGRIDY, FROMGRIDH );
          text = (xyz[0]).toFixed(2);
          if (i == 10)
           {
		   textstr = text + ' °E';
           } 		  
          g = new THREE.TextGeometry(textstr,{                
                font:font,               
                size:20,                  
                height:3,
            });
			
          g.computeBoundingBox();
    
          mesh = new THREE.Mesh(g,m);
	      mesh.position.set( FROMGRIDX + i * gridStepX -30, TOGRIDY - 30, FROMGRIDH );
		  //mesh.rotation.x = Math.PI / 2;
		  var mm = i % 2;
		  console.log(mesh);
	      if ( mm == 0)
		  {
		    group.add(mesh);
          }		  
	    }
		
	for(var j = 0; j <= LATGRIDNUM; j++)
	   {
	      var geometry = new THREE.Geometry();
          geometry.vertices.push(new THREE.Vector3(FROMGRIDX , FROMGRIDY - j * gridStepY, FROMGRIDH));
          geometry.vertices.push(new THREE.Vector3(TOGRIDX, FROMGRIDY - j * gridStepY, FROMGRIDH)); 
		  if (j==0)
		  {
		    line = new THREE.Line(geometry, materialWhite);
		  }
		  else
		  {
		    line = new THREE.Line(geometry, materialBlue);
		  }	
		  line.name = 'Z' ;
	      HGroupLonLatGrid.add(line);
		  xyz = position2HeightLonLat(TOGRIDX, FROMGRIDY - j * gridStepY, FROMGRIDH);
		  
          text = (xyz[1]).toFixed(2) + ' °N';
          g = new THREE.TextGeometry(text,{                
                font:font,               
                size:20,                
                height:3,
            });

          g.computeBoundingBox();
    
          mesh = new THREE.Mesh(g,m);
	      mesh.position.set( TOGRIDX, FROMGRIDY - j * gridStepY, FROMGRIDH );
		  
	      if (( j != LATGRIDNUM ) && ( j != 0 ))
		  {
		    group.add(mesh);
          }			
	   }
	   
};

var addParticles = function( )
{
	//add sphere points
	            if (addOrNot == false)        //If we want to reduce particales, we let it empty and the particles are regenerated
			    {
				 while ( points.children.length > 1 )
				 {
				  points.remove(points.children[0]);
				 }
				}
				
				var color = new THREE.Color();
				var radius = 10, segemnt = 8, rings = 4;
				

				var n = 1000, n2 = n / 2; // particles spread in the cube			
	
                if (addOrNot == false)        
				{
				  limitParticales = particales;
				 }
				else                       //If we want to add particales, we regenerate half of the particles
				{
				  limitParticales = particales / 2;
				}
                for (var i = 0 ;i< limitParticales ;i++)
                 {
				 
					var px = (Math.random() * 400)-200;
					var py = (Math.random() * 600)-300;
					var pz = Math.random() * 600;
					
					   
								 
				 
					var x = Math.random() * n - n2;
					var y = Math.random() * n - n2;
					var z = Math.random() * n - n2;

					//positions[ i ]     = x;
					//positions[ i + 1 ] = y;
					//positions[ i + 2 ] = z;

					// colors

					var vx = ( x / n ) + 0.5;
					var vy = ( y / n ) + 0.5;
					var vz = ( z / n ) + 0.5;
					
					var c,clon,clat,cheight;
					c = position2HeightLonLat(px,py,pz);
					clon = c[0] ,clat = c[1], cheight = c[2];
                    //console.log(px,py,pz,c);					
					var arrIndex = heightLonLat2Grid(cheight,clat,clon);
					
					if (byteArray) 
					{
					
					  //console.log(byteArray);
					  var colors = lut.getColor( byteArray[arrIndex]/10 );
					  
                      opacity = byteArray[arrIndex] / 2 + 0.2;
					
					//var value = getValue( px ,py , pz);
					if (colors)
					{
					
					var sphereMaterial = new THREE.MeshLambertMaterial({ color: colors, transparent:true, opacity:opacity});
					
					}
					else
					{
					 
					 var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xfffff, transparent:true, opacity:0});
					 
					}
					
					//{color:0xff0000, transparent:true, opacity:0.8, side: THREE.DoubleSide}
					
				      var sphere = new THREE.Mesh(
                        new THREE.SphereGeometry(radius,segemnt,rings),
                      sphereMaterial
                       );
					   
					sphere.position.set( px ,py , pz);
					sphere.value = byteArray[arrIndex]/10.0;
					

                    sphere.geometry.verticesNeedUpdate = true;
                    sphere.geometry.normalsNeedUpdate = true;
					
					if (byteArray[arrIndex] != 255)
					{
					  points.add(sphere);
					 }
					
				}
            }	
};

//set legend
function setLegend()
{
					var lutColors = [];
				    maps = [ 'rainbow', 'cooltowarm', 'blackbody', 'grayscale' ,'cooltowarmUpDown',"grayscale1"];

				    var colorNumbers = ['128', '128', '128', '128','128' ];
					lut = new THREE.Lut( maps[mapIndex], colorNumbers[mapIndex] );

					lut.setMax( VALUEMAX );
					lut.setMin( 0 );

					if ( legendLayout ) {

						if ( legendLayout == 'horizontal' ) {

							legend = lut.setLegendOn( { 'layout':'horizontal', 'position': { 'x': 21, 'y': 6, 'z': 5 } } );

						}

						else {

							legend = lut.setLegendOn();

						}

						scene.add ( legend );
						
						legend.scale.x = legend.scale.y = 100;
						legend.position.set(600,0,0);
						
						

						labels = lut.setLegendLabels( { 'title': 'Extinction coefficient','ticks': 5, 'fontsize':18 ,'um':'/km' } );
						//labels.fontsize = 240;

						scene.add ( labels['title'] );
						
						labels['title'].scale.x = labels['title'].scale.y = 250;
						labels['title'].position.set(650,100,0);
						
						for ( var i = 0; i < Object.keys( labels[ 'ticks' ] ).length; i++ ) {
						
                            
							scene.add ( labels[ 'ticks' ][ i ] );
							scene.add ( labels[ 'lines' ][ i ] );
							labels[ 'ticks' ][ i ].scale.x = labels[ 'ticks' ][ i ].scale.y = 200;
							labels[ 'ticks' ][ i ].position.set(620,-215+70*i,0);
							labels[ 'lines' ][ i ].scale.x = labels[ 'lines' ][ i ].scale.y = 200;
							labels[ 'lines' ][ i ].position.set(620,-215+70*i,0);							

						}
						
					}
}
function getColorByValue( value )
{
      var color;
  
	  if (value >= 20)
	  {
	    color = lut.getColor( 1.99 );
	  }
	  else
	  {
	   color = lut.getColor( value/10 );	  
	  }
	  
	  if ((color.r == 255)&&(color.g == 255)&&(color.b ==255)&&(value !=255))
	  {
	    //console.log(value);
		//console.log(lut.getColor( value/10 ));
		//console.log(color);
		color.r=255;
		color.g=0;
		color.b=0
	  }
	  
      if (value == 255)
       {
	     color.r = 255;
		 color.g = 255;
		 color.b = 255;
          }
    return color;
}

//Draw a map directly instead of drawing a picture file
function drawAPlant(az)
{
    if (geometry)
	{
	 console.log(geometry);
	}
    var geometry = new THREE.BufferGeometry();	
	var material = new THREE.MeshLambertMaterial( {
		side: THREE.DoubleSide,
		color: 0xF5F5F5,
		vertexColors: THREE.VertexColors
	} );
	

	var pA = new THREE.Vector3();
	var pB = new THREE.Vector3();
	var pC = new THREE.Vector3();
	
	var cb = new THREE.Vector3();
	var ab = new THREE.Vector3();
	var px1,py1,px2,py2;
	var arrIndex, color;
	
	var pp = 0;
	var stepx = GRIDLENGTHX / segmentsx;
	var stepy = GRIDLENGTHY / segmentsy;
	var c,clon,clat,cheight;
	//console.log(lut);
	for (var i = 0; i < segmentsx ; i++)				
	{ 
	 for (var j = 0; j < segmentsy ; j++)
	 {
      px1 = FROMGRIDX + i * stepx;
	  py1 = FROMGRIDY - j * stepy;
	  px2 = FROMGRIDX + (i+1) * stepx;
	  py2 = FROMGRIDY - (j+1) * stepy;
	  
	  positions[2*pp*9+0] = px1; positions[2*pp*9+1] = py2; positions[2*pp*9+2] = az;
	  c = position2HeightLonLat(px1,py2,az);
	  clon = c[0] ,clat = c[1], cheight = c[2];	  
	  arrIndex = heightLonLat2Grid(cheight,clat,clon);	  
      color =getColorByValue( byteArray[arrIndex] );	  
	  colors[2*pp*9+0] = color.r; colors[2*pp*9+1] = color.g; colors[2*pp*9+2] = color.b;
	  
	  positions[2*pp*9+3] = px2; positions[2*pp*9+4] = py1; positions[2*pp*9+5] = az;
	  c = position2HeightLonLat(px2,py1,az);
	  clon = c[0] ,clat = c[1], cheight = c[2];	  
	  arrIndex = heightLonLat2Grid(cheight,clat,clon);				
      color =getColorByValue( byteArray[arrIndex] )	 	  
	  colors[2*pp*9+3] = color.r; colors[2*pp*9+4] = color.g; colors[2*pp*9+5] = color.b;
	  
	  positions[2*pp*9+6] = px1; positions[2*pp*9+7] = py1; positions[2*pp*9+8] = az;
	  c = position2HeightLonLat(px1,py1,az);
	  clon = c[0] ,clat = c[1], cheight = c[2];	  
	  arrIndex = heightLonLat2Grid(cheight,clat,clon);				
      color =getColorByValue( byteArray[arrIndex] );	 	  
	  colors[2*pp*9+6] = color.r; colors[2*pp*9+7] = color.g; colors[2*pp*9+8] = color.b;
	  
	  positions[(2*pp+1)*9+0] = px1; positions[(2*pp+1)*9+1] = py2; positions[(2*pp+1)*9+2] = az;
	  c = position2HeightLonLat(px1,py2,az);
	  clon = c[0] ,clat = c[1], cheight = c[2];	  
	  arrIndex = heightLonLat2Grid(cheight,clat,clon);				
      color =getColorByValue( byteArray[arrIndex] );   
	  colors[(2*pp+1)*9+0] = color.r; colors[(2*pp+1)*9+1] = color.g; colors[(2*pp+1)*9+2] = color.b;
	  
	  positions[(2*pp+1)*9+3] = px2; positions[(2*pp+1)*9+4] = py1; positions[(2*pp+1)*9+5] = az;
	  c = position2HeightLonLat(px2,py1,az);
	  clon = c[0] ,clat = c[1], cheight = c[2];	  
	  arrIndex = heightLonLat2Grid(cheight,clat,clon);
      color =getColorByValue( byteArray[arrIndex] ); 
	  colors[(2*pp+1)*9+3] = color.r; colors[(2*pp+1)*9+4] = color.g; colors[(2*pp+1)*9+5] = color.b;
	  
	  positions[(2*pp+1)*9+6] = px2; positions[(2*pp+1)*9+7] = py2; positions[(2*pp+1)*9+8] = az;
	  c = position2HeightLonLat(px2,py2,az);
	  clon = c[0] ,clat = c[1], cheight = c[2];	  
	  arrIndex = heightLonLat2Grid(cheight,clat,clon);				
      color =getColorByValue( byteArray[arrIndex] ); 		  
	  colors[(2*pp+1)*9+6] = color.r; colors[(2*pp+1)*9+7] = color.g; colors[(2*pp+1)*9+8] = color.b;	  
	  
 
	
	// flat face normals

	  pA.set( 0, 0, 0 );
	  pB.set( 0, 0, 0 );
	  pC.set( 0, 0, 0 );

	  cb.subVectors( pC, pB );
	  ab.subVectors( pA, pB );
	  cb.cross( ab );

	  cb.normalize();

	  var nx = cb.x;
	  var ny = cb.y;
	  var nz = cb.z;
	  
	  pp += 1 ;
	}
	}
	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
	geometry.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );
	geometry.computeBoundingSphere();
    var mesh = new THREE.Mesh( geometry, material );
    return mesh;	
}