/**
 * Allows to be notified when a variable changes its value.
 * Notification is performed using a handler(oldValue, newValue)
 * @example
 * ```ts
 * class MyAlgo {
 *   private friction_ = 0
 * 
 *   set friction(v: number) {
 *     if (v >= 0 && v <= 1.5) {
 *       this.friction_ = v
 *     }
 *   }
 *   get friction() { return this.friction_ }
 * }
 * 
 * const algo = new MyAlgo()
 * 
 * watcher.def(myAlgo, 'friction', (property, oldVal, newVal)=>{
 *     console.log(`Property ${property} changed from ${oldVal} to ${newVal}`)
 * })
 * 
 * // trigger
 * algo.friction = 0.1
 * 
 * watcher.undef(myAlgo, 'friction')
 * ```
 */
export namespace watcher {

    export function def(object: any, property: string, handler: Function) {
        if (!object.watch) {
            Object.defineProperty(object, 'watch', {
                enumerable: false,
                configurable: true,
                writable: false,
                value: function (prop: string, handler: Function) {
                    var oldval = this[prop]
                    var newval = oldval

                    if (delete this[prop]) { // can't watch constants
                        Object.defineProperty(this, prop, {
                            get: () => {
                                return newval
                            },
                            set: (val) => {
                                if (oldval !== val) {
                                    oldval = newval
                                    return newval = handler.call(this, prop, oldval, val)
                                }
                                return null
                            },
                            enumerable: true,
                            configurable: true
                        })
                    }
                }
            })
        }
        object.watch(property, handler)
    }

    export function undef(object: any, property: string) {
        if (!object.unwatch) {
            Object.defineProperty(object, 'unwatch', {
                enumerable: false,
                configurable: true,
                writable: false,
                value: (prop: string) => {
                    let val = this[prop]

                    delete this[prop]
                    this[prop] = val
                }
            });
        }
        object.unwatch(property)
    }

}
