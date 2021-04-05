import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

// JSON "set" example
export async function setObject(key, object) {
  await Storage.set({
    key: key,
    value: JSON.stringify(object),
  });
}

// JSON "get" example
export async function getObject(key) {
  const ret = await Storage.get({ key: key });
  const object = JSON.parse(ret.value);
  return object;
}

export async function keys() {
  const { keys } = await Storage.keys();
  return keys;
}

export async function clear() {
  await Storage.clear();
}

export async function isEmpty(){
        let keysSet = await keys();
        return keysSet.length == 0;
}