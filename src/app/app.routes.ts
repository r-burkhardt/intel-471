import { Routes } from '@angular/router';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'meal/:id', component: RecipeDetailsComponent }
];
