import { Injectable } from "@angular/core";
import { Utils } from "./Utils";
import { ApiService } from "./api-service";

declare var Yunba;

export class ChatMessage {
    msgId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    toUserId: string;
    time: number | string;
    message: string;
    status: string;
}

export class UserInfo {
    id: string;
    name?: string;
    avatar?: string;
    sex: number;
}

@Injectable()
export class Messages {
    private yunba:any;

    constructor(private api: ApiService) {

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
        this.yunba.subscribe({topic: roomId}, (success, msg) => {
            if (success) {
                console.log(`你已成功订阅频道：${roomId}`);
            } else {
                console.log(msg);
            }
        });
        this.yunba.set_message_cb((data) => {
            let msg = JSON.parse(data.msg);
            msg.status = 'success';
            let payload = {
                topic: data.topic,
                msg: msg
            };
            if (callback) {
                callback(payload);
            }
        });
    }

    unsubscribe(roomId, callback) {
        this.yunba.unsubscribe({topic: roomId}, callback);
    }

    sendMsg(roomId, msg, callback) {

        this.yunba.publish({ topic: roomId, msg: JSON.stringify(msg) }, callback);
    }

    GetUsers() {
        return this.friends;
    }

    GetUserById(id) {
        return this.friends.find(e => e.id === id);
    }

    friends: UserInfo[] = [
        {
            id: '227678',
            name: 'Darli&Uncle',
            avatar: 'assets/imgs/user.jpg',
            sex: 0,
        },
        {
            id: '527378',
            name: 'tomwey',
            avatar: 'assets/imgs/to-user.jpg',
            sex: 1,
        },
    ];

    // 获取聊天列表
    GetChatRooms() {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { type: 'getChatRooms', fromid: uid });
    }

    // 获取聊天信息, 0 表示是群，1 表示个人
    GetChatMessages(roomid, toid, totype) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { 
            type: 'getChatMessage', 
            roomid: roomid, 
            toid: toid, 
            totype: totype,
            fromid: uid });
    }

}