import store from "@/store";

const defaultOnSuccessHandler = (event) => {
    store.commit('userSetIDB', event.target.result);
    console.log('IDB success', event);
};

const defaultOnErrorHandler = (event) => {
    console.log('IDB error', event);
};

const defaultOnUpgradeneededHandler = (event) => {
    const db = event.target.result;

    let objectStore;
    if (!db.objectStoreNames.contains('base')) {
        objectStore = db.createObjectStore('base', {keyPath: 'key'});
        objectStore.createIndex('key', 'key', {unique: true});
    }

    store.commit('userSetIDB', db);
};

const defaultOnAddHandler = (event) => {
    console.log('IDB add', event);
};

const initBaseIDB = (
    onSuccessHandler = defaultOnSuccessHandler,
    onErrorHandler = defaultOnErrorHandler,
    onUpgradeneededHandler = defaultOnUpgradeneededHandler,
) => {
    const request = indexedDB.open('base', 1);

    request.onsuccess = onSuccessHandler;
    request.onerror = onErrorHandler;
    request.onupgradeneeded = onUpgradeneededHandler;

};

export default {
    initBaseIDB,
}