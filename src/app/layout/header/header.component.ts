import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuItems = [
    { label: 'Home', icon: 'fa fa-home' },
    { label: 'About Me', icon: 'fa fa-user' },
    { label: 'Service', icon: 'fa fa-briefcase' },
    { label: 'Skill', icon: 'fa fa-lightbulb' },
    { label: 'Portfolio', icon: 'fa fa-image' },
    { label: 'Feedback', icon: 'fa fa-comments' },
    { label: 'Our Blog', icon: 'fa fa-blog' },
    { label: 'Contact', icon: 'fa fa-envelope' }
  ];
  
  activeItem = 'Home'; 
  setActive(label: string) {
    this.activeItem = label;
  }
}
