import { Component,Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';



import { Ad }    from './ad.model';
import { AdService }    from './ad.service';

import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'ad-info', 
  styleUrls: ['../app.component.css'], 
  templateUrl: './ad-info.component.html'
})
export class AdInfoComponent { 
	ad:Ad = new Ad();
  imgsUrl:string[] = [];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  constructor(
    	private adService: AdService,      
      private route: ActivatedRoute
    	
  	) {}
	
	
	ngOnInit(): void {
      this.galleryOptions = [
            {
                width: '600px',
                height: '400px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '600px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: false
            }
        ];
      this.route.params
      // (+) converts string 'id' to a number
      .switchMap(params => this.adService.get(+params['id']))
      .subscribe(a => {
                        this.ad = a;
                        for (var i = 0; i < a.images.length; i++) {
                          
                          this.adService.getImageSrc(a,i).subscribe(a => {
                            
                            this.galleryImages.push({
                              small:a,
                              medium:a,
                              big:a
                            });
                          
                          });
                        }
                        
                      });

      
  }

  
	
	
  


}

