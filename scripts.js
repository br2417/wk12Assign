
	// google API below
	var dataKey = "&key=AIzaSyDsBrSpJRliKgi913vr9FWTy8oL57c42bA";
	// link to google fusion table with data 
	var gDataURL = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+12A0eKUXKb4TCFhngfaGqaMEH6uECY1iBhd3VOBAV+WHERE+DATE>";
	
	// CivUnempRate is the local name of the json file I just loaded
	
	function mLoaded(CivUnempRate){
		
		var gUnempTable = new google.visualization.DataTable();
		
		// Below I have added three columns, the first parameter is the data type in the column, and the 
		// second parameter is the data type.
		// My first column is made up of strings (text), the second of numbers, and the 
		// third, which I have used for annotations, is also a column made up of strings, but includes the tooltip element 
		// which is what will make the annotation interactive: when the user hovers over a specfic part of the chart, a tooltip 
		// (litlle pop-up box) with my chosen annotation inside, will appear. 
			
		gUnempTable.addColumn('string', CivUnempRate.columns[0]); 
		gUnempTable.addColumn('number', CivUnempRate.columns[1]);
		gUnempTable.addColumn({type: 'string', 'role': 'tooltip', 'p': {'html': true}});
		
		gUnempTable.addRows(CivUnempRate.rows)
		
		 // As part of the gChartOptions below, we have added the option to enable HTML tool tips. This lets us customize
		 // the annotations using HTML. In my example the "bold annotation" appears in bold thanks to the <b> </b> HTML tags 
		 // in my google fusion table annotations column. 

		 var gChartOptions = {
          title: "Unemployment since 1990 and 2000",
          tooltip: { isHtml: true } 
        };

		// The below is the variable that actually creates/draws the line chart 
		
		var gUnempChart = new google.visualization.LineChart(document.getElementById("gUnempChartDiv"));
  			gUnempChart.draw(gUnempTable, gChartOptions);
  			
		}

		// In the below fuction, 'e' is my click event; its target property will be used to get the "id" of the div
		
		function newDataUp(e){
		
		var bennyID = e.target.id; //e.g. target "year_2000"
			console.log(bennyID);
		
		// The below splits into an array, where the objects are "year" and (e.g.) "1990"
		
		var URLarray = bennyID.split("_"); 
		
		// The below grabs the year
		
		var URLyear = URLarray[1];
		
		$.get(gDataURL+"'"+URLyear+"-12-01'"+dataKey, mLoaded, "json");
		
		// The below refers to the History JavaScript stylesheet that I link to in the index HTML file
		// As opposed to being a library that is loaded from the internet, the relevant code is copied 
		// into a JavaScript file and the HTML file is linked to it in static form.

		// What the jQuery History code enables is maintaing the same page layout when something on the webpage has changed
		// and the URL is shared (or opened into a new browser).
	
		// In this example, once one of the buttons is clicked the graph will change according to the unemployment rate start-date
		// that the button triggers. Thanks to the History jQuery code, if we copy the URL of the updated page into a new browser window
		// the same (updated) page will load. 
				
		History.pushState({year:URLyear}, "Unemployment from - "+URLyear, "?year="+URLyear);
		}

		// Below is the gLoaded function 
		
		function gLoaded(){
		
		console.log("google loaded");
		
		// The below refers to the page URL 
		
		var chartURL = History.getState().cleanUrl;
		
		// The URL is a string; split into two sections on the '?' into two pieces

		var gQueryList = chartURL.split("?");
		
		// Below: the default year is the current year that you have in the URL 
		
		var defYear = "1990";
		
		// The below means: if the query array length is greater than 1, then take/use the default year.
		// If the query array = 1, then the year is 1990
		
		if(gQueryList.length > 1){
		
		
		// The below means: get the query string, break it into two on the '=' sign and then 
		// take the right half that contains the year.
		
		// In more detail: If you split on the '=' sign, then you are left with two strings: "year" and "1990"
		// Then it means: get the part/thing which is in position 1, which is 1990
		// The default year also happens to be 1990
		
		// Other comments: the below is not great practice because the readability of the code isn't great 
		// (like a badly formulated sentence); you have to think through what is going on 
		
		defYear = gQueryList[1].split("=")[1];
		
		}
		
		// The below lines of code (113 & 117) refer to the button. The 'btn-success' is part of the Bootstrap library (produces the green button)
		// When clicked (.on("click")), show the new data; 
		// newDataUp refers to the function 
		
		$('.btn-success').on("click", newDataUp);
		
		//grab the button with the id that is "year_"(year)
		
		$("#year_"+defYear).click();
		
		//  The data is loaded from google fusion table instead of a static JSON file. Below I have eliminated the previous, redundant 
		// request thanks to "$.get(gDataURL+"'1980-12-01'"+dataKey, mLoaded, "json");"
		
		//NOW REDUNDANT REQUEST: $.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+12A0eKUXKb4TCFhngfaGqaMEH6uECY1iBhd3VOBAV+WHERE+DATE>'1989-12-01'" +dataKey, mLoaded, "json");
		
		}
		
		function mPageLoaded(){
					
		console.log("got to page Loaded");
		
		//load the google visualization library 
		//Also added the callback - the name of the callback function to be gLoaded
		
		google.load("visualization", "1", {packages:["corechart"], callback: "gLoaded"});

		}
	
	$(document).ready(mPageLoaded);
