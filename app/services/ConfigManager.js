import {
    AsyncStorage
} from "react-native";

const configLocalKey = 'configManger';

const device = {
    getConfig: async () => {
        const config = await AsyncStorage.getItem(configLocalKey);
        return await JSON.parse(config) || {};
    },

    setConfig: async (config) => {
        await AsyncStorage.setItem(configLocalKey, JSON.stringify(config));
    }
};

const self = {

    localManager: device.getConfig(),
    version: 0,
    updateConfig: async (updateCB) => {
        self.localManager = device.getConfig();
        updateCB();
        await device.setConfig(self.localManager);
        self.localManager = device.getConfig();
        self.version += 1;
    },
    markAsRead: async (doc) => {
        await self.updateConfig(() => {
            self.localManager.markedAsRead = self.localManager.markedAsRead || {};
            self.localManager.markedAsRead[doc.id] = true;
        });
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
    markInBookmark: async (doc) => {
        await self.updateConfig(() => {
            self.localManager.markInBookmark = self.localManager.markInBookmark || {};
            self.localManager.markInBookmark[doc.id] = true;
        });
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
    getSettings: () => self.localManager.settings || {}
};

export default self;