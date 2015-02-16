var colorClock = function(){

  var diameter = 300;
  var radius = diameter/2;
  var markerLength = 10;
  var clockHandLength = radius*.75

  var twelve = {x1: radius, y1: 1, x2: radius, y2: markerLength}
  var nine = {x1: 0, y1: radius, x2: markerLength, y2: radius}
  var three = {x1: diameter, y1: radius, x2: (diameter - markerLength), y2: radius}
  var six = {x1: radius, y1: (diameter - markerLength), x2: radius, y2: diameter}
  var clockMarkerPoints = [twelve, nine, three, six] 

  var getTranslate = function(tick){
    var angle = (360/(60/tick) * Math.PI) / 180;
    var x = radius + (clockHandLength * Math.sin(angle));
    var y = radius - (clockHandLength * Math.cos(angle));
    return 'translate('+ x + ", " + y + ")";
  };

  var drawClockMarkers = function(svg, points){
    for(var i=0; i < points.length; i++){
      var clockMarker = points[i];
      svg.append('line')
      .attr('stroke', 'white')
      .attr('stroke-width', '5')
      .attr('x1', clockMarker.x1)
      .attr('y1', clockMarker.y1)
      .attr('x2', clockMarker.x2)
      .attr('y2', clockMarker.y2)
    }
  }

  var updateClock = function(){
    date = new Date()
    hour = (date.getHours() % 12) * 5 // Standardize around 60
    minute = date.getMinutes()
    second = date.getSeconds()

    time_data = [{'value': hour, 'radius': 30, 'color': 'blue'},
      {'value': minute, 'radius': 25, 'color': 'yellow'},
      {'value': second, 'radius': 20, 'color': 'crimson'}]

    nodes = svg.selectAll('.node').data(time_data)

    nodes.attr('transform', function(d){return getTranslate(d.value)});

    new_nodes = nodes
    .enter().append('g')
    .attr('class', 'node')
    .attr('transform', function(d){return getTranslate(d.value)});

    new_nodes.append('circle')
    .attr('r', function(d){ return d.radius; })
    .attr('fill', function(d){return d.color; })
    .attr('fill-opacity', '0.3');
  }

  var svg = d3.select('#clock').append('svg')
    .attr('width', diameter)
    .attr('height', diameter)

  svg.append('circle')
    .attr('r', radius)
    .attr('fill', 'lightgrey')
    .attr('opacity', 0.4)
    .attr('transform', function(d){return 'translate(' + radius + ', ' + radius + ')'});

  svg.append('circle')
    .attr('r', 5)
    .attr('fill', 'white')
    .attr('transform', function(d){return 'translate(' + radius + ', ' + radius + ')'});

  drawClockMarkers(svg, clockMarkerPoints);


  var run = function(){
    updateClock()
    setTimeout(run, 1000)
  }

  return { 
    init: run
  }
}

colorClock().init();


