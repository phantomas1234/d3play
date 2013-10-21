---
layout: post
title:  "Pathway map"
date:   2013-10-21 13:38:32
categories: jekyll update
---

<script src="{{ site.baseurl }}js/pathway.js"></script>

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
        
        var pathway_chart = pathway()
        pathway_chart.width(width).height(height)

        d3.json("/data/ecoli_core_bipartite.json", function (error, data) {
          console.log(10)
          if (error) {console.log(error)};
          pathway_chart(data, svg)

        })

      </script>