export function addEvent (obj, name, fn) {
  const old = obj[name]
  if (old) {
    obj[name] = () => {
      old()
      fn()
    }
  } else {
    obj[name] = fn
  }
}
