
export function permute(list) {
    return list.length ?
        list.reduce(permutate, []) :
        [[]];
}

function permutate(permutations, item, index, list) {
    return permutations.concat(permute(
        list.slice(0, index).concat(
            list.slice(index + 1)))
        .map(concat, [item]));
}

function concat(list) {
    return this.concat(list);
}

