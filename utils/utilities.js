export function getDate(date) {
  const d = new Date(date).toLocaleDateString("en-US");
  return d;
}

export function getBool(bool) {
  return Boolean(bool) == true ? "Yes" : "No";
}

export function getPath(item) {
  let finalString = "/" + item.toLowerCase().replaceAll(" ", "-");
  return finalString;
}

export function handleChange(componentName, setComponent, componentList) {
  for (let i = 0; i < componentList.length; i++) {
    if (componentList[i].name == componentName) {
      return setComponent(componentList[i].component);
    }
  }
}
