---
layout: post
title:  "Strain lineage"
date:   2013-10-21 13:38:32
categories: jekyll update
---

<script src="{{ site.baseurl }}/js/lineage.js"></script>

<div id="lineage"></div>

<script>


var margin = {top: 20, right: 20, bottom: 20, left: 20},
    padding = {top: 60, right: 50, bottom: 60, left: 50},
    outerWidth = 960,
    outerHeight = 700,
    innerWidth = outerWidth - margin.left - margin.right,
    innerHeight = outerHeight - margin.top - margin.bottom,
    width = innerWidth - padding.left - padding.right,
    height = innerHeight - padding.top - padding.bottom;

// var lineage_chart_temporal = lineage_temporal().width(width).height(height)
// var lineage_chart_growth_vs_yield = lineage_growth_vs_yield().width(width).height(height)
var lineage_chart_hack = lineage_hack().width(width).height(height)

var svg = d3.select("#lineage").append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight)
    .append("g")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")");


    d3.json("{{ site.baseurl }}/data/lineage_yields_growth.json", function(error, data) {
    if (error) {console.log(error)};
    
    // lineage_chart_temporal(data, svg)
    // lineage_chart_growth_vs_yield(data, svg)
    lineage_chart_hack(data, svg)

});


</script>