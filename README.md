ReactChannel
=================

Message flow channel.


```md
            MChannel Module -- Message-Flow Model


    Com - Publisher +--------> Channel (filter) ---------> Subscriber - Com
                    |           
                    |                    
                    +--------> Channel (filter) ---------> Subscriber - Com                      
                                                         ^
                                                         |
    Com - Publisher +--------> Channel (filter) ---------+
```
    
- Publisher 和 Subscriber 之间是独立管理的。如果没有 Publisher 与 Subscriber 连接，
  Subscriber 仍然存在，只是不会有消息流动。如果没有 Subscriber 与 Publisher 连接，
  Publisher 仍然可以发送消息，只是不会有 Subscriber 接收

- 消息总是从 Publisher 发出，通过 Channel (filter)，到达 Subscriber

- 一个 Channel 只与一个 Publisher、Subscriber 连接

- 一个 Publisher 可以连接多个 Channel (filter) 

- 一个 Subscriber 可以连接多个 Channel (filter) 

- 一个 Component 最多只有一个 Publisher、Subscriber

- Publisher 和 Subscriber 没有“解除”的同步绑定，即 Publisher 销毁的时候，Subscriber 不会
  自动销毁。如果你想在某个 Publisher 销毁的时候，同时销毁监听的 Subscriber，应该让 Publisher
  发送一个消息，比如 “destroy”，Subscriber 收到这条消息的时候，可以自己决定是否销毁

- Channel (filter) 只负责流动消息，同时可以提供过滤器，只允许特殊条件的消息流动

API
----------------

```ts
import { Component } from 'react'

declare namespace ReactChannel {
  export interface IAction {
    action: string
  }

  export class Publisher<A extends IAction = IAction> {
    public add(c: Channel): void
    public del(c: Channel): void
    public replace(c1: Channel, c2: Channel): void
    public has(c: Channel): boolean
    public items(): Iterable<Channel>
    public pub(a: A): void
    public attach(c: Channel): void
    public detach(c?: Channel): void
  }

  export class Channel<A extends IAction = IAction> {
    constructor(...actionFilter: Array<string>)
    public attachPublisher(p: Publisher) : void
    public detachPublisher(): void
    public attachSubscriber(s: Subscriber): void
    public detachSubscriber(): boolean
    public pub(a: A): void
  }

  export class Subscriber<A extends IAction = IAction> {
    public add(c: Channel): void
    public del(c: Channel): void
    public replace(c1: Channel, c2: Channel): void
    public has(c: Channel): boolean
    public items(): Iterable<Channel>
    public notify(a: A): void
    public sub(cb: (a: A) => void): void
    public attach(c: Channel): void
    public detach(c?: Channel): void
  }

  export interface IActionComponentProps {
    pub?: (p: Publisher) => void
    sub?: (s: Subscriber) => void
  }

  export abstract class ActionComponent<
    P extends IActionComponentProps, 
    PA extends IAction = IAction,
    SA extends IAction = IAction
  > extends Component<P> {
    constructor(props: P) 
    public componentWillUnmount(): void
  }
} 

export = ReactChannel
```