import { Component, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { SubscriberCardComponent } from "./subscriber-card/subscriber-card.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ImgUrlPipe,SvgIconComponent, NgForOf, SubscriberCardComponent, RouterLink, AsyncPipe, JsonPipe, NgIf, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService = inject(ProfileService)

  subscribers$ = this.profileService.getSubscribersShortList()

  me = this.profileService.me

  menuItems = [
  {
    label: 'Моя страница',
    icon: 'home',
    link: 'profile/me'
  },
  {
    label: 'Чаты',
    icon: 'chats',
    link: 'chats'
  },
  {
    label: 'Поиск',
    icon: 'search',
    link: 'search'
  }
]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }
}
