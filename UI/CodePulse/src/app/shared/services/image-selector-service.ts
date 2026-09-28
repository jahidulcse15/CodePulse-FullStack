import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { inject, Injectable, Service, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogImage } from '../models/image.models';
import { environment } from '../../../environments/environment.development';

@Injectable({
    providedIn:'root'
})
export class ImageSelectorService {

    http=inject(HttpClient);

    ShowImageSelector=signal<boolean>(false);
    selectedImage=signal<string|null>(null);

    displayImageSelector(){
        this.ShowImageSelector.set(true);
    }

    hideImageSelector(){
        this.ShowImageSelector.set(false);
    }

    uploadImage(file:File,fileName:string,title:string):Observable<BlogImage>{

        const formDate=new FormData();

        formDate.append("file",file);
        formDate.append("fileName",fileName);
        formDate.append("title",title);

        return this.http.post<BlogImage>(`${environment.apiUrl}/api/images`,formDate);
    }

    getAllImages(id:WritableSignal<string|undefined>):HttpResourceRef<BlogImage[]|undefined>{
        return httpResource<BlogImage[]>(()=>{
            id();
            return `${environment.apiUrl}/api/images`;
        })
    }

    selectImage(imageUrl:string){
        this.selectedImage.set(imageUrl);
        this.hideImageSelector();
    }

}
