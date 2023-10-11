"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const consts_1 = require("../consts");
// @ts-ignore
class Item {
    constructor(number, weigth, utility) {
        this.weigth = weigth;
        this.utility = utility;
        this.number = number;
        this.isPlased = '0';
    }
    setPlased(value) {
        this.isPlased = '1' || value;
    }
    getWeight() {
        return this.weigth;
    }
    getUtility() {
        return this.utility;
    }
    getNumber() {
        return this.number;
    }
    static getMaxItem(items) {
        let max = -Infinity;
        let maxItem = items[0];
        let position = 0;
        items.forEach((item, index) => {
            if (max < item.utility / item.weigth && item.isPlased == '0') {
                max = item.utility / item.weigth;
                position = index;
                maxItem = item;
            }
        });
        items[position].setPlased();
        return maxItem;
    }
    static countAllWeigth(items) {
        let sum = 0;
        items.forEach((item) => {
            sum += item.getWeight();
        });
        return sum;
    }
    static generateItemMatrix(numOfItems) {
        const items = [];
        for (let i = 0; i < numOfItems; i++) {
            const weigth = Math.floor(Math.random() * consts_1.MAX_ITEM_WEIGTH) + 1;
            const utility = Math.floor(Math.random() * consts_1.MAX_ITEM_UTILITY);
            items.push(new Item(i, weigth, utility));
        }
        return items;
    }
}
exports.Item = Item;
