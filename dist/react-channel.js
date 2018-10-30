"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var m_channel_1 = require("m-channel");
exports.Publisher = m_channel_1.Publisher;
exports.Subscriber = m_channel_1.Subscriber;
exports.Channel = m_channel_1.Channel;
var ActionComponent = (function (_super) {
    __extends(ActionComponent, _super);
    function ActionComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.publisher = new m_channel_1.Publisher();
        _this.subscriber = new m_channel_1.Subscriber();
        _this.state = Object.create(null);
        if (_this.props.channel instanceof m_channel_1.Channel) {
            _this.publisher.attach(_this.props.channel);
            _this.subscriber.attach(_this.props.channel);
        }
        return _this;
    }
    ActionComponent.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.channel !== this.props.channel) {
            if (this.props.channel instanceof m_channel_1.Channel) {
                this.publisher.detachAll();
                this.subscriber.detachAll();
            }
            if (nextProps.channel instanceof m_channel_1.Channel) {
                this.publisher.attach(nextProps.channel);
                this.subscriber.attach(nextProps.channel);
            }
        }
    };
    ActionComponent.prototype.componentWillUnmount = function () {
        this.publisher.detachAll();
        this.subscriber.detachAll();
    };
    return ActionComponent;
}(react_1.Component));
exports.ActionComponent = ActionComponent;
var ActionStore = (function () {
    function ActionStore(channel) {
        this.publisher = new m_channel_1.Publisher();
        this.subscriber = new m_channel_1.Subscriber();
        this.publisher.attach(channel);
        this.subscriber.attach(channel);
    }
    ActionStore.prototype.close = function () {
        this.publisher.detachAll();
        this.subscriber.detachAll();
    };
    return ActionStore;
}());
exports.ActionStore = ActionStore;
