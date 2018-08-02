import { Injectable } from "@angular/core";
import { ApiService } from "./api-service";
import { Utils } from "./Utils";

@Injectable()
export class Socials {
    constructor(private api: ApiService) {

    }

    // 获取我的牌友
    GetMyFriends() {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'getFriends', operid: uid});
    }

    // 搜索牌友
    SearchFriends(keyword) {
        return this.api.POST(null, {type: 'search', key: keyword, operid: Utils.getQueryString('uid')});
    }

    // 加牌友
    AddFriend(friendId) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'addFriend', operid: uid, friendid: friendId});
    }

    UpdatePersonNoteName(name,friendid) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'changeFriendDescName',descname: name, friendid:friendid, operid: uid});
    }

    // 删除好友
    DeleteFriend(friendid) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'delFriend', operid: uid, friendid: friendid});
    }

    // 拉黑好友
    BlockFriend(friendid) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'blackFriend', operid: uid, friendid: friendid});
    }

    UnBlockFriend(friendid) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'disblackFriend', operid: uid, friendid: friendid});
    }

    // 获取群信息
    GetGroupInfo() {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'getGroupinfo', operid: uid});
    }

    // 获取群成员
    GetGroupMember(groupid) {
        return this.api.POST(null, {type: 'getGroupMember', groupid: groupid});
    }

    // 添加群
    // 1 计分群
    // 2 金币群
    AddGroup(name, grouptype,memberids) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'addGroup', memberids: memberids, operid: uid, name: name, grouptype: grouptype});
    }

    // 解散群
    DismissGroup(groupid) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'delGroup', operid: uid, groupid: groupid});
    }

    // 添加成员
    AddMember(groupid, destid) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'addMember', operid: uid, groupid: groupid, destid: destid});
    }

    // 删除成员
    DeleteMember(groupid, destid) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'delMember', operid: uid, groupid: groupid, destid: destid});
    }

    // 退群
    ExitGroup(groupid) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'exitGroup', operid: uid, groupid: groupid});
    }

    // 获取附近的人
    GetNearPlayer() {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'getNearPlayer', operid: uid});
    }

    // 请求加好友
    AskAddFriend(friendid,askdesc) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'askAddFriend', operid: uid, friendid:friendid, askdesc: askdesc});
    }

    // 获取加好友申请信息
    GetInviteInfo() {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { type: 'getMessage', operid: uid, msgtype: 1 });
    }

    // 处理好友加牌友申请
    HandleInviteMessage(action,msgid) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { type: action, 
            operid: uid, msgid: msgid })
    }

    // 群成员添加、删除
    MemberOperation(action, groupid, memberids) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { type: action, 
            operid: uid, groupid: groupid, destid: memberids.join(',') });
    }

    // 群操作
    GroupOperation(action, groupid) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { type: action, 
            operid: uid, groupid: groupid });
    }

    // 修改群资料
    UpdateGroupInfo(action, value, groupid) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { type: action, 
            p1: uid, p2: groupid, p3: value });
    }

    // 获取群排行
    GroupRanks(type,groupid) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { type: 'groupRanking', 
        operid: uid, groupid: groupid, rankingtype: type });
    }

    // 获取可玩的游戏
    GetGroupGame(groupid) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { type: 'getGroupGame', 
        p1: uid, p2: groupid });
    }

    // 设置可玩的游戏
    SetGroupGame(groupid, gameids) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { type: 'setGroupGame', 
        p1: uid, p2: groupid, p3: gameids.join(',') });
    }
}