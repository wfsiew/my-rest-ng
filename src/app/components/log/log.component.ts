import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';
 
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit, OnDestroy {

  data: any;
  subscription: Subscription;

  constructor(private msService: MessageService) {
    
  }

  ngOnInit() {
    this.subscription = this.msService.get().subscribe(x => {
      this.data = x;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
