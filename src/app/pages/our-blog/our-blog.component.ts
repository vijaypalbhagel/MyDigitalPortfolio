import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-our-blog',
  imports: [CommonModule],
  templateUrl: './our-blog.component.html',
  styleUrl: './our-blog.component.scss'
})
export class OurBlogComponent {
  cards = [
    {
      title: 'Become a Frontend Developer in 5 Simple Steps',
      description: 'A beginner-friendly roadmap to help you master HTML, CSS, JavaScript, and popular frontend frameworks.',
      imageUrl: '../../../assets/imagess/blog11.png'
    },
    {
      title: 'Master Angular in Just 7 Days',
      description: 'Break down Angular’s core concepts like components, services, and routing with a focused 7-day learning plan.',
      imageUrl: '../../../assets/imagess/blog22.png'
    },
    {
      title: 'Build a Complete MERN Stack Application',
      description: 'Learn to develop a complete task manager using MongoDB, Express, React, and No-rno-repeatde.js step by step.',
      imageUrl: '../../../assets/imagess/blog2.png'
    },
    {
      title: 'Python for Backend Developers: Quickstart Guide',
      description: 'Get up and running with Python for backend development, including Flask basics and API building.',
      imageUrl: '../../../assets/imagess/blog4.png'
    }
  ];
  isVisible = true;
  constructor(private el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      
      ([entry]) => {
     
        if (entry.isIntersecting) {
             console.log('IntersectionObserver entry:', entry);
          this.isVisible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.5, rootMargin: '-50% 0px -50% 0px' }
    );
    observer.observe(this.el.nativeElement);
  }

}
