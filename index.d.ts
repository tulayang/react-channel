
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
    protected publisher: Publisher<PA> 
    protected subscriber: Subscriber<SA>
    constructor(props: P) 
    public componentWillUnmount(): void
  }
} 

export = ReactChannel
