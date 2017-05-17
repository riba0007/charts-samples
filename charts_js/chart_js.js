
// Receive data from server
fetch( "../data.json" )
.then(function(response){
    return response.json();
    
}).then(function(jsonData){
    
    
    drawPieChart();
    drawLineChart();
    
    function drawPieChart(){

        let label = jsonData.corn_production.map( function(item) { return item.country;} );
        let data = jsonData.corn_production.map( item => item.world_percentage );
        
        var pieChart = new Chart(document.getElementById("pieChart"), {
            type: 'doughnut',
            data: {
                labels: label,
                datasets:[
                    {
                        data: data,
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#FC23E4",
                            "#3A0AAB",
                            "#FA00A0",
                            "#00FF00"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#FC23E4",
                            "#3A0AAB",
                            "#FA00A0",
                            "#00FF00"
                        ]
                    }
                ]
            }
        });      
    }
    
    
    function drawLineChart(){
        /*
         for (let key in jsonData.population){
             
             let values = jsonData.population[key];
            
             let data_1 = jsonData.corn_population.map( function(item) {return item.values._0_to_14_years});
             
             let data_2 = jsonData.corn_population.map( function(item) {return item.values._65_years_and_older});
             
        }
        */
        let lable = [];
        let data_1 = [];
        let data_2 = [];
        
        for (let key in jsonData.population){
            
            let values = jsonData.population[key];
            
            
            //_data.push([Number(key), values._0_to_14_years , values._65_years_and_older]);
            lable.push(key);
            data_1.push(values._0_to_14_years);
            data_2.push(values._65_years_and_older)
        }
        
        var lineChart = new Chart(document.getElementById("lineChart"),{
            type : 'line',
            data : {
                labels: lable,
                datasets: [
                    {
                        label: "0 to 14 years",
                        data: data_1,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        spanGaps: false,
                    },
                    {
                        label: "65 years and older",
                        data: data_2,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(192,2,2,0.4)",
                        borderColor: "rgba(192,2,2,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(192,2,2,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(192,2,2,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        spanGaps: false,
                    }
                ]
            },
            Option : {
                
                responsive: true,
                maintainAspectRatio: true,
            },
            
        });
        
        
        
        
    }

});

    
    