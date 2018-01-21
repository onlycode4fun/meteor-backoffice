
Meteor.startup(() => {
    // code to run on server at startup
    SimpleSchema.extendOptions({
        srf: Match.Optional(Object)
    })
});

function dive(currentKey, into, target) {
    for (var i in into) {
        if (into.hasOwnProperty(i)) {
            var newKey = i;
            var newVal = into[i];

            if (currentKey.length > 0) {
                newKey = currentKey + '.' + i;
            }
1
            if (typeof newVal === "object" && Object.prototype.toString.call(newVal) != '[object Date]') {
                dive(newKey, newVal, target);
            } else {
                target[newKey] = newVal;
            }
        }
    }
}

function flatten(arr) {
    var newObj = {};
    dive("", arr, newObj);
    return newObj;
}

function convert(obj) {
    var res = {}, i, j, splits, ref, key;
    for (i in obj) {
        if (obj.hasOwnProperty(i)) {
            splits = i.split('.');
            ref = res;
            for (j = 0; j < splits.length; j++) {
                key = splits[j];
                if (j == splits.length - 1) {
                    ref[key] = obj[i];
                } else {
                    ref = ref[key] = ref[key] || {};
                }
            }
        };
    }
    return res;
}

String.prototype.toCamelCase = function() {
    return this
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
};




export function getFlattenedObject(obj){
    return flatten(obj);
}

export function getNestedObject(obj){
    return convert(obj);
}