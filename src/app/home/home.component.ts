import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MessageService } from '../messages/message.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private messageService: MessageService){}

  ngOnInit(){
    this.messageService.clear();
  }
}
