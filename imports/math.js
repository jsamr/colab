function enforceInInterval (value, min, max) {
  return Math.max(min, Math.min(max, value))
}

export {
  enforceInInterval
}

