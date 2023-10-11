"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bag = void 0;
const item_1 = require("../item/item");
// @ts-ignore
class Bag {
    constructor(maxWeight) {
        this.items = [];
        this.maxWeight = maxWeight;
    }
    checkTask(items) {
        return item_1.Item.countAllWeigth(items) >= this.maxWeight ? true : false;
    }
    printBag() {
        console.log(this.items);
    }
    ;
    putInBag(item) {
        this.items.push(item);
        return item;
    }
    ;
    getMaxWeight() {
        return this.maxWeight;
    }
    getCurrentWeight() {
        let sumWeight = 0;
        this.items.forEach((item, index) => {
            sumWeight += item.getWeight();
        });
        return sumWeight;
    }
    getCurrentPrice() {
        let sumPrice = 0;
        this.items.forEach((item, index) => {
            sumPrice += item.getUtility();
        });
        return sumPrice;
    }
}
exports.Bag = Bag;
