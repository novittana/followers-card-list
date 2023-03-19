export class LocalStorage {
    applicationName = "followers-card-list"

    setValue(key, value) {
        try {
            let target = null;
            if (typeof value === "string") {
                target = value;
            } else {
                target = JSON.stringify(value);
            }
            localStorage.setItem(this.applicationName + "_" + key, `${target}`);
        } catch (e) {
        }
    }

    getValue(key, defaultValue) {
        try {
            let storedValue = localStorage.getItem(this.applicationName + "_" + key);
            if (!storedValue) {
                if (defaultValue) {
                    return defaultValue;
                } else {
                    return null;
                }
            } else {
                return JSON.parse(storedValue);
            }
        } catch (e) {
            return defaultValue;
        }
    }
}