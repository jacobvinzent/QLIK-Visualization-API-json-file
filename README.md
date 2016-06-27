# QLIK-Visualization-API-json-file
 

# What does this do: 
This tool helps you to reuse your application design done in the Qlik Sense Desktop or on the Qlik Enterprise server across multiple applications for different customers.

The tool is valuable if you:
1. Have the same app design for multiple applications, either for different customers or different departments in your organization
2. The content is presented in a mashup

# What pain does it solve:
When an application is published to a customer or a department in many cases the application is based on duplicate of a template which has all the visualization needed for the application. The data model is tweaked a bit for each published version so the different customers/departments only see their own data.
When you want to add a new visualization you need to unpublish (make a duplicate) of each published app, add the new visualization and overwrite the changed app back to the stream where it is published.
This tool will help you to design your app in the standard Qlik Sense interface, all the visualization you want to share to all your instances created from this template should be saved as Master Visualizations.
When that is done you need to download (only needed once) the Serialize App Mashup from http://branch.qlik.com/#!/project/56728f52d1e497241ae698b1

Use the tool to serialize you app into a json file.

When that is done, install node.js from https://nodejs.org/en/download/
Create a new directory on the machine where your node.js is installed
Run the command npm install qliksense_viz_api_json
Type cd node_modules
Type cd qliksense_viz_api_json

Type node index.js <<Path and Name>> of the file exported with the Serialize App Mashup tool
Now you will find a new json file with master objects definitions ready to be used with Qlik Sense Visualization API

If you want to test the new created json file, unzip the zip file in the SenseMashup directory and add it to your local extension directory C:\Users\<userid>\Documents\Qlik\Sense\Extensions.

The mashup will show you a menu item for each tag used on the master items and an “All” menu item with all objects.

Copy the content of your new create json file into vizapi.json or create a new json file and change the name in helpdesk-angular.js line 61.

Change the app name in line 30 in helpdesk-angular.js to the app containing your data model

View you mashup, and you should be able to see your master visualizations in the portal.




