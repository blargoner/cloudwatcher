(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['metrics'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    <section class=\"category\" data-category=\"";
  if (stack1 = helpers.Name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\r\n        <header>\r\n            <h2>";
  if (stack1 = helpers.Name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.Name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\r\n        </header>\r\n        <table class=\"metrics\">\r\n            <thead>\r\n                <tr>\r\n                    <th></th>\r\n                    ";
  stack1 = helpers.each.call(depth0, depth0.Dimensions, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                    <th>Name</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody></tbody>\r\n        </table>\r\n    </section>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n                        <th>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</th>\r\n                    ";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.Categories, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  });
})();