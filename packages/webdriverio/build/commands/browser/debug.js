"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serialize_error_1 = require("serialize-error");
const repl_1 = __importDefault(require("@wdio/repl"));
function debug(commandTimeout = 5000) {
    const repl = new repl_1.default();
    const { introMessage } = repl_1.default;
    if (!process.env.WDIO_WORKER || typeof process.send !== 'function') {
        console.log(repl_1.default.introMessage);
        const context = {
            browser: this,
            driver: this,
            $: this.$.bind(this),
            $$: this.$$.bind(this)
        };
        return repl.start(context);
    }
    process._debugProcess(process.pid);
    process.send({
        origin: 'debugger',
        name: 'start',
        params: { commandTimeout, introMessage }
    });
    let commandResolve = () => { };
    process.on('message', (m) => {
        if (m.origin !== 'debugger') {
            return;
        }
        if (m.name === 'stop') {
            process._debugEnd(process.pid);
            return commandResolve();
        }
        if (m.name === 'eval') {
            repl.eval(m.content.cmd, global, undefined, (err, result) => {
                if (typeof process.send !== 'function') {
                    return;
                }
                if (err) {
                    process.send({
                        origin: 'debugger',
                        name: 'result',
                        params: {
                            error: true,
                            ...serialize_error_1.serializeError(err)
                        }
                    });
                }
                if (typeof result === 'function') {
                    result = `[Function: ${result.name}]`;
                }
                process.send({
                    origin: 'debugger',
                    name: 'result',
                    params: { result }
                });
            });
        }
    });
    return new Promise((resolve) => (commandResolve = resolve));
}
exports.default = debug;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvYnJvd3Nlci9kZWJ1Zy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFEQUFnRDtBQUNoRCxzREFBaUM7QUFnQ2pDLFNBQXdCLEtBQUssQ0FFekIsY0FBYyxHQUFHLElBQUk7SUFFckIsTUFBTSxJQUFJLEdBQUcsSUFBSSxjQUFRLEVBQUUsQ0FBQTtJQUMzQixNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsY0FBUSxDQUFBO0lBS2pDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxPQUFPLE9BQU8sQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO1FBRWhFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBUSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ2xDLE1BQU0sT0FBTyxHQUFHO1lBQ1osT0FBTyxFQUFFLElBQUk7WUFDYixNQUFNLEVBQUUsSUFBSTtZQUNaLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEIsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN6QixDQUFBO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQzdCO0lBS0QsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7SUFLbEMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNULE1BQU0sRUFBRSxVQUFVO1FBQ2xCLElBQUksRUFBRSxPQUFPO1FBQ2IsTUFBTSxFQUFFLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRTtLQUMzQyxDQUFDLENBQUE7SUFFRixJQUFJLGNBQWMsR0FBOEIsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3pELE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDeEIsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRTtZQUN6QixPQUFNO1NBQ1Q7UUFFRCxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzlCLE9BQU8sY0FBYyxFQUFFLENBQUE7U0FDMUI7UUFHRCxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDLEdBQWlCLEVBQUUsTUFBVyxFQUFFLEVBQUU7Z0JBQzNFLElBQUksT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtvQkFDcEMsT0FBTTtpQkFDVDtnQkFFRCxJQUFJLEdBQUcsRUFBRTtvQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDO3dCQUNULE1BQU0sRUFBRSxVQUFVO3dCQUNsQixJQUFJLEVBQUUsUUFBUTt3QkFDZCxNQUFNLEVBQUU7NEJBQ0osS0FBSyxFQUFFLElBQUk7NEJBQ1gsR0FBRyxnQ0FBYyxDQUFDLEdBQUcsQ0FBQzt5QkFDekI7cUJBQ0osQ0FBQyxDQUFBO2lCQUNMO2dCQUtELElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxFQUFFO29CQUM5QixNQUFNLEdBQUcsY0FBYyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUE7aUJBQ3hDO2dCQUVELE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ1QsTUFBTSxFQUFFLFVBQVU7b0JBQ2xCLElBQUksRUFBRSxRQUFRO29CQUNkLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRTtpQkFDckIsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDLENBQUE7U0FDTDtJQUNMLENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQTtBQUNyRSxDQUFDO0FBbEZELHdCQWtGQyJ9