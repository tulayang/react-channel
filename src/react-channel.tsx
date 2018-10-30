/*
  === React-Channel Module 消息模型 ===


    Com - Publisher +--------> Channel (filter) ---------> Subscriber - Com
                    |           
                    |                    
                    +--------> Channel (filter) ---------> Subscriber - Com                      
                                                         ^
                                                         |
    Com - Publisher ---------> Channel (filter) +--------+
                             ^                  |
                             |                  |
    Com - Publisher --------->                  +--------> Subscriber - Com

    
  - Publisher 和 Subscriber 之间是独立管理的。如果没有 Publisher 与 Subscriber 连接，
    Subscriber 仍然存在，只是不会有消息流动。如果没有 Subscriber 与 Publisher 连接，
    Publisher 仍然可以发送消息，只是不会有 Subscriber 接收

  - 消息总是从 Publisher 发出，通过 Channel (filter)，到达 Subscriber

  - 一个 Channel 可以连接多个 Publisher、Subscriber

  - 一个 Publisher 可以连接多个 Channel (filter) 

  - 一个 Subscriber 可以连接多个 Channel (filter) 

  - 一个 Component 最多只有一个 Publisher、Subscriber

  - Publisher 和 Subscriber 没有“解除”的同步绑定，即 Publisher 销毁的时候，Subscriber 不会
    自动销毁。如果你想在某个 Publisher 销毁的时候，同时销毁监听的 Subscriber，应该让 Publisher
    发送一个消息，比如 “destroy”，Subscriber 收到这条消息的时候，可以自己决定是否销毁

  - Channel (filter) 只负责流动消息，同时可以提供过滤器，只允许特殊条件的消息流动
*/

import { Component, ComponentState } from 'react'
import { Publisher, Subscriber, Channel } from 'm-channel'

export { Publisher, Subscriber, Channel }

export interface IActionComponentProps {
  channel: Channel
}

export abstract class ActionComponent<P extends IActionComponentProps, S extends ComponentState> extends Component<P, S> {
  protected publisher: Publisher = new Publisher()
  protected subscriber: Subscriber = new Subscriber()

  constructor(props: P) {
    super(props)
    this.publisher.attach(this.props.channel)
    this.subscriber.attach(this.props.channel)
  }

  componentWillReceiveProps(nextProps: Readonly<IActionComponentProps>) {
    if (nextProps.channel !== this.props.channel) {
      this.publisher.detachAll()
      this.subscriber.detachAll()
      this.publisher.attach(nextProps.channel)
      this.subscriber.attach(nextProps.channel)
    }
  }

  // 组件销毁的时候，取消关联 Publisher、Subscriber 和 Channel 的连接
  //
  // 注意：这个操作有助于防止内存泄漏（GC 双引用）
  componentWillUnmount() {
    this.publisher.detachAll()
    this.subscriber.detachAll()
  }
}

export abstract class ActionStore {
  protected publisher: Publisher = new Publisher()
  protected subscriber: Subscriber = new Subscriber()

  constructor(channel: Channel) {
    this.publisher.attach(channel)
    this.subscriber.attach(channel)
  }

  public close() {
    this.publisher.detachAll()
    this.subscriber.detachAll()
  }
}

