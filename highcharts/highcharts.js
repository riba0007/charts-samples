
// Receive data from server
fetch( "../data.json" )
.then(function(response){
    return response.json();
    
}).then(function(jsonData){
    
    
     
    
    
    drawPieChart();
    drawLineChart();
    
    function drawPieChart(){
        
        let data = jsonData.corn_production.map(function(item){ 
            return { "name" : item.country , "y" : item.world_percentage }
        });
        
        
        
        var myChart = Highcharts.chart('pieChart',{
            chart:{
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
            },
            title:{
                text: 'Corn Production',
            },
             tooltip: {
                 pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
             },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                    enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Corn Production',
                colorByPoint: true,
                data: data,
            }],
        });
    };
                                       
    function drawLineChart(){
        
        let label = [];
        let data_1 = [];
        let data_2 = [];
        
        for (let key in jsonData.population){
            
            let values = jsonData.population[key];
            label.push(key);
            data_1.push(values._0_to_14_years);
            data_2.push(values._65_years_and_older)
        }
        
        console.log(label, data_1, data_2);
        
        var myChart = Highcharts.chart('lineChart',{
            title: {
                text: 'Population By Age',
            },
            
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
                
            },
            
            xAxis:{
                categories: label,
            },
            
            series: [{
                name: '0 to 14 years',
                data: data_1,
            },{
                name: '65 years and older',
                data: data_2,
                         
                     }],
            
        });
        
    };

});
                                       

    
    