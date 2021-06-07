import { Component, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { IMessage } from '@stomp/stompjs';
import { Message } from 'src/app/models/message.model';
import { TokenStorageService } from 'src/app/service/token-storage.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  messages: Message[] = [];
  private url = '/topic/message';

  constructor(
    private rxStompService: RxStompService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.rxStompService.watch(`${this.url}.${this.tokenStorage.getUser()?.username}`).subscribe(notification => this.handleMessage(notification));
  }

  private handleMessage(iMessage: IMessage) {
    if (iMessage) {
      this.messages.push(JSON.parse(iMessage.body));
    }
  }

}
