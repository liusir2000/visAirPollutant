//onEvent.js deal with the event
//select color table
function onSelectColormap()
	{   
	    var colors;
	    addOrNot = false;
		//mapIndex = i;
		setLegend();
		if ((!points)||(points.children.length <= 0))
		{
	       var datafilename = "./data/FY3_PM_" + Datestr + ".dat";
	       readArr( datafilename );		
		 }
		else
		{
			for (var i = 0; i <  points.children.length ; i++ )
					  {
					    colors  = lut.getColor( points.children[i].value );
						points.children[i].material.color = colors;
					  }		   
		 } 

		return false;
	}
	/// Events

function searchData()
	{
        //window.alert('searchData');
		setLegend();
		Datestr = document.getElementById('datestr').value;
		console.log(Datestr);
		addOrNot = false;
		var datafilename = "./data/FY3_PM_" + Datestr + ".dat";
		readArr( datafilename );
		return false;
	}
	
//Filter extinction coefficient	
function onFilterData()
    {
        
		var fromValueStr = document.getElementById('fromValue').value;
		var toValueStr = document.getElementById('toValue').value;
		var fromValue,toValue;
		if (fromValueStr =="")
		  {
		    fromValue= -0.1;
		  }
		 else
		  {
		    fromValue= parseFloat(fromValueStr);
		  }	
		  
		if (toValueStr =="")
		  {
		    toValue= 2.1;
		  }
		 else
		  {
		    toValue= parseFloat(toValueStr);
		  }	
		
        if (points.children.length >= 1)	
        {
		  for (var i = 0; i < points.children.length;i++)
		  {
		    
		    if ((points.children[i].value>=fromValue)&&(points.children[i].value<=toValue))
			{
			  points.children[i].visible = true;
			  
			}
			else
			{
			 points.children[i].visible = false;
			
			}
		  }
         }		
    }
	
	
//Add particles	
function onAddParticales()
	{
	if (particales >160000){ 
	   return false; 
	   };
	setLegend();
	addOrNot = true;
	particales = particales + 1000 ;
    var myDate1 = new Date();		
    console.log("AddParticales, total number is:");	
    console.log(particales);
    if (byteArray)
		{
		  addParticles();		  
         }
    else
       {
	     var datafilename = "./data/FY3_PM_" + Datestr + ".dat";
	     readArr( datafilename ); 		 
	   }     
    var myDate2 = new Date();
    var cDate = myDate2 - myDate1;
    console.log('render finish at:');
    console.log(myDate2);
    console.log('total render time:');
	console.log(cDate);     	   
	return false;
	}
	
//reduce particles
function onReduceParticales()
     {
	 setLegend();
	 addOrNot = false;
	 particales = Math.round( particales / 2 );
     if (byteArray)
		{
		  addParticles();
         }
     else
       {
	     var datafilename = "./data/FY3_PM_" + Datestr + ".dat";
	     readArr( datafilename );	   
	   }
	 return false;
     }	

function onSearchPosition()
	{
        //window.alert('Position');
		var latStr = document.getElementById('Lat').value;
		var lonStr = document.getElementById('Lon').value;
		var heightStr = document.getElementById('Height').value;
		clat = parseFloat(latStr);
		clon = parseFloat(lonStr);
		cheight = parseFloat(heightStr)*1000;
		var arrIndex = heightLonLat2Grid(cheight,clat,clon);
        console.log(arrIndex);		
		if (byteArray) 
					{
					
					  var value = byteArray[arrIndex];
					  if (value>=254.99) 
					  {
					  
					    str = 'Long: ' + lonStr + '°E  Lat: ' + latStr + '°N Height: ' + cheight.toFixed(0) +'m  Extinction coefficient: NO Value';
					  
					  }
					  
					  else
					  {
					    value = value / 10; 
					    str = 'Long: ' + lonStr + '°E  Lat: ' + latStr + '°N Height: ' + cheight.toFixed(0) +'m  Extinction coefficient: ' + value.toFixed(1) + ' 1/km';	
						
					  }
					  
					  document.getElementById('particaleInf').innerHTML = str;
					}
		else
		{
		
		  return false;
		  
		}
	}
	
