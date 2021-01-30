"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shadowFnFactory = void 0;
exports.shadowFnFactory = function (elementSelector, qsAll = false) {
    const strFn = `
    (function() {
      // element has a shadowRoot property
      if (this.shadowRoot) {
        return this.shadowRoot.querySelector${qsAll ? 'All' : ''}('${elementSelector}')
      }
      // fall back to querying the element directly if not
      return this.querySelector${qsAll ? 'All' : ''}('${elementSelector}')
    })`;
    return eval(strFn);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhZG93Rm5GYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjcmlwdHMvc2hhZG93Rm5GYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNhLFFBQUEsZUFBZSxHQUFHLFVBQVMsZUFBdUIsRUFBRSxLQUFLLEdBQUcsS0FBSztJQUMxRSxNQUFNLEtBQUssR0FBRzs7Ozs4Q0FJNEIsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxlQUFlOzs7aUNBR25ELEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssZUFBZTtPQUNoRSxDQUFBO0lBQ0gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDdEIsQ0FBQyxDQUFBIn0=