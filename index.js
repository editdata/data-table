var BaseElement = require('base-element')
var inherits = require('inherits')
var rowsView = require('./rows')
var propertiesView = require('./properties')

module.exports = DataGrid
inherits(DataGrid, BaseElement)

function DataGrid (options) {
  if (!(this instanceof DataGrid)) return new DataGrid(options)
  options = options || {}
  BaseElement.call(this, options.el)
  this.rows = rowsView(options)
  this.properties = propertiesView(options)
  this.rows.addEventListener('load', function (el) {
    console.log()
    el.style.height = (window.innerHeight - (options.offsetX || 35)) + 'px'
  })
}

DataGrid.prototype.render = function (state) {
  var vtree = this.html('div#data-grid', this, [
    this.properties.render(state.properties),
    this.rows.render(state.data)
  ])
  return this.afterRender(vtree)
}