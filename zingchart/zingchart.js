
// Receive data from server
fetch( "../data.json" )
.then(function(response){
    return response.json();
    
}).then(function(jsonData){
    
    
     
    
    
    drawPieChart();
    drawLineChart();
    
    function drawPieChart(){
        let label = jsonData.corn_production.map( function(item) { return item.country;} );
        let data = jsonData.corn_production.map( item => item.production );
        console.log(label[1],data[1])
        
        
        var myConfig = {
            "type" : "pie",
            "title" : {
                "font-color":"#8e99a9",
                "text" : "Corn Production",
                "align" : "left",
                "offsetX" : 10,
                "fontSize": 25,
            },
            "plot" : {
                "borderColor" : "#2B313B",
                "borderWidth": 5,
                "valueBox": {
                    "placement": 'out',
                    "text": '%t\n%npv%',
                },
                "tooltip" : {
                    "fontSize" : '18',
                    "padding" : "5 10",
                    "text" : "%npv%"
                },
                "animation" : {
                    "effect" : 2,
                    "method" : 5,
                    "speed" : 900,
                    "sequence" : 1,
                    "delay" : 3000
                },
            },
            
            "legend":{
                "x":"75%",
                "y":"25%",
                "border-width":1,
                "border-color":"gray",
                "border-radius":"5px",
                "header":{
                    "text":"Legend",
                    "font-family":"Georgia",
                    "font-size":12,
                    "font-color":"#3333cc",
                    "font-weight":"normal"
                },
                "marker":{
                    "type":"circle"
                },
                "toggle-action":"remove",
                "minimize":true,
                "icon":{
                    "line-color":"#9999ff"
                },
                "max-items":8,
                "overflow":"scroll"
            },
            "series": [
                {
                    "values": [data[0]],
                    "background-color" : "#50ADF5",
                    "text" : label[0],
                    "detached" : true
                },
                {
                    "values": [data[1]],
                    "background-color" : "#FF7965",
                    "text" : label[1],
                    "detached" : true
                },
                {
                    "values": [data[2]],
                    "background-color" : "#FFCB45",
                    "text" : label[2],
                },
                {
                    "values": [data[3]],
                    "background-color" : "#6877e5",
                    "text" : label[3],
                },
                {
                    "values": [data[4]],
                    "background-color" : "#6FB07F",
                    "text" : label[4],
                },
                                {
                    "values": [data[5]],
                    "background-color" : "#88CC00",
                    "text" : label[5],
                },
                {
                    "values": [data[6]],
                    "background-color" : "#BBEE88",
                    "text" : label[6],
                },
            ]
        
        };
        
        
        zingchart.render({
            
            id : 'pieChart',
            data: myConfig,
            height: "100%",
            width: "100%",
        });
        
             
    }
    
 
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
        
        console.log(data_1,data_2,label)
        var myConfig = {
            "type" : 'line',
            "backgroundColor" : '#2C2C39',
            "title" :{
                "font-color":"#8e99a9",
                "align" : "left",
                "offsetX" : 10,
                "fontSize": 25,
                "text" : 'Population By Age',
                "adjustLayout" : true,
                "fontColor" : "#8e99a9",
                "marginTop" : 7,
            },
            "legend" : 'center',
            "verticalAlign" : 'top',
            "backgroundColor" : 'none',
            "borderWidth" : 0,
            "item" : {
                fontColor: '#E3E3E5',
                cursor : 'hand',
            },
            marker : {
                type : 'circle',
                borderWidth : 0,
                cursor : 'hand',
            },
            plotarea : {
                margin: 'dynamic 70',
            },
            plot : {
                aspect : 'spline',
                lineWidth : 2,
                marker: {
                    borderWidth : 0,
                    size : 5,
                },
            },
            "scale-x" :{
                "label" :{
                    "text" : "Year",
                },
                "values" : label,
                "placement" : "default",
                "tick":{
                    "size" : 20,
                    "placement" : "cross",
                },
                "itemsOverlap" : true,
                "item": {
                    "offsetY" : -15
                },
            },
            "crosshairY" : {
                "lineColor": '#E3E3E5',
                "type": 'multiple',
                "scaleLabel": {
                    decimals : 2,
                    borderRadius : 3,
                    "offsetX" : -5,
                    fontColor: "#2C2C39",
                    bold: true,
                },
            },
            "crosshairX":{
                plotLabel:{
                    multiple: true,
                    borderRadius: 3,
                },
                scaleLabel: {
                    backgroundColor: '#53535e',
                    borderRadius: 3,
                },
                "marker":{
                    size : 7,
                    alpha : 0.5
                },
            },
            series : [
                {
                    text: '0 to 14 years',
                    values : data_1,
                    lineColor : '#E34247',
                    marker: {
                        backgroundColor : '#E34247',
                    },
                },
                {
                    text: '65 years and older',
                    values : data_2,
                    lineColor : '#FEB32E',
                    marker : {
                        backgroundColor : '#FEB32E',
                    },
                },
            ]
        };
        
        zingchart.render({
            id : 'lineChart',
            data: myConfig,
            height:'100%',
            width: '100%',
        });
        
        
        /*
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
        
        
        
     */   
    }

});

    
    