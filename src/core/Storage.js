let hasStorage = () => {
    try {
        localStorage.setItem('t', '1');
        localStorage.removeItem('t');
        return true;
    } catch (exception) {
        return false;
    }
};

let Storage = {
    hasStorage: hasStorage(),
    setItem: (key, val) => {
        if (Storage.hasStorage) {
            localStorage.setItem(key, val);
        }
    },
    getItem: (key) => {
        if (Storage.hasStorage) {
            return localStorage.getItem(key);
        }
        return false;
    },
    removeItem: (key) => {
        if (Storage.hasStorage) {
            localStorage.removeItem(key);
        }
    },
};

export default Storage;
