import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScrollSpyService } from '../../core/scroll-spy/scroll-spy.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuItems = [
    { id: 'Home',label: 'Home', icon: 'fa fa-home' },
    { id: 'About',label: 'About Me', icon: 'fa fa-user' },
    { id: 'Services',label: 'Service', icon: 'fa fa-briefcase' },
    { id: 'Resume',label: 'Resume', icon: 'fa fa-graduation-cap' },
    { id: 'Skill',label: 'Skill', icon: 'fa fa-lightbulb' },
    { id: 'Portfolio',label: 'Portfolio', icon: 'fa fa-image' },
    { id: 'OurBlog',label: 'Our Blog', icon: 'fa fa-blog' },
    { id: 'Contact',label: 'Contact', icon: 'fa fa-envelope' }
  ]
  
  activeItem = 'Home'; 
   private sub?: Subscription;
  setActive(label: string, id: string): void {
    const element = document.getElementById(id.toLowerCase());
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
isSidebarOpen = false;

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}

  constructor(private spy: ScrollSpyService) {}

  ngOnInit() {
    this.sub = this.spy.active$.subscribe(label => {
      this.activeItem = label;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}