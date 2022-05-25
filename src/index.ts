export interface EventBusEventListenerOptions extends AddEventListenerOptions {
    /**
     * 监听的次数
     */
    times?: number | null;
  }
  
  export type RemoveListener = () => void;
  
  export class EventBus<Detail = any> extends EventTarget {
    /**
     * 添加事件监听器；会返回一个用于移除事件监听器的函数；
     * 当没有指定 times 选项时，也可以通过 EventTarget 的 removeEventListener 方法移除；
     * 当指定 times 选项时，只能通过 返回的函数移除监听器
     * @param type
     * @param callback
     * @param options
     * @returns ()=>void; 返回用于移除事件监听器的函数； 也可以通过 EventTarget 的 removeEventListener 方法移除
     */
    addEventListener(
      type: string,
      callback: EventListenerOrEventListenerObject | null,
      options?: EventBusEventListenerOptions | boolean,
    ): RemoveListener {
      const times = (options as any)?.times;
      if (times) {
        const listener =
          typeof callback === 'function' ? callback : callback?.handleEvent;
        if (listener) {
          return this.multipleListen(type, listener, times);
        }
      }
      super.addEventListener(type, callback, options);
      return () => {
        this.removeEventListener(type, callback, options);
      };
    }
  
    public dispatchEvent(name: string, detail?: Detail): boolean;
    public dispatchEvent(event: Event): boolean;
    public dispatchEvent(event: string | Event, detail?: Detail) {
      const cusEvent =
        event instanceof Event
          ? event
          : new CustomEvent(event, {
              detail,
              bubbles: false,
              cancelable: true,
              composed: false,
            });
      return super.dispatchEvent(cusEvent);
    }
  
    /**
     * 添加一次性的事件监听器；会返回一个用于移除一次性事件监听器的函数； 也可以通过 EventTarget 的 removeEventListener 方法移除
     * @param type
     * @param callback
     * @param options
     * @returns removeEventListener():void; 返回用于移除一次性事件监听器的函数； 也可以通过 EventTarget 的 removeEventListener 方法移除
     */
    onceListen(
      type: string,
      callback: EventListener,
      options?: AddEventListenerOptions,
    ): RemoveListener {
      return this.addEventListener(type, callback, { ...options, once: true });
    }
  
    /**
     * 添加监听指定次数的事件监听器；当事件触发指定次数后，会自动移除监听器；会返回一个用于移除事件监听器的函数； 不能通过 EventTarget 的 removeEventListener 方法移除
     * @param type
     * @param callback
     * @param times  需要监听的次数，如果小于 1 ，永远不会自动移除事件监听器，需要手动移除
     * @returns removeEventListener():void; 返回用于移除事件监听器的函数； 不能通过 EventTarget 的 removeEventListener 方法移除
     */
    multipleListen(
      type: string,
      callback: EventListener,
      times: number,
    ): RemoveListener {
      let count = 0;
      const listener = (event: Event) => {
        if (++count >= times) {
          this.removeEventListener(type, listener);
        }
        callback.call(this, event);
      };
  
      super.addEventListener(type, listener);
  
      return () => {
        this.removeEventListener(type, listener);
      };
    }
  }
  