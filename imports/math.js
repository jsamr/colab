function enforceInInterval (value, min, max) {
  console.info(value, min, max, Math.max(min, Math.min(max, value)))
  return Math.max(min, Math.min(max, value))
}

export {
  enforceInInterval
}

