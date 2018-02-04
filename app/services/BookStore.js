import hash from "object-hash";

import data from "./dummy-data";

import nth from "lodash/nth";

//TODO: make sure calcUids also sort the chapters and verse acc. indexes, save a lot time in lookups
const calcUids = (book) => {
    return book.map((chapter) => {
        chapter.verses = chapter.verses.map((verse) => {
            verse.id = hash(verse);
            return verse;
        });
        chapter.id = hash(chapter);
        return chapter;
    });
};

const cachedBook = calcUids(data);

export default {

    getBook: () => cachedBook,
    getChapter: (book, index) => {
        return nth(book, index);
    },
    getVerse: (chapter, index) => {
        return nth(chapter.verses, index);
    }
}