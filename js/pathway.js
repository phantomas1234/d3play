function pathway() {

    var width = 1200, // default width
        height = 600; // default height

    function my(net, svg) {
        "use strict";

        var xmin = d3.min(net.nodes, function(node) {return node.x})
        var xmax = d3.max(net.nodes, function(node) {return node.x})
        var ymin = d3.min(net.nodes, function(node) {return node.y})
        var ymax = d3.max(net.nodes, function(node) {return node.y})
        var xscale = d3.scale.linear().domain([xmin, xmax]).range([0, width])
        var yscale = d3.scale.linear().domain([ymin, ymax]).range([height, 0])

        for (var i = net.nodes.length - 1; i >= 0; i--) {
            net.nodes[i].x = xscale(net.nodes[i].x)
            net.nodes[i].y = yscale(net.nodes[i].y)
        };

        var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });

        var force = d3.layout.force()
        force.alpha(0.)
        force.nodes(net.nodes).links(net.links).start()
        var link = svg.selectAll(".link")
            .data(net.links)
            .enter()
            // .append("path")
            // .attr("class", "link")
            // .attr("d",  diagonal)
            .append("line")
            .attr("class", "link")

        var original_title = d3.select("title").text()
        console.log(original_title)

        var node = svg.selectAll(".node")
            .data(net.nodes)
            .enter().append("circle") // If you wonder why enter() is used, see the documentatin
            .attr("class", "node")
            .attr("r", 2.5)
            .attr("fill", function(d) {d3.curr})
            .on("mouseover", function (d) {d3.select("title").text(d.id)})
            .on("mouseout", function (d) {d3.select("title").text(original_title)})
            .call(force.drag);

        force.on("tick", function() {
        force.alpha(0.)
        link.attr("x1", function(d) { return d.source.x })
            .attr("y1", function(d) { return d.source.y })
            .attr("x2", function(d) { return d.target.x })
            .attr("y2", function(d) { return d.target.y })    
        node.attr("cx", function(d) { return d.x})
            .attr("cy", function(d) { return d.y })
        })

        svg.selectAll("")

  }


  // var addConstraints = function (d, i) {
  //   var max = 5.1
  //   var min = 0
  //   if (d.type == 'metabolite') {
  //     d.x = d.x + (Math.random() * (max - min) + min)
  //     d.y = d.y + (Math.random() * (max - min) + min)
  //   };

  //   }

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

  return my;
}