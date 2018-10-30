
import { Component, ComponentState } from 'react'

declare namespace ReactChannel {
  export class Publisher {
    public add(c: Channel): void
    public del(c: Channel): void
    public replace(c1: Channel, c2: Channel): void
    public has(c: Channel): boolean
    public items(): Iterable<Channel>
    public pub<A, B>(topic: string, payload?: A, confirm?: (payload?: B) => void): void
    public attach(c: Channel): void
    public detach(c: Channel): void
    public detachAll(): void
  }

  export class Channel {
    constructor(...actionFilter: Array<string>)
    public attachPublisher(p: Publisher) : void
    public detachPublisher(p: Publisher): void
    public detachAllPublisher(): void
    public attachSubscriber(s: Subscriber): void
    public detachSubscriber(s: Subscriber): boolean
    public detachAllSubscriber(): void
    public pub<A, B>(topic: string, payload?: A, confirm?: (payload?: B) => void): void
  }

  export class Subscriber {
    public add(c: Channel): void
    public del(c: Channel): void
    public replace(c1: Channel, c2: Channel): void
    public has(c: Channel): boolean
    public items(): Iterable<Channel>
    public notify<A, B>(topic: string, payload?: A, confirm?: (payload?: B) => void): void
    public sub<A, B>(topic: string, cb: (payload?: A, confirm?: (payload?: B) => void) => void): void
    public unsub(topic: string): void
    public unsubAll(): void
    public attach(c: Channel): void
    public detach(c: Channel): void
    public detachAll(): void
  }

  export interface IActionComponentProps {
    channel?: Channel
  }

  export abstract class ActionComponent<P extends IActionComponentProps, S extends ComponentState = any> extends Component<P, S>  {
    protected publisher: Publisher
    protected subscriber: Subscriber
    constructor(props: P) 
    public componentWillReceiveProps(nextProps: Readonly<IActionComponentProps>): void
    public componentWillUnmount(): void
  }

  export abstract class ActionStore {
    protected publisher: Publisher
    protected subscriber: Subscriber

    constructor(channel: Channel)
    public close(): void
  }
} 

export = ReactChannel
