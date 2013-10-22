---
layout: post
title:  "Pathway map from Simpheny DB dump"
date:   2013-10-21 13:38:32
author: Niko
---

<!-- <script src="{{ site.baseurl }}/js/pathway.js"></script> -->

Gray: metabolites
Red: midmarkers

**Todo**:

- Make things draggable
- How to translate "MAPLINESEGMENTCONTROLPOINTS": "45933000450b5b184590600045155b18"?

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

        // var drag = d3.behavior.drag()
        //     .origin(Object)
        //     .on("drag", dragmove);

        

        var xmin = d3.min(data.MAPNODE, function(elem) {return parseFloat(elem.MAPNODEPOSITIONX)})
        var xmax = d3.max(data.MAPNODE, function(elem) {return parseFloat(elem.MAPNODEPOSITIONX)})
        var ymin = d3.min(data.MAPNODE, function(elem) {return parseFloat(elem.MAPNODEPOSITIONY)})
        var ymax = d3.max(data.MAPNODE, function(elem) {return parseFloat(elem.MAPNODEPOSITIONY)})

        var xscale = d3.scale.linear().domain([xmin, xmax])
            .range([0, width])
        var yscale = d3.scale.linear().domain([ymin, ymax])
            .range([0, height])

        var isMoleculeQ = function (elem) {
            if (elem.MAPNODENODETYPE == "METABOLITE") {
                return true
            } else {
                return false
            }
        }

        var isMidmarkerQ = function (elem) {
            if (elem.MAPNODENODETYPE == "MIDMARKER") {
                return true
            } else {
                return false
            }
        }

        var isMultimarkerQ = function (elem) {
            if (elem.MAPNODENODETYPE == "MULTIMARKER") {
                return true
            } else {
                return false
            }
        }

        var objID_2_node = {}
        for (var i = data.MAPNODE.length - 1; i >= 0; i--) {
            objID_2_node[data.MAPNODE[i]["MAPOBJECT_ID"]] = data.MAPNODE[i]
        };

        svg.selectAll(".molecule").data(data.MAPNODE.filter(isMoleculeQ)).enter()
            .append("circle")
            .attr("cx", function(d) {return xscale(d.MAPNODEPOSITIONX)})
            .attr("cy", function(d) {return yscale(d.MAPNODEPOSITIONY)})
            .attr("r", 4)
            .attr("fill", "gray")
            .attr("class", "molecule")
            .attr("id", function(d) {return d.MAPOBJECT_ID})
            // .call(drag)

        svg.selectAll(".midmarker").data(data.MAPNODE.filter(isMidmarkerQ)).enter()
            .append("circle")
            .attr("cx", function(d) {return xscale(d.MAPNODEPOSITIONX)})
            .attr("cy", function(d) {return yscale(d.MAPNODEPOSITIONY)})
            .attr("r", 2)
            .attr("fill", "red")
            .attr("class", "molecule")
            .attr("id", function(d) {return d.MAPOBJECT_ID})

        svg.selectAll(".multimarker").data(data.MAPNODE.filter(isMultimarkerQ)).enter()
            .append("circle")
            .attr("cx", function(d) {return xscale(d.MAPNODEPOSITIONX)})
            .attr("cy", function(d) {return yscale(d.MAPNODEPOSITIONY)})
            .attr("r", 2)
            .attr("fill", "green")
            .attr("class", "molecule")
            .attr("id", function(d) {return d.MAPOBJECT_ID})

        svg.selectAll(".text").data(data.MAPTEXT).enter()
            .append("text")
            .attr("x", function(d) {return xscale(d.MAPTEXTPOSITIONX)})
            .attr("y", function(d) {return yscale(d.MAPTEXTPOSITIONY)})
            .text(function(d) {return d.MAPTEXTCONTENT})


        // {
        //   "MAPLINESEGMENTFROMNODE_ID": "1576823",
        //   "METABOLICMAP_ID": "1576807",
        //   "MAPOBJECT_ID": "1576786",
        //   "MAPLINESEGMENTREACTION_ID": "1577505",
        //   "MAPLINESEGMENTTONODE_ID": "1577039"
        // },

        // var line = d3.svg.line()
        //     .x(function(d) { return objID_2_node[d.MAPLINESEGMENTFROMNODE_ID].MAPNODEPOSITIONX })
        //     .y(function(d) { return objID_2_node[d.MAPLINESEGMENTFROMNODE_ID].MAPNODEPOSITIONY })
        //     .interpolate("basis");
        svg.selectAll(".linesegment").data(data.MAPLINESEGMENT).enter()
            .append("line")
            .attr("x1", function(d) {return xscale(objID_2_node[d.MAPLINESEGMENTFROMNODE_ID].MAPNODEPOSITIONX)})
            .attr("y1", function(d) {return yscale(objID_2_node[d.MAPLINESEGMENTFROMNODE_ID].MAPNODEPOSITIONY)})
            .attr("x2", function(d) {return xscale(objID_2_node[d.MAPLINESEGMENTTONODE_ID].MAPNODEPOSITIONX)})
            .attr("y2", function(d) {return yscale(objID_2_node[d.MAPLINESEGMENTTONODE_ID].MAPNODEPOSITIONY)})
            .attr("stroke-width", 2)
            .attr("stroke", "black")

        // MAPREACTION ...
        // var network =

// function move(){
//     this.parentNode.appendChild(this);
//     var dragTarget = d3.select(this);
//     dragTarget
//         .attr("cx", function(){return d3.event.dx + parseInt(dragTarget.attr("cx"))})
//         .attr("cy", function(){return d3.event.dy + parseInt(dragTarget.attr("cy"))});
// };

    //     function dragmove(d) {
    //         this.parentNode.appendChild(this);
    // var dragTarget = d3.select(this);
    // dragTarget
    //     .attr("cx", function(){return d3.event.dx + parseInt(dragTarget.attr("cx"))})
    //     .attr("cy", function(){return d3.event.dy + parseInt(dragTarget.attr("cy"))});
    //     }
        // function dragmove(d) {
        //     console.log(d3.event.x)
        //     d3.select(this)
        //         .attr("cx", d.x = xscale(d3.mouse(svg).x))
        //         .attr("cy", d.y = yscale(d3.mouse(svg).y))
        // }
    })

</script>










