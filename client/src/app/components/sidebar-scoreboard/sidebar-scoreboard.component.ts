import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'sidebar-scoreboard',
  templateUrl: './sidebar-scoreboard.component.html',
  styleUrls: ['./sidebar-scoreboard.component.css']
})
export class SidebarScoreboardComponent implements OnInit {

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
  }

}
