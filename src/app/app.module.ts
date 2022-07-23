import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { TasksDistributionComponent } from './graphs/tasks-distribution/tasks-distribution.component';
import { TasksByBeinexSectorsComponent } from './graphs/tasks-by-beinex-sectors/tasks-by-beinex-sectors.component';
import { TasksByAuraaComponent } from './graphs/tasks-by-auraa/tasks-by-auraa.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { OverviewTileComponent } from './shared/overview-tile/overview-tile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    TasksDistributionComponent,
    TasksByBeinexSectorsComponent,
    TasksByAuraaComponent,
    ProgressBarComponent,
    OverviewTileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
