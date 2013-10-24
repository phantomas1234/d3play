---
layout: post
title:  "Pathway map using Zak's visbio"
date:   2013-10-21 13:38:32
author: Niko
---
<link rel="stylesheet" href="{{ site.baseurl }}/css/metabolic-map.css">
<script src="{{ site.baseurl }}/js/visbio/visbio.min.js" onload="console.log(visbio);"></script>




<script type="text/javascript">

    visbio.metabolic_map({ fill_screen: true, map_path: "{{ site.basurl}}/data/ijo-central.json" });
</script>