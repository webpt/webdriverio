"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
function scrollIntoView(scrollIntoViewOptions = true) {
    return this.parent.execute(function (elem, options) {
        elem.scrollIntoView(options);
    }, {
        [constants_1.ELEMENT_KEY]: this.elementId,
        ELEMENT: this.elementId
    }, scrollIntoViewOptions);
}
exports.default = scrollIntoView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsSW50b1ZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZWxlbWVudC9zY3JvbGxJbnRvVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUE2QztBQXFCN0MsU0FBd0IsY0FBYyxDQUVsQyxxQkFBcUIsR0FBRyxJQUFJO0lBRTVCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQTJCLFVBQVUsSUFBaUIsRUFBRSxPQUFnQjtRQUM5RixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2hDLENBQUMsRUFBRTtRQUNDLENBQUMsdUJBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTO1FBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUztLQUNKLEVBQUUscUJBQXFCLENBQUMsQ0FBQTtBQUNuRCxDQUFDO0FBVkQsaUNBVUMifQ==