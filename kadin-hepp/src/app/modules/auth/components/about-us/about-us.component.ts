import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goSection() {
    const element = document.getElementById("section2");
    // İstediğiniz yere gitmek için scrollTo() kullanabilirsiniz
    if(element) {
    element.scrollIntoView( {behavior: "smooth", block: "end", inline: "nearest" }); // Yumuşak bir şekilde kaydırır
    }
  }

}
