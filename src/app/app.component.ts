// src/app/app.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EdamamApiService } from './services/edamam-api.service';
import { ApiNinjasService } from './services/api-ninjas.service';
import { MealDbApiService } from './services/meal-db.service';
import { SpoonacularApiService } from './services/spoonacular.service';
import { TastyApiService } from './services/tasty-api.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './app-workbench.component.html',  // Use external HTML template
  styleUrls: ['./app-workbench.component.css']
})
export class AppComponent implements OnInit {

  searchQuery: string = '';
  recipes: any[] = [];
  overlayOpen: boolean = false;

  authService = inject(AuthService);

  constructor(
    private edamamService: EdamamApiService,
    private apiNinjasService: ApiNinjasService,
    private mealDbService: MealDbApiService,
    private spoonacularService: SpoonacularApiService,
    private tastyService: TastyApiService

  ) {}

  ngOnInit(): void {
    // Handle auth state changes
    this.authService.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this.authService.currentUser.set({
          email: session?.user.email!,
          username: session?.user.identities?.at(0)?.identity_data?.['username'],
        });
      } else if (event === 'SIGNED_OUT') {
        this.authService.currentUser.set(null);
      }
    });
  }

  searchRecipes() {
    this.recipes = []; // Reset recipes list
    //this.searchEdamam();
    //this.searchApiNinjas();
    //this.searchMealDb();
    //this.searchSpoonacular();
    this.searchTasty();
  }

  searchEdamam() {
    this.edamamService.searchRecipes(this.searchQuery).subscribe(
      (data) => {
        this.recipes = this.recipes.concat(data.hits.map((hit: any) => hit.recipe));
      },
      (error) => {
        console.error('Error fetching recipes from Edamam:', error);
      }
    );
  }

  searchApiNinjas() {
    this.apiNinjasService.searchRecipes(this.searchQuery).subscribe(
      (data) => {
        this.recipes = this.recipes.concat(data);
      },
      (error) => {
        console.error('Error fetching recipes from API Ninjas:', error);
      }
    );
  }

  searchMealDb() {
    this.mealDbService.searchMeals(this.searchQuery).subscribe(
      (data) => {
        if (data.meals) {
          this.recipes = this.recipes.concat(data.meals);
        }
      },
      (error) => {
        console.error('Error fetching recipes from TheMealDB:', error);
      }
    );
  }

  searchSpoonacular() {
    this.spoonacularService.searchRecipes(this.searchQuery).subscribe(
      (data) => {
        if (data.results) {
          this.recipes = this.recipes.concat(data.results);
        }
      },
      (error) => {
        console.error('Error fetching recipes from Spoonacular:', error);
      }
    );
  }

  searchTasty() {
    this.tastyService.searchRecipes(this.searchQuery).subscribe(
      (data) => {
        if (data.results) {
          this.recipes = this.recipes.concat(data.results);
        }
      },
      (error) => {
        console.error('Error fetching recipes from Tasty:', error);
      }
    );
  }

  openOverlay() {
    this.overlayOpen = true;
  }

  closeOverlay() {
    this.overlayOpen = false;
  }

  logout(): void {
    this.authService.logout();
  }
}
