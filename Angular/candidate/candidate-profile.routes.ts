import { Routes } from "@angular/router";
import { ProfileDashboardComponent } from "./profile-dashboard/profile-dashboard.component";
import { AssessmentsComponent } from "./profile-assessments/assessments.compnent";
import { ProgramsComponent } from "./profile-programs/programs.compnent";
import { ProfileProductComponent } from "./profile-products/profile-products.component";
import { EventsComponent } from "./profile-events/events.component";
import { SavedArticleComponent } from "./saved-article/saved-article.component";

export const candidateRoutes: Routes = [
    { path: 'candidate-profile', component: ProfileDashboardComponent },
    { path: 'candidate-profile/exams', component: AssessmentsComponent },
    { path: 'candidate-profile/programs', component: ProgramsComponent },
    { path: 'candidate-profile/products', component: ProfileProductComponent },
    { path: 'candidate-profile/events', component: EventsComponent },
    { path: 'candidate-profile/articles', component: SavedArticleComponent },
    { path: '', redirectTo: '/candidate-profile', pathMatch: 'full' }
];
