export function isEmpty(item: any) {
  if (!!item) {
    switch (typeof item) {
      case "string":
        if (item !== "" && item !== "null" && item !== "undefined") {
          return false;
        }
        return true;
      case "number":
        return false;
      case "object":
        if (JSON.stringify(item) === "{}" || JSON.stringify(item) === "[]") {
          return true;
        }
        return false;
    }
    return true;
  }
  return true;
}
