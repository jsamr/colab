function __guard__ (value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined
}
function __in__ (needle, haystack) {
  return haystack.indexOf(needle) >= 0
}

define('tree-view-prototype',
  ['utils/serializeData', 'proto/project',
    'collections/projects', 'utils/alerts'], function (serializeData, projectPrototype, Projects, Alerts) {
    let logger = new Logger('projects:templates:protos')
    let d3TreeBuilder = (function () {
      // private vars
      let _instances = []
      // private static vars
      let _nodeHeight = 85
      let _heightRatio = 0.85
      let _nodeWidth = 250
      let _innerNodeWidth = _nodeWidth - 10
      let _yOffset = -20
      let _transitionSlow = 800
      let _transitionFast = 400
      let _widthDomNodeReference = 'li.accordion-navigation'
      let _diagonal = d3.svg.diagonal().projection(d => [ d.y, d.x])

      // private static functions
      let _key = elem => elem._id
      let _serialize = raw => serializeData(_makeSerializable(raw))
      var _makeSerializable = task => lodash.pick(task, '_id')
      let _getId = d => d._id
      let _name = d => d.name
      let _color = d => d.color
      let _emptyDiagonal = function (path) {
        let o = {
          x: path.source.x,
          y: path.source.y
        }
        return _diagonal({source: o,target: o})
      }

      let _translate = d => `translate(${d.y},${d.x})`

      let constructor = function (parameters) {
        let { project } = parameters
        let { accessor } = parameters
        let { remove } = parameters
        let { add } = parameters
        let { template } = parameters
        let { elementName } = parameters
        let { rootDom } = parameters
        Assert.isPrototypeOf(projectPrototype, project)
        Assert.string(accessor, 'accessor')
        Assert.string(template, 'editTemplateName')
        Assert.string(elementName, 'elementName')
        Assert.string(rootDom, 'rootDom')
        let _dataTree = undefined
        let _project = project
        let _flatNodes = undefined
        let instance = {}
        let recursiveHeightComputation = function (root, currentMax = 0) {
          let childrenHeight = lodash((root.children || []))
              .reject(child => child._id === root._id)
              .map(child => recursiveHeightComputation(child, 0))
              .sum() || 0
          let currentHeight = (__guard__(root.children, x => x.length) || 1) * _nodeHeight * _heightRatio
          return Math.max(currentHeight, currentMax, childrenHeight)
        }

        let deleteItem = function (item) {
          let childrenIds = lodash(item.children || []).map('_id').value()
          instance.project[remove](item._id)
          return Alerts.new({
            severity: 'warning',
            message: `La ${elementName} ${item.name} a bien été retirée.`,
            btnLabel: 'ANNULER',
            callback() { return instance.project[add](lodash.omit(item, [ 'children', 'parent', 'x', 'y', 'depth' ]), true, childrenIds); }
          })
        }
        instance.defineReadOnlyProperty('__type__', 'd3TreeBuilder')
        instance.definePropertyStrict('project', {
          configurable: false,
          enumerable: true,
          set(prj) {
            _project = Assert.isPrototypeOf(projectPrototype, prj)
            return this.flatNodes = prj.propertyPath(accessor) || []
          },
          get() { return _project; }
        }
        ).definePropertyStrict('flatNodes', {
          configurable: false,
          enumerable: true,
          set(data) {
            _flatNodes = data
            let ids = lodash.map(_flatNodes, '_id')
            let groupedMap = _.groupBy(data, function (task) {
              if (task.parentId === null || task.parentId === undefined || task.parentId === task._id || !__in__(task.parentId, ids)) { return 'root'
              } else { return task.parentId; }
            }
            )
            let bindChildren = function (rootElem) {
              rootElem['children'] = groupedMap[rootElem._id]
              delete groupedMap[rootElem._id]
              return lodash(rootElem.children || []).forEach(bindChildren)
            }
            _dataTree = groupedMap['root'] || []
            return _dataTree.forEach(bindChildren)
          },
          get() { return _flatNodes; }
        }
        ).defineReadOnlyProperty('bind', function () {
          this._resizer = $(window).resize(this.render)
          return _instances.push(this)
        }
        ).defineReadOnlyProperty('render', _.debounce((function () {
          let width = parseInt($(_widthDomNodeReference).width(), 10) - 30
          let svgRoots = d3.select(rootDom).selectAll('svg[flat-nodes-root-id]').data(_dataTree, _key)
          let svgG = svgRoots.enter().append('svg').style('overflow', 'visible').attr('flat-nodes-root-id', _key).append('svg:g')
          svgG.append('svg:g').attr('id', 'linksGroup')
          svgG.append('svg:g').attr('id', 'nodesGroup')
          let tree = size => d3.layout.tree().size(size)
          svgRoots.transition().duration(_transitionSlow).attr('height', recursiveHeightComputation).attr('width', width)
          let nodesDrawings = svgRoots.select('g#nodesGroup').selectAll('.node').data(function (data) {
            let computedSize = [
              data.children ? data.children.length * _nodeHeight * _heightRatio : _nodeHeight * _heightRatio,
              width - _nodeWidth
            ]
            computedSize = [
              recursiveHeightComputation(data),
              width - _nodeWidth
            ]
            let nodeTree = tree(computedSize)
            let nodes = nodeTree.nodes(data, _key)
            let linksDrawings = d3.select(this.parentNode.parentNode).select('g#linksGroup').selectAll('.link').data(nodeTree.links(nodes, _key))
            linksDrawings.enter().append('svg:path').attr('d', _emptyDiagonal).attr('class', 'link')
            linksDrawings.transition().duration(_transitionFast).attr('d', _diagonal)
            linksDrawings.exit().transition().duration(_transitionFast).attr('d', _emptyDiagonal).remove()
            return nodes
          })
          svgRoots.exit().transition().duration(_transitionFast).remove()
          svgRoots.exit().selectAll('.foreignobject > div').transition().duration(_transitionFast).style('opacity', 0)
          let enteringNode = nodesDrawings.enter().append('svg:g').attr('class', 'node').attr('height', _nodeHeight).attr('width', _nodeWidth).attr('transform', _translate)
          let htmlEnteringNode = enteringNode
            .append('svg:foreignObject').attr('height', _nodeHeight).attr('width', _nodeWidth).attr('y', _yOffset).attr('requiredFeatures', 'http://www.w3.org/TR/SVG11/feature#Extensibility').attr('class', 'foreignobject').style('overflow', 'visible')
            .append('xhtml:div').attr('class', 'annotation-category tree clearfix').style('width', `${_innerNodeWidth}px`)
          htmlEnteringNode.style('opacity', 0)
          let idNode = htmlEnteringNode.append('xhtml:span').attr('class', 'id-span fa-stack fa-lg')
          idNode.append('xhtml:i').attr('class', 'fa fa-circle fa-stack-2x circle-id')
          idNode.append('xhtml:i').attr('class', 'fa fa-inverse fa-stack-1x text-id')
          htmlEnteringNode.append('xhtml:span').attr('class', 'name-span')
          let updatingNode = nodesDrawings
          updatingNode.attr('transform', _translate)
          updatingNode.select('.foreignobject > div.annotation-category > span.id-span > i.text-id').transition().duration(_transitionFast).text(_getId)
          updatingNode.select('.foreignobject > div.annotation-category > span.name-span').transition().duration(_transitionFast).text(_name)
          updatingNode.transition().duration(_transitionFast).select('.foreignobject > div').style('background-color', _color).style('opacity', 1)
          let actions = htmlEnteringNode.append('xhtml:span').attr('class', 'annotation-category-actions right ')
          actions.append('xhtml:a').attr('class', 'minibutton success borderless').attr('data-hovercard', template).attr('data-trigger', 'click').append('xhtml:i').attr('class', 'fa fa-edit')
          actions.append('xhtml:a').attr('class', 'minibutton alert borderless').append('xhtml:i').attr('class', 'fa fa-times')
          updatingNode.select('.foreignobject > div.annotation-category > span.annotation-category-actions > a.minibutton.success').attr('data-params', _serialize)
          updatingNode.select('.foreignobject > div.annotation-category > span.annotation-category-actions > a.minibutton.alert').on('click', deleteItem)
          nodesDrawings.exit().transition().duration(_transitionFast).remove()
          nodesDrawings.exit().select('.foreignobject > div').transition().duration(_transitionFast).style('opacity', 0)
        }), 200, false)).defineReadOnlyProperty('unbind', function () {
          // remove listener
          if (this._resizer) { return this._resizer.off()
          } else { return logger.warn(this.__type__ + ' instance was not bound while attempting to unbind it.'); }
        }
        )

        return instance
      }

      constructor.defineReadOnlyProperty('unbindInstances', () => (() => {
        let result = []
        while (_instances.length) {
          result.push(_instances.pop().unbind())
        } return result;})()

      )
      return constructor
    })()
    logger.debug('Exporting tree view prototypes wrapped in object')
    // Prototypes to return
    return {
      taskView: Object.create(d3TreeBuilder({
        project: Object.create(projectPrototype),
        accessor: 'plugins.tasks',
        remove: 'removeTaskType',
        add: 'addTaskType',
        template: 'projects$each$management_template_newTaskType',
        elementName: 'tâche',
        rootDom: '#tasks-tree-view'
      })
      ),
      categoriesView: Object.create(d3TreeBuilder({
        project: Object.create(projectPrototype),
        accessor: 'plugins.annotations.categories',
        remove: 'removeAnnotationCategory',
        add: 'addAnnotationCategory',
        template: 'projects$each$management_template_newAnnotationCategory',
        elementName: 'catégorie',
        rootDom: '#categories-tree-view'
      })
      ),
      unbindInstances: d3TreeBuilder.unbindInstances
    }
  }
)
