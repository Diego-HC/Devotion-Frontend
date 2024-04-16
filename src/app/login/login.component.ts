import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
  <div class="container">
    <div class="left-side">
      <div class="devotion">
          <p class="dev">DEV</p>
          <p class="otion"><br>OTION</p>
          <p class="vision-text">La visión <br> hace la <br> ejecución.</p>
      </div>
    </div>
    <div class="right-side">
      <div class="image-container">
        <img style="width: 70px" src="https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png">
        <img style="width: 70px" src="https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png">
        <img style="width: 200px; height: 60px;" src="/assets/FSAE.png">
      </div>  
    <div class="title white-background">
        <p>¿Tienes cuenta institucional?</p>
      </div>
      <div>
        <div class="button-container">
          <button class="microsoft-button">
            Ingresar con Microsoft
            <img src="https://www.pngmart.com/files/4/Microsoft-Logo-PNG-Free-Download.png" alt="Microsoft Logo" class="microsoft-logo">
          </button>
        </div>
        <p class="small-text" style="text-align: justify;">DEVOTION (el "Software") es un proyecto sin fines de lucro. Propiedad intelectual, y mantenido por, Society of Academic Labor and Application Development (SALAD).
      Hermenegildo Pérez Galaz es un nombre registrado, delegado para su uso en ejemplos y demostraciones por Mango Technologies, Inc., (antes BALLAD). DEVOTION, y su
      acrónimo “Development Environment for Visualization of Organizational Tasks Inspired Obviously by Notion”, son marcas pendientes de registrar.</p>
       
      </div>
        <div class="lower-content">
          <p>&copy; 2024 All Rights Reserved</p>
        </div>
    </div>
  </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

}