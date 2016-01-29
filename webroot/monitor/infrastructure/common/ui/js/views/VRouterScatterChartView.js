/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'contrail-view'], function(_, ContrailView) {
   var VRouterScatterChartView = ContrailView.extend({
       render: function() {
            var widgetConfig = getValueByJsonPath(this,'attributes;viewConfig;widgetConfig');
            var self = this;
            self.cfDataSource = getValueByJsonPath(self,'attributes;viewConfig;cfDataSource',null,false);
            if(widgetConfig != null) {
                this.renderView4Config(this.$el,this.model,widgetConfig);
            }
           this.renderView4Config(this.$el,
           this.model,
           getVRouterScatterChartViewConfig(self));
       }
   });

   function getVRouterScatterChartViewConfig(self) {
       return {
           elementId: ctwl.VROUTER_SUMMARY_SCATTERCHART_SECTION_ID,
           view: "SectionView",
           viewConfig: {
               rows: [{
                   columns: [{
                       elementId: ctwl.VROUTER_SUMMARY_SCATTERCHART_ID,
                       title: ctwl.VROUTER_SUMMARY_TITLE,
                       view: "ZoomScatterChartView",
                       viewConfig: {
                           loadChartInChunks: true,
                           cfDataSource : self.cfDataSource,
                           chartOptions: {
                               doBucketize: false,
                               xLabel: 'CPU (%)',
                               yLabel: 'Memory (MB)',
                               forceX: [0, 1],
                               forceY: [0, 20],
                               // yLabelFormat: d3.format(".02f"),
                               // xLabelFormat: d3.format(".02f"),
                               // dataParser: function(response) {
                               //     var chartDataValues = [];
                               //     for (var i = 0; i < response.length; i++) {
                               //         var vRouterNode = response[i];
                               //
                               //         chartDataValues.push({
                               //             name: vRouterNode['name'],
                               //             y: ifNotNumeric(vRouterNode['y'],0),
                               //             x: ifNotNumeric(vRouterNode['x'],0),
                               //             color: vRouterNode['color'],
                               //             size: contrail.handleIfNull(
                               //                  vRouterNode['size'],0),
                               //             rawData: vRouterNode
                               //         });
                               //     }
                               //     return chartDataValues;
                               // },
                               // tooltipConfigCB: getVRouterTooltipConfig,
                               tooltipConfigCB: monitorInfraUtils.vRouterTooltipFn,
                               bucketTooltipFn: monitorInfraUtils.vRouterBucketTooltipFn,
                               clickCB: monitorInfraUtils.onvRouterDrillDown
                           }
                       }
                   }]
               }]
           }
       };
   }
   return VRouterScatterChartView;
});