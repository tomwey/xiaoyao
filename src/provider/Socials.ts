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

    // 获取用户详细资料
    GetUserInfo(userId) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'getUserInfo', p1: uid, p2: userId});
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
    GetGroupInfo(groupid = '') {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'getGroupinfo', operid: uid, groupid: groupid});
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

    // 获取群权限
    GetGroupPower(groupid) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { type: 'getgrouppower', 
        p2: uid, p1: groupid });
    }

    // 设置群权限
    SetGroupPower(groupid, p3,p4,p5,p6,p7,p8,p9,p10,p11) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { type: 'setGroupPower', 
        p2: uid, p1: groupid, p3: p3,p4: p4,p5: p5,p6: p6,p7: p7,p8: p8,p9: p9,p10: p10,p11:p11 });
    }

    // 转让群主
    ChangeGroupMGR(groupid, toUserId) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { type: 'changeGroupMGR', 
        p1: uid, p2: toUserId, p3: groupid });
    }

    // 副群主认命或取消
    SetViceGroupMGR(groupid, toUserId, type) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { type: 'setViceGroupMGR', 
        p1: uid, p2: toUserId, p3: groupid, p4: type });
    }

    // 设置聊天配置
    SetChatConfig(destid,type,field,value) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, { type: 'setChatConfig', 
        p1: uid, p2: destid, p3: type, p4: field, p5: value });
    }

    // 获取群成员
    GetGroupMembers(groupid) {
        return this.api.POST(null, { type: 'getGroupMember',groupid: groupid });
    }

    // 获取验证码
    GetCode(mobile) {
        return this.api.GET('sendsms', { mobile: mobile, uid: Utils.getQueryString('uid') });
    }

    BindMobile(param) {
        return this.api.POST(null, { type: 'validatephone', p1: Utils.getQueryString('uid'), p2: param.code, p3: param.mobile });
    }
}