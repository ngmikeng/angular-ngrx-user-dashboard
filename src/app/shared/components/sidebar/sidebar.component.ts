import { Component, OnInit, Input } from '@angular/core';
import { IAppMenu } from '../../models/app-menu.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  @Input()
  menuItems: IAppMenu[] = [];

  ngOnInit() {
  }

}
