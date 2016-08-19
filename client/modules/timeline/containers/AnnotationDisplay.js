import AnnotationDisplay from '../components/AnnotationDisplay'
import { useDeps } from 'mantra-core'

const mapContext = (context, actions) => {
  return {
    userSelectPlayerCursor: actions.video.userSelectPlayerCursorAbsolute
  }
}

export default useDeps(mapContext)(AnnotationDisplay)
