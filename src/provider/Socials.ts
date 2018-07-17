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
        return this.api.POST(null, {type: 'search', key: keyword});
    }

    // 加牌友
    AddFriend(friendId) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'addFriend', operid: uid, friendid: friendId});
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
    AddGroup(name, grouptype) {
        let uid = Utils.getQueryString('uid')
        return this.api.POST(null, {type: 'addGroup', operid: uid, name: name, grouptype: grouptype});
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
}