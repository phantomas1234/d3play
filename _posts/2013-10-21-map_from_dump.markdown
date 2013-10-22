---
layout: post
title:  "Pathway map from Simpheny DB dump"
date:   2013-10-21 13:38:32
author: Niko
---

<!-- <script src="{{ site.baseurl }}/js/pathway.js"></script> -->

<div class="body"></div>

<script type="text/javascript">

    var margin = {top: 20, right: 20, bottom: 20, left: 20},
    padding = {top: 60, right: 50, bottom: 60, left: 50},
    outerWidth = 960,
    outerHeight = 700,
    innerWidth = outerWidth - margin.left - margin.right,
    innerHeight = outerHeight - margin.top - margin.bottom,
    width = innerWidth - padding.left - padding.right,
    height = innerHeight - padding.top - padding.bottom;

    var svg = d3.select(".body").append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
        .append("g")
        .attr("transform", "translate(" + padding.left + "," + padding.top + ")");
    
    d3.json("{{ site.baseurl }}/data/coremap_dump.json", function (error, data) {
      
        if (error) {console.log(error)};

        var xmin = d3.min(data.MAPNODE, function(elem) {return parseFloat(elem.MAPNODEPOSITIONX)})
        var xmax = d3.max(data.MAPNODE, function(elem) {return parseFloat(elem.MAPNODEPOSITIONX)})
        var ymin = d3.min(data.MAPNODE, function(elem) {return parseFloat(elem.MAPNODEPOSITIONY)})
        var ymax = d3.max(data.MAPNODE, function(elem) {return parseFloat(elem.MAPNODEPOSITIONY)})

        var xscale = d3.scale.linear().domain([xmin, xmax])
            .range([0, width])
        var yscale = d3.scale.linear().domain([ymin, ymax])
            .range([0, height])

        svg.selectAll(".molecule").data(data.MAPNODE).enter()
            .append("circle")
            .attr("cx", function(d) {return xscale(d.MAPNODEPOSITIONX)})
            .attr("cy", function(d) {return yscale(d.MAPNODEPOSITIONY)})
            .attr("r", 5)
            .attr("fill", "black")
            .attr("class", "molecule")
            .attr("id", function(d) {return d.MAPOBJECT_ID})

    })

</script>










