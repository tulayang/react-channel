import {Publisher, Subscriber, Channel, IAction} from './react-channel'

interface INumberAction extends IAction {
  action: 'number'
  n: number
}

interface IDestroyAction extends IAction {
  action: 'destroy'
}

var publisher1 = new Publisher()
var subscriber1 = new Subscriber()
var channel1 = new Channel()

var publisher2 = new Publisher()
var subscriber2 = new Subscriber()
var channel2 = new Channel()

subscriber1.sub((a: INumberAction) => {
  switch (a.action) {
  case 'number':
    console.assert(a.n === 1)

    publisher2.pub({
      action: 'destroy'
    })
    break  
  }
})

subscriber2.sub((a: IDestroyAction) => {
  switch (a.action) {
  case 'destroy':
    publisher1.detach(channel1)  // === channel1.detachPublisher()
    subscriber1.detach(channel1) // === channel1.detachSubcriber()
    break  
  }
})

publisher1.attach(channel1)
subscriber1.attach(channel1)

publisher2.attach(channel2)
subscriber2.attach(channel2)

publisher1.pub({
  action: 'number',
  n: 1
} as INumberAction)