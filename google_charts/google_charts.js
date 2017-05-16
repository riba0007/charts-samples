
// Receive data from server
fetch( "../data.json" )
.then( function( response ){
    
    return response.json();
    
}).then( function( jsonData ){
    
    // Load Charts and the corechart package.
    google.charts.load('current', {packages: ['corechart']});

    // Draw the pie chart
    google.charts.setOnLoadCallback(drawPieChart);

    // Draw the line chart
    google.charts.setOnLoadCallback(drawLineChart);


    // Callback function for pie chart
    function drawPieChart(){
        
        let _data = [["country","percentage"]].concat( jsonData.corn_production.map( item => [ item.country , item.world_percentage ]));
        
        let data = google.visualization.arrayToDataTable( _data );
        
        let options = {
            title: 'Corn Production'
        };
        
        let chart = new google.visualization.PieChart( document.getElementById( 'pieChart' ));

        chart.draw( data, options );
        
    }

    // Callback function for line chart
    function drawLineChart(){
        
        let data = new google.visualization.DataTable();
        data.addColumn('number', 'Year');
        data.addColumn('number', '0 to 14 years');
        data.addColumn('number', '65 years and older');

        let _data = [];
        
        for (let key in jsonData.population){
            
            let values = jsonData.population[key];
            
            _data.push([Number(key), values._0_to_14_years , values._65_years_and_older]);
            
        }

        data.addRows( _data );
        
        let options = {
          title: 'Population by Age',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        let chart = new google.visualization.LineChart(document.getElementById('lineChart'));

        chart.draw(data, options);
        
    }
    
}).catch( function (error ){
    
    document.querySelector( "h1" ).textContent = error.message;
    
});

