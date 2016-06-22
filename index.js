var fs = require('fs');
const commandLineArgs = require('command-line-args')

var obj;
var fileName = process.argv[2];
var fileExtension = fileName.replace(/^.*\./, '');
 
 
if (typeof fileName === "undefined") 
 {
 	console.log('No file name specified');
 	return;
 }

 
fs.readFile(fileName, 'utf8', function (err, data) {
  if (err) throw err;
  
  //obj = JSON.parse(data);
  //var Jsondata = JSON.stringify(data, null, 2);
  var Jsondata = JSON.parse(data);
  

  var fs = require('fs');
fs.writeFile(fileExtension + '_vizapi.json', CreateVizObjectForVizAPI(Jsondata), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved as "+fileExtension + '_vizapi.json');
}); 
  
});





function CreateVizObjectForVizAPI(obj){
	//return obj;
//	return obj.properties;
//	return obj.length;
	
		//Moved all master item measures to clean text
  obj['masterobjects'].forEach(function(v)
  {

	if (v.qProperty.hasOwnProperty('qHyperCubeDef'))  
	v.qProperty.qHyperCubeDef.qMeasures.forEach(function(exp){
			
			if (exp.hasOwnProperty('qLibraryId')) { 

				obj['measures'].forEach(function(mas){
 					if(mas.qInfo.qId == exp["qLibraryId"])
 						{

 							 for (var property in mas["qMeasure"]) {
			
							 	exp["qDef"][property] = mas["qMeasure"][property];
							 	
							 }
						}

		
 					});
 			}
			
			
  		 })

 
  })

		  //Moved all master item dimensions to clean text
		  obj['masterobjects'].forEach(function(v)
		  {
		  	if (v.qProperty.hasOwnProperty('qDimensions'))  	
			v.qProperty.qHyperCubeDef.qDimensions.forEach(function(exp){

					if (exp.hasOwnProperty('qLibraryId')) { 
						obj['dimensions'].forEach(function(mas){
							
		 					if(mas.qInfo.qId == exp["qLibraryId"])
		 						{
		 						//	response.write(JSON.stringify(mas));		
		 						
		 							 for (var property in mas["qDim"]) {
									
											 exp["qDef"][property] = mas["qDim"][property];
									 }
								}

				
		 					});
		 			}
					
					
		  		 })

		 
		  })

		  obj['masterobjects'].forEach(function(v)
		  {
		  		if(v.qProperty.hasOwnProperty('qListObjectDef'))
		  		{
		  			//v.qProperty.qHyperCubeDef.qDimensions.forEach(function(exp){
		  				if(v.qProperty.qListObjectDef.hasOwnProperty('qLibraryId')){
		  					obj['dimensions'].forEach(function(mas){
		  						if(mas.qInfo.qId == v.qProperty.qListObjectDef["qLibraryId"])
		 						{
		 							 for (var property in mas["qDim"]) {
									
											 v.qProperty.qListObjectDef["qDef"][property] = mas["qDim"][property];
									 }
								}

		  					})

		  				}
		  	

		  		}
		  		else if(v.qProperty.visualization=='filterpane')
		  		{
		  			 v.qChildren.forEach(function(child){
		  			 	if(child.qProperty.qListObjectDef.hasOwnProperty('qLibraryId'))
		  			 		{
		  			 						obj['dimensions'].forEach(function(mas){
		  			 				  					if(mas.qInfo.qId == child.qProperty.qListObjectDef.qLibraryId)
		  			 				  		 			{
		  			 										for (var property in mas["qDim"]) {
									
																 child.qProperty.qListObjectDef["qDef"][property] = mas["qDim"][property];
									 							}
		  			 				  		 			}	
		  			 				  				 		})
		  			 }
		  			 });


		  		}
		  })
		  
		  	return JSON.stringify(obj["masterobjects"]);
	}



