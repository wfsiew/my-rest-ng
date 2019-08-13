import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  data: any;
  name = 'hello world';

  constructor(
    private router: Router,
    private dataService: DataService,
    private msService: MessageService,
    private authService: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.clear();
    this.router.navigate(['/login']);
  }

  load() {
    this.dataService.getData().subscribe(res => {
      this.data = res;
      this.send();
    },
    error => {
      alert('please check console for error');
      console.error(error);
    });
  }

  loadSecure() {
    this.dataService.getSecureData().subscribe(res => {
      this.data = res;
      this.send();
    },
    error => {
      alert('please check console for error');
      console.error(error);
    });
  }

  loadDelay() {
    this.dataService.getDelayData().subscribe(res => {
      this.data = res;
    },
    error => {
      alert('please check console for error');
      console.error(error);
      if (error.message) {
        alert(error.message);
      }
    })
  }

  loadUser() {
    this.dataService.getUser().subscribe(res => {
      this.data = res;
      this.send();
    },
    error => {
      alert('please check console for error');
      console.error(error);
    });
  }

  send() {
    this.msService.send('app-data', this.data);
  }
}
