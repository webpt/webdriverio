"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
function keys(value) {
    let keySequence = [];
    if (typeof value === 'string') {
        keySequence = utils_1.checkUnicode(value, this.isDevTools);
    }
    else if (Array.isArray(value)) {
        const charArray = value;
        for (const charSet of charArray) {
            keySequence = keySequence.concat(utils_1.checkUnicode(charSet, this.isDevTools));
        }
    }
    else {
        throw new Error('"keys" command requires a string or array of strings as parameter');
    }
    if (!this.isW3C) {
        return this.sendKeys(keySequence);
    }
    const keyDownActions = keySequence.map((value) => ({ type: 'keyDown', value }));
    const keyUpActions = keySequence.map((value) => ({ type: 'keyUp', value }));
    return this.performActions([{
            type: 'key',
            id: 'keyboard',
            actions: [...keyDownActions, ...keyUpActions]
        }]).then(() => this.releaseActions());
}
exports.default = keys;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9icm93c2VyL2tleXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBMEM7QUE2QjFDLFNBQXdCLElBQUksQ0FFeEIsS0FBd0I7SUFFeEIsSUFBSSxXQUFXLEdBQWEsRUFBRSxDQUFBO0lBSzlCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzNCLFdBQVcsR0FBRyxvQkFBWSxDQUFDLEtBQXdDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0tBQ3hGO1NBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzdCLE1BQU0sU0FBUyxHQUF3QyxLQUFZLENBQUE7UUFDbkUsS0FBSyxNQUFNLE9BQU8sSUFBSSxTQUFTLEVBQUU7WUFDN0IsV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsb0JBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7U0FDM0U7S0FDSjtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQyxDQUFBO0tBQ3ZGO0lBS0QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7S0FDcEM7SUFLRCxNQUFNLGNBQWMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDL0UsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBRTNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksRUFBRSxLQUFLO1lBQ1gsRUFBRSxFQUFFLFVBQVU7WUFDZCxPQUFPLEVBQUUsQ0FBQyxHQUFHLGNBQWMsRUFBRSxHQUFHLFlBQVksQ0FBQztTQUNoRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUE7QUFDekMsQ0FBQztBQXRDRCx1QkFzQ0MifQ==