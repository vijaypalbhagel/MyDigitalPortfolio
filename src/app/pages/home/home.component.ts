import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  bannerTxt: any='Developer'
  private intervalId: any;
  className:any='typing-animation'

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngOnDestroy(): void {
    this.clearInterval();
  }
   startInterval(): void {
    this.intervalId = setInterval(() => {
     console.log('timer start')
     this.bannerTxt= this.bannerTxt=='Developer'?'Professional Coder':'Developer'
     if(this.bannerTxt =='Developer'){
      this.className='typing-animation'
     }else{
      this.className=''
       this.className='typing-animation2'
     }
    }, 3000); 
  }

   clearInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnInit(): void {
 
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('start')?.click()
    }
    console.log('ngOnInit called');
   
  }
}
