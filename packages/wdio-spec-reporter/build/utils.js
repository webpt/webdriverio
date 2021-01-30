"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedRows = exports.printTable = exports.buildTableData = void 0;
const easy_table_1 = __importDefault(require("easy-table"));
const SEPARATOR = '│';
exports.buildTableData = (rows) => rows.map((row) => {
    const tableRow = {};
    [...row.cells, ''].forEach((cell, idx) => {
        tableRow[idx] = (idx === 0 ? `${SEPARATOR} ` : '') + cell;
    });
    return tableRow;
});
exports.printTable = (data) => easy_table_1.default.print(data, undefined, (table) => {
    table.separator = ` ${SEPARATOR} `;
    return table.print();
});
exports.getFormattedRows = (table, testIndent) => table.split('\n').filter(Boolean).map((line) => `${testIndent}  ${line}`.trimRight());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNERBQThCO0FBRTlCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQTtBQU9SLFFBQUEsY0FBYyxHQUFHLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7SUFDL0QsTUFBTSxRQUFRLEdBQTJCLEVBQUUsQ0FBQztJQUM1QyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDckMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFBO0lBQzdELENBQUMsQ0FBQyxDQUFBO0lBQ0YsT0FBTyxRQUFRLENBQUE7QUFDbkIsQ0FBQyxDQUFDLENBQUE7QUFPVyxRQUFBLFVBQVUsR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsb0JBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQzVFLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLEdBQUcsQ0FBQTtJQUNsQyxPQUFPLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQTtBQUN4QixDQUFDLENBQUMsQ0FBQTtBQU9XLFFBQUEsZ0JBQWdCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsVUFBa0IsRUFBRSxFQUFFLENBQ2xFLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxVQUFVLEtBQUssSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQSJ9