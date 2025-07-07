import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { OurBlogComponent } from './pages/our-blog/our-blog.component';
import { ContactComponent } from './pages/contact/contact.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent,HomeComponent,AboutComponent,ServicesComponent,SkillsComponent,PortfolioComponent,FeedbackComponent,OurBlogComponent,ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MyDigitalPortfolio';

}
