
class Changes {
    #changes = [];
    #pendingRun = [];

    add(items, func) {
        this.#changes.push({
            items,
            func
        });
    }
    
    fire(item) {
        const changes = this.#changes.filter((c) => c.items.includes(item));
        for (const change of changes) {
            if (change && !this.#pendingRun.includes(change.func)) {
                this.#pendingRun.push(change.func);
                setTimeout(()=> {
                    this.#pendingRun.splice(this.#pendingRun.indexOf(change.func), 1);
                    change.func()
                }, 0);
            }
        }
    }
    
}

export default Changes;