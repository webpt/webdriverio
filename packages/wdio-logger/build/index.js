"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mode = require('./web').default;
if (typeof process !== 'undefined' && typeof process.release !== 'undefined' && process.release.name === 'node') {
    const nodeMode = './node';
    mode = require(nodeMode).default;
}
exports.default = mode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFPQSxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFBO0FBS25DLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxJQUFJLE9BQU8sT0FBTyxDQUFDLE9BQU8sS0FBSyxXQUFXLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO0lBQzdHLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQTtJQUN6QixJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtDQUNuQztBQU1ELGtCQUFlLElBQUksQ0FBQSJ9