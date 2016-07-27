import { $ } from 'meteor/jquery'

class ViewBox {
  constructor (el) {
    this.getWidth = this.getWidth.bind(this)
    this.getHeight = this.getHeight.bind(this)
    this.getXstart = this.getXstart.bind(this)
    this.getYstart = this.getYstart.bind(this)
    this.setWidth = this.setWidth.bind(this)
    this.setHeight = this.setHeight.bind(this)
    this.setXstart = this.setXstart.bind(this)
    this.setYstart = this.setYstart.bind(this)
    this.reset = this.reset.bind(this)
    this.write = this.write.bind(this)
    this.el = el
    this.reset()
  }
  getWidth () {
    return this._valArray[2]
  }
  getHeight () {
    return this._valArray[3]
  }
  getXstart () {
    return this._valArray[0]
  }
  getYstart () {
    return this._valArray[1]
  }
  setWidth (w) {
    this._valArray[2] = w
    return this
  }
  setHeight (h) {
    this._valArray[3] = h
    return this
  }
  setXstart (x) {
    this._valArray[0] = x
    return this
  }
  setYstart (y) {
    this._valArray[1] = y
    return this
  }
  reset () {
    this._valArray = (this.el.getAttribute('viewBox') || '0 0 0 0').split(' ')
    return this
  }
  write () {
    this.el.setAttribute('viewBox', this._valArray.join(' '))
    return this
  }
}

/**
 *
 * @param {function} nodeGetter - a function that returns the node to apply annimations
 * @param selector
 * @param duration
 */
let build = (nodeGetter, duration) => (() => {
  let lowerCache = 0
  let widthCache = 0
  let heightCache = 0
  let $els = null
  let $anims = null
  let viewboxes = null
  let inferredLower = 0
  return (lower, width, height) => {
    if ($els === null) {
      // TODO remove implicit dependency
      Meteor.defer(() => {
        $els = $(nodeGetter())
        $anims = $els
        if ($els.length === 0) { console.warn(`Node fetching resulted with an empty array of $ elements.`) }
        viewboxes = $els.map(function () { return new ViewBox(this); }).get()
        return viewboxes.forEach(vb => vb.setXstart(lower).setWidth(width).setHeight(height).write())
      }
      )
    } else {
      if (height !== heightCache) { viewboxes.forEach(box => box.setHeight(height)); }
      if (width !== widthCache) {
        let _width_cache = widthCache
        let _lower_cache = lowerCache
        $anims = $anims.velocity('stop', true).velocity({ tween: [width, _width_cache] }, {
          duration: 200,
          easing: 'linear',
          progress: (els, complete, remaining, start, tweenWidth) => {
            inferredLower = Math.min(Math.max(_lower_cache + ((lower - _lower_cache) * complete), 0), duration - tweenWidth)
            widthCache = tweenWidth
            lowerCache = inferredLower
            return viewboxes.forEach(vb => vb.setWidth(tweenWidth).setXstart(inferredLower).write())
          }
        })
      } else {
        if (lower !== lowerCache) { viewboxes.forEach(box => box.setXstart(lower)); }
        viewboxes.forEach(vb => vb.write())
      }
    }
    lowerCache = lower
    widthCache = width
    return heightCache = height
  }
})()

export default build
