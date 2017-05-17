
// Receive data from server
fetch( "../data.json" )
.then( function( response ){
    
    return response.json();
    
}).then( function( jsonData ){
    
    /***Pie chart***/
    
    // Getting label and data from json
    let data_pie = {
        labels: jsonData.corn_production.map( item => item.country ),
        series: jsonData.corn_production.map( item => item.world_percentage )
    };
    
    //chart options
    let options_pie = {
        donut: true,
        labelInterpolationFnc: function(value) {
            return value[0]
        }
    };
    
    //responsive options
    let responsiveOptions_pie = [
        ['screen and (min-width: 640px)', {
                chartPadding: 100,
                labelOffset: 100,
                labelDirection: 'explode',
                labelInterpolationFnc: function(value) {
                    return value;
                }
            }],
            ['screen and (min-width: 1024px)', {
                labelOffset: 100,
                chartPadding: 100
        }]
    ];
    
    //draw pie chart
    let pieChart = new Chartist.Pie('#pieChart', data_pie, options_pie, responsiveOptions_pie);
    
    //animation (http://gionkunz.github.io/chartist-js/examples.html)
    pieChart.on('draw', function(data) {
        if(data.type === 'slice') {
            let pathLength = data.element._node.getTotalLength();

            data.element.attr({
                'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
            });

            let animationDefinition = {
                'stroke-dashoffset': {
                    id: 'anim' + data.index,
                    dur: 300,
                    from: -pathLength + 'px',
                    to:  '0px',
                    easing: Chartist.Svg.Easing.easeOutQuint,
                    fill: 'freeze'
                }
            };

            if(data.index !== 0) {
                animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
            }

            data.element.attr({
                'stroke-dashoffset': -pathLength + 'px'
            });

            data.element.animate(animationDefinition, false);
        }
    });

    pieChart.on('created', function() {
        if(window.__anim21278907124) {
            clearTimeout(window.__anim21278907124);
            window.__anim21278907124 = null;
        }
    });

    
    
    /***Line chart***/
    
    // Getting label and data from json
    let data_line = {
        labels: [],
        series: [[],[]]
    };
    
    for (let key in jsonData.population){
            
        let values = jsonData.population[key];

        data_line.labels.push(key);
        data_line.series[0].push(values._0_to_14_years);
        data_line.series[1].push(values._65_years_and_older);

    }
    
    //responsive options
    let responsiveOptions_line = [
        ['screen and (min-width: 641px) and (max-width: 1024px)', {
            showPoint: false
        }],
        ['screen and (max-width: 640px)', {
            showLine: false
        }]
    ];

    //draw line chart
    let lineChart = new Chartist.Line('#lineChart', data_line, null, responsiveOptions_line);
      
    //animation (http://gionkunz.github.io/chartist-js/examples.html)
    let seq = 0,
    delays = 30,
    durations = 200;

    lineChart.on('created', function() {
        seq = 0;
    });

    lineChart.on('draw', function(data) {
        seq++;

        if(data.type === 'line') {
            data.element.animate({
                opacity: {
                    begin: seq * delays + 500,
                    dur: durations,
                    from: 0,
                    to: 1
                }
            });
        } else if(data.type === 'label' && data.axis === 'x') {
            data.element.animate({
                y: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.y + 70,
                    to: data.y,
                    easing: 'easeOutQuart'
                }
            });
        } else if(data.type === 'label' && data.axis === 'y') {
            data.element.animate({
                x: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 70,
                    to: data.x,
                    easing: 'easeOutQuart'
                }
            });
        } else if(data.type === 'point') {
            data.element.animate({
                x1: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                },
                x2: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                },
                opacity: {
                    begin: seq * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'easeOutQuart'
                }
            });
        } else if(data.type === 'grid') {
            let pos1Animation = {
                begin: seq * delays,
                dur: durations,
                from: data[data.axis.units.pos + '1'] - 30,
                to: data[data.axis.units.pos + '1'],
                easing: 'easeOutQuart'
            };

            let pos2Animation = {
                begin: seq * delays,
                dur: durations,
                from: data[data.axis.units.pos + '2'] - 70,
                to: data[data.axis.units.pos + '2'],
                easing: 'easeOutQuart'
            };

            let animations = {};
            animations[data.axis.units.pos + '1'] = pos1Animation;
            animations[data.axis.units.pos + '2'] = pos2Animation;
            animations['opacity'] = {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'easeOutQuart'
            };

            data.element.animate(animations);
        }
    });

    lineChart.on('created', function() {
        if(window.__exampleAnimateTimeout) {
            clearTimeout(window.__exampleAnimateTimeout);
            window.__exampleAnimateTimeout = null;
        }
    });

    
}).catch( function ( error ){
    
    document.querySelector( "h1" ).textContent = error.message;
    
});

