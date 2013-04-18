(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['plotter'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div id=\"settings\">\n    <label for=\"range\">Range:</label>\n    <select id=\"range\" class=\"setting\">\n        <option value=\"3600000\">Last hour</option>\n        <option value=\"10800000\">Last 3 hours</option>\n        <option value=\"21600000\">Last 6 hours</option>\n        <option value=\"43200000\">Last 12 hours</option>\n        <option value=\"86400000\">Last day</option>\n        <option value=\"604800000\">Last week</option>\n        <option value=\"1209600000\">Last 2 weeks</option>\n    </select>\n    <label for=\"period\">Period:</label>\n    <select id=\"period\" class=\"setting\">\n        <option value=\"60\">1 minute</option>\n        <option value=\"300\">5 minutes</option>\n        <option value=\"900\">15 minutes</option>\n        <option value=\"3600\">1 hour</option>\n        <option value=\"86400\">1 day</option>\n    </select>\n    <label for=\"statistic\">Statistic:</label>\n    <select id=\"statistic\" class=\"setting\">\n        <option value=\"Average\">Average</option>\n        <option value=\"Maximum\">Maximum</option>\n        <option value=\"Minimum\">Minimum</option>\n        <option value=\"Sum\">Sum</option>\n        <option value=\"SampleCount\">Samples</option>\n    </select>\n    <button id=\"refreshstatistics\">Refresh</button>\n</div>\n<div id=\"plot\"></div>\n";
  });
})();