function onKeyDown ( event ) {

		switch( event.keyCode ) {

		case 0x26: /*up*/

				camera.position.y = camera.position.y - 50;

						break;

		case 0x25: /*left 66 */

				camera.position.x = camera.position.x + 50;

						break;

				
		case 0x28: /*down*/

				camera.position.y = camera.position.y + 50; 

						break;
						
		case 0x27: /*right*/

				camera.position.x = camera.position.x - 50;

						break;
		case 78: /*n*/

				camera.position.z = camera.position.z - 50;

						break;	
		case 70: /*f*/

				camera.position.z = camera.position.z + 50;

						break;	
		case 0x20: /*space*/

				initialPosition();

						break;
						
		case 67: /*c,cancle cross-section map*/

                planteshow = false;
				if (showPlante) 
				{
				  group.remove(showPlante);
				  showPlante = null;
				}
				break;						

		case 88: /*x,Lon*/

				targetRotationX = 0.78;
				targetRotationY = 0 ;
				if ((planteshow == false)||(showWhichProfile != 'lon'))
				{
				  planteshow = true;
				  camera.position.y = windowHalfY/4;
				  showWhichProfile = 'lon';
				  showFirstPlane( Datestr );
				 }
				 else
				 {
				   showNextPlane();
				 }
				 
				 //delete z cross-section
				if(plant)
				{
				  group.remove(plant);
				  delete(plant);
				}				 
				break;	
				
		case 89: /*y,Lat*/

				targetRotationX = 0;
				targetRotationY = -0.78;
				if ((planteshow == false)||(showWhichProfile != 'lat'))
				{
				camera.position.y = windowHalfY/2;
				planteshow = true;
				showWhichProfile = 'lat';
				showFirstPlane( Datestr );
				 }
				 else
				 {
				   showNextPlane();
				 }
				 
				 //delete z cross-section
				if(plant)
				{
				  group.remove(plant);
				  delete(plant);
				}				 

				break;	
				
		case 90: /*z,height*/

				targetRotationX = 0;
				targetRotationY = 0;
				if ((planteshow == false)||(showWhichProfile != 'lev'))
				{
				  planteshow = true;
				  camera.position.y = windowHalfY/4;
				  showWhichProfile = 'lev';
				  //showFirstPlane( Datestr );
				 }
				 else
				 {
				   //showNextPlane();
				 }	

				if(plant)
				{
				  group.remove(plant);
				  delete(plant);
				}
				
				if (dataLoaded)
				{
                  plant=drawAPlant(zpostion);
                  zpostion = (zpostion+10) % 600;				  
				  group.add(plant);	
                 }
				 				 

				break;
						

		case 83: /*s,show or hide the particles*/
                if  (particleshow)
				{
                 if( points)
				    {
					  for (var i = 0; i <  points.children.length ; i++ )
					  {
					     points.children[i].visible = false;
					  }
					particleshow = false;  
					}				
				}
				else
                 if( points)
				    {
					  for (var i = 0; i <  points.children.length ; i++ )
					  {
					     points.children[i].visible = true;
					  }
					particleshow = true;  
					}				  

			break;
			
		case 65: /*a,add particles*/
				  
            onAddParticales();
			
			break;
			
		case 68: /*d, recude particle*/
				  
            onReduceParticales();
			
			break;
			
		case 86: /*v,chage particle color*/
			
            mapIndex = (mapIndex +1 ) % 4 ;			
            onSelectColormap();			
			break;			
			
		    }				

	}	

	function onShowHelp()
	{

		var str = '';
		str = '<font color="red">Direction key</font>Adjust the camera position;<font color="red">f</font>Make it farer;<font color="red">n</font> Make it closer;<font color="red">(left mouse+move)</font>Adjust the angle;<font color="red">Space</font>reset to initial position;'
		str += '<font color="red">a/d</font>Add/Reduce particles;<font color="red">s</font>Hide/Show particles;<font color="red">x/y/z/c</font>Long/Lat/level/hide cross-section map;<font color="red">v</font>adjust table。'
		document.getElementById('particaleInf').innerHTML = str;
		return false;
	}
	
	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	function onDocumentMouseDown( event ) {

		//event.preventDefault();

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'mouseup', onDocumentMouseUp, false );
		document.addEventListener( 'mouseout', onDocumentMouseOut, false );

		mouseXOnMouseDown = -(event.clientX - windowHalfX);
		targetRotationOnMouseDownX = targetRotationX;
		
		mouseYOnMouseDown = -(event.clientY - windowHalfY);
		targetRotationOnMouseDownY = targetRotationY;

        //console.log("mouseXOnMouseDown:",mouseXOnMouseDown," event.clientY,windowHalfY:",event.clientY,windowHalfY);		
	}

	function onDocumentMouseMove( event ) {

		mouseX = -(event.clientX - windowHalfX);
		mouseY = -(event.clientY - windowHalfY);
		targetRotationX = targetRotationOnMouseDownX + ( mouseX - mouseXOnMouseDown ) * 0.006;
		targetRotationY = targetRotationOnMouseDownY + ( mouseYOnMouseDown - mouseY ) * 0.006;		
		
	}

	function onDocumentMouseUp( event ) {

		document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
		document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
		document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
	}

	function onDocumentMouseOut( event ) {

		document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
		document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
		document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
	}

	function onDocumentTouchStart( event ) {

		if ( event.touches.length == 1 ) {

			event.preventDefault();

			mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
			targetRotationOnMouseDownX = targetRotationX;
			
			mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
			targetRotationOnMouseDownY = targetRotationY;
			
		}
	}

	function onDocumentTouchMove( event ) {

		if ( event.touches.length == 1 ) {

			event.preventDefault();
            mouseY = event.touches[ 0 ].pageY - windowHalfY;
			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			targetRotationX = targetRotationOnMouseDownX + ( mouseX - mouseXOnMouseDown ) * 0.001;
			targetRotationY = targetRotationOnMouseDownY + ( mouseY - mouseYOnMouseDown ) * 0.001;
            //console.log("targetRotationX:",targetRotationX," targetRotationY:",targetRotationY);			
		}
	}
	
	function onMouseMove( event ) {

		mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
		raycaster.setFromCamera( mouse, camera );
				
                
				
				// See if the ray from the camera into the world hits one of our meshes
		var intersects = raycaster.intersectObjects( points.children, true );
				
                //console.log(mouse.x);
				//console.log(mouse.y);
				// Toggle rotation bool for meshes that we clicked
				if ( intersects.length > 0 ) {
				
  			     if (INTERSECTED != intersects[0].object) {
                 selection = intersects[0].object;
                 // resets mesh hex when mouseout
				 if (selection.type == 'Mesh')
				 {
				  //console.log(selection.position.z);
                 if (selection) selection.material.emissive.setHex(selection.currentHex);
                 selection.currentHex = selection.material.emissive.getHex();
                 // setting new hex for hover
                 selection.material.emissive.setHex(0x999999);				 
				 container.style.cursor = "pointer";				  
				  light.visible = true;
				  light.position.set(intersects[0].object.position.x,intersects[0].object.position.y, 30);				  
				  var str='';
				  var xyz = position2HeightLonLat(selection.position.x,selection.position.y,selection.position.z);
				  
				  str+=str+'Long: ' + xyz[0].toFixed(2) + '°E  Lat: ' + xyz[1].toFixed(2) + '°N Height: ' + xyz[2].toFixed(0) +' m  Extinction coefficient: <font color="red">' + selection.value + '</font> km<SUP>-1</SUP>'; 
				  document.getElementById('particaleInf').innerHTML = str;
				  showParticleInf = true;
				 };
                 }  
				}
                else
                 {
                   if (selection) {
                     //console.log(selection);
                    }
                   selection = null;				 
				   light.visible = false;
				   container.style.cursor = "default";
				   if (showParticleInf)
				   {
				       document.getElementById('particaleInf').innerHTML = ' ';
					   showParticleInf = false;
					 }
                  }				 

			

		var intersects2 = raycaster.intersectObjects( group.children, true );
				
                //console.log(mouse.x);
				//console.log(mouse.y);
				// Toggle rotation bool for meshes that we clicked
				if ( intersects2.length > 0 ) {
				
				 if (INTERSECTED != intersects2[0].object) {
                 selection = intersects2[0].object; 
				 container.style.cursor = "pointer";
				 if (selection.type =='Line')
				 {
				   if (showPlante) {
                     group.remove(showPlante);
					 showPlante = null;
					 }
				 // console.log(showPlaneParams);
				  //var picfilename = String("./pic/FY3_PM_20150530_lon_9.png");
 				  if ( planteshow )
				  {
				     console.log(showPlaneParams);
				     console.log(selection);
				     showPlaneParams = getParamOfPlane( selection, Datestr );
				     addPlaneCute(selection, showPlaneParams, 1.0, true);
					 
				  }
				//remove the z plant that drawing that map directly  
				if(plant)
				{
				  group.remove(plant);
				  delete(plant);
				}				  
				  
				 };
                 }  
				}
                else
                 {
                   if (showPlante) {
                     //group.remove(showPlante);
					 //showPlante = null;
					 }
                   selection = null;				 
				   light.visible = false;
				   container.style.cursor = "default";
                  }				 

            }
