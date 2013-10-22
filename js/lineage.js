function lineage() {

    var width = 1200, // default width
        height = 600; // default height

    function my(data, svg) {
        "use strict";

        svg.append("defs").append("marker")
            .attr("id", "arrowhead")
            .attr("refX", 6 + 3) /*must be smarter way to calculate shift*/
            .attr("refY", 2)
            .attr("markerWidth", 6)
            .attr("markerHeight", 4)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M 0,0 V 4 L6,2 Z"); //this is actual shape for arrowhead

        var cluster = d3.layout.cluster()
            .size([height, width]);

        var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });

        var line = d3.svg.line().interpolate('linear')
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; });

        var elbow = function(d, i) {
          return "M" + d.source.y + "," + d.source.x + "V" + d.target.x + "H" + d.target.y;
        }
        
        var nodes = cluster.nodes(data)
        var links = cluster.links(nodes)

        var min_time_stamp = new Date(d3.min(nodes, function(elem) {return elem.time_stamp}))
        var max_time_stamp = new Date(d3.max(nodes, function(elem) {return elem.time_stamp}))
        var time_scale = d3.time.scale()
        time_scale.domain([min_time_stamp, max_time_stamp])
            .range([0, width])

        // var min_yield = d3.min(nodes, function(elem) {return elem.yield})
        var min_yield = 0
        var max_yield = d3.max(nodes, function(elem) {return elem.yield})
        // var min_growth = d3.min(nodes, function(elem) {return elem.growth})
        var min_growth = 0
        var max_growth = d3.max(nodes, function(elem) {return elem.growth})

        var yield_scale = d3.scale.linear()
        yield_scale.domain([min_yield, max_yield])
            .range([height, 0])

        var growth_scale = d3.scale.linear()
        growth_scale.domain([min_growth, max_growth])
            .range([0, width])

        var axis = d3.svg.axis()
            .tickFormat(function(d) {return d3.time.format('%x')(new Date(d)) })
            .scale(time_scale)
            .orient("bottom");

        svg.append("g")
            .attr("class", "axis")
            .attr("id", "time_axis")
            .attr("transform", "translate(0," + (height + 20)  + ")")
            .call(axis)

        nodes.forEach(function(node) {
            node.y = time_scale(new Date(node.time_stamp))
        })

        

        // var link = svg.selectAll(".link")
        //     .data(links)
        //     .enter().append("path")
        //     .attr("class", "link")
        //     .attr("d",  diagonal);

        var link = svg.selectAll(".link").data(links).enter().append('path')
            .attr("class", "link")
            .attr('d', function (d) {
            return line([{
                y: d.source.x,
                x: d.source.y
            }, {
                y: d.target.x,
                x: d.target.y
            }])
            })
            .attr("marker-end", "url(#arrowhead)")

        var node = svg.selectAll(".node")
            .data(nodes, function(d) {return d.name})
            .enter().append("g")
            .attr("class", "node")
            .attr("id", function(d) {return d.name})
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

        node.append("circle")
            .attr("r", 4.5)

        // Now draw the envelope ...
        nodes.forEach(function(node) {
            node.y = growth_scale(node.growth)
            node.x = yield_scale(node.yield)
        })

        var node = d3.selectAll(".node")
            // .data(nodes, function(d) { return d.name; })
            .data(nodes)

        // Enter ...
        node.enter()

        node.transition().duration(1000)
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

        var link = d3.selectAll(".link")
            .data(links)
            link.enter()
            link.transition().duration(1000)
            .attr('d', function (d) {
            return line([{
                y: d.source.x,
                x: d.source.y
            }, {
                y: d.target.x,
                x: d.target.y
            }]);
        });


        d3.select("#time_axis").transition().delay(500).attr("visibility", "hidden")

        var yield_axis = d3.svg.axis()
            .scale(yield_scale)
            .orient("left");

        var growth_axis = d3.svg.axis()
            .scale(growth_scale)
                        .tickValues([0.,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.,1.1])
            .orient("bottom");

        svg.append("g")
            .attr("class", "axis")
            .attr("id", "growth_axis")
            .attr("transform", "translate(0," + (height + 10)  + ")")
            .call(growth_axis)

        svg.append("g")
            .attr("class", "axis")
            .attr("id", "yield_axis")
            .call(yield_axis)
    }

    my.width = function(value) {
      if (!arguments.length) return width;
      width = value;
      return my;
    };

    my.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return my;
    };

    my.update = function(x, y) {
        d3.selectAll(".node").data()
    }

  return my;
}