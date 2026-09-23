import { Component, inject } from '@angular/core';
import { ImageSelectorService } from '../../services/image-selector-service';
import { FormControl, FormGroup, MaxValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { Conditional } from '@angular/compiler';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-image-selector',
  styleUrl: './image-selector.css',
  templateUrl: './image-selector.html',
})
export class ImageSelector {
  private imageSelectorService=inject(ImageSelectorService);
  
  showImageSelector=this.imageSelectorService.ShowImageSelector.asReadonly();

  imageSelectorUploadGroup=new FormGroup({

    file:new FormControl<File|null|undefined>(null,{
      nonNullable:true,
      validators:[Validators.required]
    }),
    name:new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required,Validators.maxLength(100)]
    }),
    title:new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required,Validators.maxLength(100)]
    })

  });

  hideImageSelector(){
    this.imageSelectorService.hideImageSelector();
  }

  onFileSelected(event:Event){
    const input=event.target as HTMLInputElement;
    if(!input.files||input.files.length==0){
      return;
    }

    const file=input.files[0];
    this.imageSelectorUploadGroup.patchValue({
      file:file
    });

  }

  onSubmit(){
    if(this.imageSelectorUploadGroup.valid){
      const formRawValue=this.imageSelectorUploadGroup.getRawValue();
      
      this.imageSelectorService.uploadImage(formRawValue.file!,formRawValue.name,formRawValue.title)
      .subscribe({
        next:(response)=>{
          console.log(response);
        },
        error:(error)=>{
          console.error('Upload Image Error:', error);
          console.error('Status:', error.status);
          console.error('Message:', error.message);
          console.error('Backend Error:', error.error);
          console.error('Validation Errors:', error.error?.errors);
        }
      });

    }
  }

}
