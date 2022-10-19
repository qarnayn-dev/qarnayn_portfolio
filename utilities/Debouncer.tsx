/**
 * Execute the `callback` when the time (in ms) `executeIn` has completed.
 * Whenever there's a new `rebound()` call, the timeout will be refreshed.
 * ```
 * const debouncer = new Debouncer(()=>{console.log("execute this")}, 1000);
 * // whenever to be refreshed
 * debouncer.rebound();
 * // to cancle:
 * debouncer.cancel();
 * ```
 */
export class Debouncer {
    private timeout?: NodeJS.Timeout;
    constructor(private callback: ()=> void,private executeIn: number) {
        this.executeIn = executeIn;
        this.callback = callback;
    }

    rebound(): void {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(this.callback, this.executeIn);
    }

    cancel(): void{
        clearTimeout(this.timeout);
    }
}