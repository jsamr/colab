import Task from '/imports/api/Task'
import lodash from 'lodash'
import { TaskType } from '/imports/api/TaskType'

function fallbackToTaskType (id) {
  return new TaskType({
    name: 'Unknown',
    color: 'black',
    _id: id
  })
}

function __guard__ (value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined
}

class TaskDisplayComputer {
  constructor (selection, exp, project) {
    this.nRows = this.nRows.bind(this)
    this.generateSegments = this.generateSegments.bind(this)
    this.selection = selection
    this.experiment = exp
    this.segs = []
    this.ranges = {}
    this.project = project
    this.generateSegments()
  }
  nRows () { return lodash(this.ranges).map('count').max() }
  generateSegments () {
    // 1. build @ranges
    lodash(this.selection)
      .flatMap('segments')
      .flatMap(seg => [ seg.start, seg.stop ])
      .sort(lodash.gt)
      .sortedUniq()
      .reduce((start, stop) => {
        this.ranges[`${start}`] = {start, stop, count: 0}
        return stop
      }
    )
    this.selection.forEach(task => {
      let taskType = this.project.getTaskType(task.taskTypeId) || fallbackToTaskType(task.taskTypeId)
      // console.info('FOUND', task, taskType, task.taskTypeId)
      let i = 0
      let selectedRanges = []
      this.segs.push.apply(this.segs, lodash(task.segments).sortBy('start').map(seg => {
        let select = seg.start
        let range = this.ranges[`${select}`]
        i = __guard__(range, x => x.count) || i
        // inc count while can
        while (range !== undefined) {
          range = this.ranges[`${select}`]
          if (lodash.get(range, 'stop') !== undefined && range.stop <= seg.stop) {
            if (range.count > i) { i = range.count; }
            selectedRanges.push(range)
            select = range.stop
          } else { range = undefined }
        }
        seg.taskType = taskType
        seg.group = () => task.isAbstract ? lodash.create(Task.prototype, task) : this.experiment.getTask(task._id)
        seg.tskTypeId = taskType._id
        seg.width = seg.stop - seg.start
        seg.index = () => i
        return seg
      }
      ).value()
      )
      let newCount = i + 1
      return lodash(selectedRanges).forEach(range => {
        range.count = newCount
      })
    })
    return this.segs
  }
}

export default TaskDisplayComputer
