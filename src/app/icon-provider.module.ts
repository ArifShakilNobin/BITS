import { NgModule } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
@NgModule({
  imports: [
    SidebarModule,   // Import SidebarModule
    ToolbarModule,   // Import ToolbarModule
    MenuModule,      // Import MenuModule
  ]
})
export class IconsProviderModule {
}
