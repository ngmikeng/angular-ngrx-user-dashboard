import { Component, OnInit } from '@angular/core';
import { IAppMenu } from '../shared/models/app-menu.model';
import { PAGE_SIDEBAR_MENU_ITEMS } from './page-sidebar-menu';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  menuItems: IAppMenu[] = [];

  constructor() { }

  ngOnInit() {
    this.menuItems = PAGE_SIDEBAR_MENU_ITEMS;
  }

}
