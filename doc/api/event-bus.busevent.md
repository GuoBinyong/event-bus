<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@gby/event-bus](./event-bus.md) &gt; [BusEvent](./event-bus.busevent.md)

## BusEvent type

事件类型

<b>Signature:</b>

```typescript
export declare type BusEvent<D> = D extends Event ? D : CustomEvent<D>;
```