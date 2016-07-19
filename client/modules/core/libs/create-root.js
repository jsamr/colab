export default function createRoot () {
  const approot = document.createElement('div')
  approot.id = 'approot'
  document.body.appendChild(approot)
  return approot
}