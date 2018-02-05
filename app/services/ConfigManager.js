// TODO: This is garbage, needs to be converted to promises
import {
    AsyncStorage
} from "react-native";

const configLocalKey = 'configManger';

const device = {
    getConfig: () => {
        const rtx = AsyncStorage.getItem(configLocalKey)
            .then((response) => {
                return JSON.parse(response) || {};
            })
            .catch((error) => {
                return {};
            });
        return rtx.then((result) => {
            return result;
        });
    },

    setConfig: (config) => {
        return AsyncStorage.setItem(configLocalKey, JSON.stringify(config));
    }
};

const self = {

    /*localManager: {},
    version: 0,
    updateConfig: async (updateCB) => {
        self.localManager = await device.getConfig();
        updateCB();
        await device.setConfig(self.localManager);
        self.localManager = await device.getConfig();
        self.version += 1;
    },
    clearAllRead: async () => {
        await self.updateConfig(() => {
            self.localManager.markedAsRead = {};
        });
    },
    isMarkedAsRead: (doc) => {
        if (self.localManager.markedAsRead) {
            return self.localManager.markedAsRead[doc.id];
        }
        return false;
    },
    clearAllBookmarks: async () => {
        await updateConfig(() => {
            self.localManager.markInBookmark = {};
        });
    },
    isBookmarked: (doc) => {
        if (self.localManager.markInBookmark) {
            return self.localManager.markInBookmark[doc.id];
        }
        return false;
    },
    getRead: () => self.localManager.markedAsRead || {},
    getAllBookmarks: () => self.localManager.markInBookmark || {},
    setSettings: async (settings) => await self.updateConfig(() => self.localManager.settings = settings),
    getSettings: () => self.localManager.settings || {},*/

    //TODO: supported functions
    device: device,
    init: device.getConfig,
    markAsRead: (doc) => {
        return device.getConfig().then((result) => {
            const config = result || {};
            config.markedAsRead = config.markedAsRead || {};
            config.markedAsRead[doc.id] = true;
            return device.setConfig(config).then((result) => {
               return config;
            });
        });
    },
    markInBookmark: async (doc) => {
        return device.getConfig().then((result) => {
            const config = result || {};

            config.markInBookmark = config.markInBookmark || {};
            config.markInBookmark[doc.id] = true;

            return device.setConfig(config).then((result) => {
                return config;
            });
        });
    }
};

export default self;