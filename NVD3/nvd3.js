
// Receive data from server
fetch( "../data.json" )
.then( function( response ){
    
    return response.json();
    
}).then( function( jsonData ){
    
    /**pie chart**/
    let pieData = jsonData.corn_production.map(function(item){ 
                                                    return { "label" : item.country , "value" : item.world_percentage }
                                                });
    
    nv.addGraph(function() {
        let pieChart = nv.models.pieChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .labelType("percent")
            .showLabels(true);

        d3.select("#pieChart svg")
            .datum(pieData)
            .transition().duration(350)
            .call(pieChart);

        return pieChart;
    });
    
    /**line chart**/
    nv.addGraph(function() {
        let lineChart = nv.models.lineChart()
            .margin({left: 100})
            .useInteractiveGuideline(true)
            .showLegend(true) 
            .showYAxis(true) 
            .showXAxis(true)
        ;

        lineChart.xAxis 
            .axisLabel('Year');

        lineChart.yAxis
            .axisLabel('Population (mi)')
            .tickFormat(d3.format('.02f'));

        let lineData = getLineData();

        d3.select('#lineChart svg')
            .datum(lineData)
            .call(lineChart);

        nv.utils.windowResize(function() { lineChart.update() });
            return lineChart;
    });
    
    function getLineData(){
        let group1 = {
            values: [],
            key: "0 to 14 years"
        };
        let group2 = {
            values: [],
            key: "65 years and older"
        };
        
        for (let key in jsonData.population){
            
            let values = jsonData.population[key];
            
            group1.values.push({x : key , y: values._0_to_14_years});
            group2.values.push({x : key , y: values._65_years_and_older});
        }
        
        console.log([group1 , group2]);
        return [group1 , group2];
    }
    
}).catch( function ( error ){
    
    document.querySelector( "h1" ).textContent = error.message;
    console.log(error);
    
});