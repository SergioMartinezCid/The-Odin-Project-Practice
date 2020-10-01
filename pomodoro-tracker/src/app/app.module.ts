import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TrackerComponent } from './tracker/tracker.component';
import { SettingsComponent } from './settings/settings.component';
import { TrackerClockComponent } from './tracker-clock/tracker-clock.component';
import { TrackerSectionComponent } from './tracker-section/tracker-section.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    TrackerComponent,
    SettingsComponent,
    TrackerClockComponent,
    TrackerSectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
