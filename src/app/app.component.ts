import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from './project.service';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  getTranslatedText(item: any, field: 'name' | 'description' | 'param1'): string {
    const lang = this.translate.currentLang || 'en';
    return item[field] && item[field][lang] ? item[field][lang] : item[field]['en'];
  }

  getTranslatedTitle():string{
    const lang = this.translate.currentLang || 'en';
    return this.projectTitle?.[lang] || '';
  }
  projectTitle: { [key: string]: string } = {};
  projectDetails: any[] = [];
  heroVideoUrl: string = '';
  address1: string = '';
  address2: string = '';
  address3: string = '';
  phoneNo: string = '';
  email: string = '';

  constructor(private projectService: ProjectService,
    private translate: TranslateService
  ){
    const savedLang = localStorage.getItem('lang') || 'en';
    this.currentLang = savedLang.toUpperCase();
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);
  }

  currentLang = 'EN';
  toggleLang(lang: string){
    this.currentLang = lang;
    const langCode = lang.toLowerCase();
    this.translate.use(langCode);
    localStorage.setItem('lang', langCode);
  }

  isScrolled = false;
  @HostListener('window.scroll',[])
  onWindowScroll(){
    const offset = window.scrollY;
    this.isScrolled = offset > 50;
  }

  scrollToTop(event:Event){
    event.preventDefault();
    window.scrollTo({top:0, behavior: 'smooth'});
  }
  ngOnInit(): void {
    AOS.init();
    this.projectService.getProjectData().subscribe(data => {
      console.log('JSON data loaded:', data);
      console.log(this.projectDetails.map(item => item.name));
      const content = data.content;
      this.projectTitle = data.content.descriptionTitle;
      this.projectDetails = data.content.projectDetails;
      this.heroVideoUrl = data.content.logo;

      /* Footer Info */
      this.address1 = content.address1;
      this.address2 = content.address2;
      this.address3 = content.address3;
      this.phoneNo = content.phoneNo;
      this.email = content.email;

    });
  }

  agree = false;
  onSubmit(){
    if(this.agree){
      alert(this.translate.instant('THANK_YOU_REGISTER'));
    }else{
      alert(this.translate.instant('PLEASE_AGREE'));
    }
  }
}