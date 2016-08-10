import SizeMe from 'react-sizeme'

const REFRESH_RATE = 150

const WidthHeightSizer = SizeMe({
  monitorWidth: true,
  monitorHeight: true,
  refreshRate: REFRESH_RATE
})

const HeightSizer = SizeMe({
  monitorWidth: false,
  monitorHeight: true,
  refreshRate: REFRESH_RATE
})

export default WidthHeightSizer

export {
  WidthHeightSizer,
  HeightSizer
}

