(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['metric'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    <td>";
  if (stack1 = helpers.Value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n";
  return buffer;
  }

  buffer += "<td><input type=\"checkbox\" class=\"watch\" /></td>\r\n";
  stack1 = helpers.each.call(depth0, depth0.Dimensions, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n<td>";
  if (stack1 = helpers.MetricName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.MetricName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\r\n";
  return buffer;
  });
})();