"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function takeScreenshot() {
    const page = this.getPageHandle();
    return page.screenshot({
        encoding: 'base64',
        fullPage: true,
        type: 'png'
    });
}
exports.default = takeScreenshot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFrZVNjcmVlbnNob3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvdGFrZVNjcmVlbnNob3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFTZSxLQUFLLFVBQVUsY0FBYztJQUN4QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDakMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ25CLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLEtBQUs7S0FDZCxDQUFDLENBQUE7QUFDTixDQUFDO0FBUEQsaUNBT0MifQ==