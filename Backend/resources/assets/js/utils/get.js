export default function get(obj, path = undefined) {
  if (path === undefined) {
    return obj;
  }

  let chunks = path.split('.');

  if (obj) {
    let k = chunks.shift()
    return get(obj[k], chunks.length ? chunks.join('.') : undefined);
  }
}
