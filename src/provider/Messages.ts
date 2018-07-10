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

    
}