(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['plotter'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div id=\"settings\">\r\n    <label for=\"range\">Range:</label>\r\n    <select id=\"range\">\r\n        <option value=\"3600000\">Last hour</option>\r\n        <option value=\"10800000\">Last 3 hours</option>\r\n        <option value=\"21600000\">Last 6 hours</option>\r\n        <option value=\"43200000\">Last 12 hours</option>\r\n        <option value=\"86400000\">Last day</option>\r\n        <option value=\"604800000\">Last week</option>\r\n        <option value=\"1209600000\">Last 2 weeks</option>\r\n    </select>\r\n    <label for=\"period\">Period:</label>\r\n    <select id=\"period\">\r\n        <option value=\"60\">1 minute</option>\r\n        <option value=\"300\">5 minutes</option>\r\n        <option value=\"900\">15 minutes</option>\r\n        <option value=\"3600\">1 hour</option>\r\n        <option value=\"86400\">1 day</option>\r\n    </select>\r\n    <label for=\"statistic\">Statistic:</label>\r\n    <select id=\"statistic\">\r\n        <option value=\"Average\">Average</option>\r\n        <option value=\"Maximum\">Maximum</option>\r\n        <option value=\"Minimum\">Minimum</option>\r\n        <option value=\"Sum\">Sum</option>\r\n        <option value=\"SampleCount\">Samples</option>\r\n    </select>\r\n</div>\r\n<div id=\"plot\"></div>\r\n";
  });
})();