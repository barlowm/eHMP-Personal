define(["backbone","highcharts","moment"],function(t,e,i){var n={returnChartOptions:function(t){var e,i,n={},a=[],o=0,r=[],d=[],h=[];(new Date).getTime();$.each(t,function(t,e){var i=e.Medication;r.push(i),o=t,$.each(e.plotLines,function(t,e){h.push({value:o+".4",color:"green",dashStyle:"LongDashDotDot",width:1,zIndex:100,label:{text:e.label.text,style:{fontWeight:"bold",fontSize:"100%"}}})}),$.each(e.data,function(t,e){var i={id:e.id,index:e.index,linkedTo:e.linkedTo,legendIndex:e.legendIndex,name:e.name,color:e.color,lineWidth:e.lineWidth,lineColor:e.lineColor,width:e.width,fillColor:e.fillColor,shadow:e.shadow,marker:e.marker,line:e.line,showInLegend:e.showInLegend,pointPadding:e.pointPadding,data:[]};if($.each(e.intervals,function(t,n){i.data.push({name:i.name,x:n.from,y:o,from:n.from,to:n.to},{name:i.name,x:n.to,y:o,from:n.from,to:n.to}),d.push(n.from),e.intervals[t+1]&&i.data.push([(n.to+e.intervals[t+1].from)/2,null])}),i.data.length>0)if(i.name in n){var a=i.data[0].from,r=n[i.name].data[n[i.name].data.length-1].to;n[i.name].data.push([(r+a)/2,null]),n[i.name].data=n[i.name].data.concat(i.data)}else n[i.name]=i})}),15>o?(e=.1,i=.06):o>=15&&35>=o?(e=.04,i=.04):(e=.01,i=.01),$.each(n,function(t,e){a.push(e)});var l={outpatientChartOptions:{chart:{renderTo:"graphContainer",zoomType:"y",marginRight:30,alignTicks:!1,height:40*t.length,resetZoomButton:{relativeTo:"chart",theme:{display:"none"}},events:{selection:function(t){this.zoomMode||(this.originalSize={width:this.chartWidth,height:this.chartHeight});var e=Math.round(this.chartHeight*(t.yAxis[0].max-t.yAxis[0].min)/(this.yAxis[0].max-this.yAxis[0].min));400>e&&(e=400),this.setSize(this.chartWidth,e,!1),this.zoomMode=!0,$(".mr_reset").show()}},marginBottom:50},credits:{enabled:!1},title:{text:" "},xAxis:{type:"datetime",minPadding:.1,opposite:!0,gridLineColor:"rgba(228,222,222, 0.4)",gridLineWidth:2},yAxis:{showEmpty:!1,tickInterval:1,labels:{formatter:function(){return void 0!==r[this.value]?"<b>"+r[this.value]+"</b>":void 0},useHTML:!0,style:{color:"#7C7B78",fontWeight:"bold"}},startOnTick:!1,endOnTick:!1,title:{text:"Medications"},minPadding:i,maxPadding:e,plotLines:h},tooltip:{enabled:!1,crosshairs:!1,followPointer:!1},plotOptions:{series:{states:{hover:{enabled:!1}}}},legend:{enabled:!0,floating:!0},series:a}};return l}};return n});