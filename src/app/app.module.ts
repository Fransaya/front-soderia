import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CarouselModule } from 'primeng/carousel';

import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { TimeLineComponent } from './core/components/time-line/time-line.component';
import { MessagesModule } from 'primeng/messages';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        ContactoComponent,
        TimeLineComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ToolbarModule,
        ConfirmDialogModule,
        RatingModule,
        InputNumberModule,
        InputTextareaModule,
        RadioButtonModule,
        DropdownModule,
        ButtonModule,
        RouterOutlet,
        RouterModule,
        AppRoutingModule,
        CardModule,
        TimelineModule,
        FloatLabelModule,
        CarouselModule,
        MessagesModule,
        AccordionModule
    ],
    providers: [ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule { }