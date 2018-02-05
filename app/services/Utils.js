/**
 * Created by raja on 05/02/18.
 */
const annotedToken = /@([\S]*)/g;
const nestedToken = /@\(([^)]*)\)/g;

const isAnnoted = function(word) {
    return annotedToken.test(word);
};

const getKey = function(word, dictionary) {
    return word.replace(annotedToken, function(m, g) {
        if (nestedToken.test(m)) {
            const k = m.replace(nestedToken, function(w, l) {
                return `(${dictionary[l]})`;
            });
            return k;
        } else {
            return `${g} (${dictionary[g]})`;
        }
    })
};

const buildFromAnnotated = function(text, dictionary) {
    const spaceSplit = text.split(" ");
    const tokens = spaceSplit.map(function(token) {
        if (isAnnoted(token)) {
            return getKey(token, dictionary);
        }
        return token;
    });
    return tokens.join(" ");
};

export default {
  buildFromAnnotated: buildFromAnnotated
};