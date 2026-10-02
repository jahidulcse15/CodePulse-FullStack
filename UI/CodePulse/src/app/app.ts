import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/components/navbar/navbar';
import { AuthService } from './features/auth/auth-service';
import { ImageSelector } from './shared/components/image-selector/image-selector';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,ImageSelector],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CodePulse');
  authService=inject(AuthService);
  loadUserRef=this.authService.loadUser();
  user=this.loadUserRef.value;

  effectRef=effect(()=>{
    const UserValue=this.user();

    if(UserValue){
      this.authService.setUser(UserValue);
    }

  })
}
