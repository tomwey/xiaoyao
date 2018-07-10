import { Injectable } from "@angular/core";

declare var Yunba;

@Injectable()
export class Messages {
    private yunba:any;

    constructor() {

    }
    init(customid) {
        this.yunba = new Yunba({
            appkey: '5b443de9284e06c709cdf0d9',
            server: 'sock.yunba.io',
            port: '3000'
        });
        this.yunba.init((success) => {
            if (success) {
                console.log(success);
                this.yunba.connect_by_customid(customid, (succ,msg, sessionId) => {
                    console.log(succ);
                    console.log(sessionId);
                });
            }
        });
    }

    subscribe(roomId, callback) {
        this.yunba.subscribe({'topic': roomId}, (success, msg) => {
            if (success) {
                console.log(`你已成功订阅频道：${roomId}`);
            } else {
                console.log(msg);
            }
        });
        this.yunba.set_message_cb(callback);
    }

    unsubscribe(roomId, callback) {
        this.yunba.unsubscribe({'topic': roomId}, callback);
    }

    publish(roomId, msg, toUser, callback) {
        this.yunba.publish({ 'topic': roomId, 'msg': msg }, callback);
    }

}