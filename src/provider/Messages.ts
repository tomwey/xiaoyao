import { Injectable } from "@angular/core";
import { Utils } from "./Utils";
import { ApiService } from "./api-service";

declare var Yunba;

export class ChatMessage {
    // msgId: string;
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
    friendid?: string;
    name?: string;
    avatar?: string;
    gender: number;
}

// 消息提交包
export class MessagePayload {
    roomid: string;
    userId: string;
    toUserId: string;
    toUserType?: string;
    contenttype: string; //  1 表示文本消息 2 表示图片消息 3 表示语音消息 4 表示名片
    message?: string;
    len?: string; // 如果为语音消息时，此值需要传音频的文件长度
    msgtype:string; // 1 表示聊天类消息，其它表示非聊天类消息
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
                // console.log(success);
                this.yunba.connect_by_customid(customid, (succ,msg, sessionId) => {
                    // console.log(succ);
                    // console.log(sessionId);

                    this.yunba.subscribe({topic: 'chatlist'}, (success, msg) => {
                        if (success) {
                            console.log(`你已成功订阅频道`);
                        } else {
                            console.log(msg);
                        }
                    });
                });

                
            }
        });
    }

    // subscribe(roomId, callback) {
    //     // this.yunba.subscribe({topic: roomId}, (success, msg) => {
    //     //     if (success) {
    //     //         console.log(`你已成功订阅频道：${roomId}`);
    //     //     } else {
    //     //         console.log(msg);
    //     //     }
    //     // });
    //     this.yunba.set_message_cb((data) => {
    //         let msg = JSON.parse(data.msg);
    //         msg.status = 'success';
    //         let payload = {
    //             topic: data.topic,
    //             msg: msg
    //         };
    //         if (callback) {
    //             callback(payload);
    //         }
    //     });
    // }

    onReceivedMessage(callback) {
        // console.log(this.yunba);
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
        // {
        //     id: '227678',
        //     name: 'Darli&Uncle',
        //     avatar: 'assets/imgs/user.jpg',
        //     sex: 0,
        // },
        // {
        //     id: '527378',
        //     name: 'tomwey',
        //     avatar: 'assets/imgs/to-user.jpg',
        //     sex: 1,
        // },
    ];

    // 获取聊天列表
    GetChatRooms() {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { type: 'getChatRooms', fromid: uid });
    }

    // 获取聊天信息, 0 表示是群，1 表示个人
    GetChatMessages(toid, totype, roomid = "", pageid = "") {
        let uid = Utils.getQueryString('uid')
        let params = { 
            type: 'getChatMessage', 
            roomid: roomid, 
            toid: toid, 
            totype: totype,
            pageid: pageid,
            fromid: uid };
            // if (roomid) {
            //     params['roomid'] = roomid;
            // }
        return this.api.POST(null, params);
    }

    ReadMessages(roomid) {
        let uid = Utils.getQueryString('uid');
        return this.api.POST(null,{type: 'setChatMsgRead', p1: uid, p2: roomid},null, false);
    }

    DelMessages(roomid, type = '0') {
        let uid = Utils.getQueryString('uid');
        return this.api.POST(null,{type: 'delMessage', p1: uid, p2: roomid, p3: type});
    }

    sendChatMessage(payload: MessagePayload) {
        let body: FormData = new FormData();

        // body.append("type","sendChatMessage");
        body.append("roomid",payload.roomid);
        body.append("userId",payload.userId);
        body.append("toUserId",payload.toUserId);
        body.append("toUserType", payload.toUserType);
        body.append("contenttype",payload.contenttype);
        body.append("message",payload.message);
        body.append("len",payload.len);
        body.append("msgtype",payload.msgtype);

        return this.api.POST2(null, body, '正在提交');
    }

}