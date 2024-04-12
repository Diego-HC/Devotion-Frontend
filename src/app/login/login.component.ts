import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
  <div class="container">
    <div class="left-side">
      <div class="devotion">
        <p class="dev">DEV</p>
        <p class="otion">OTION</p>
        <p class="vision-text">La visión hace la ejecución.</p>
      </div>
    </div>
    <div class="right-side">
      <div class="image-container">
        <img style="width: 70px" src="https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png">
        <img style="width: 70px" src="https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png">
        <img style="width: 70px" src="https://cdn.icon-icons.com/icons2/2518/PNG/512/x_icon_150997.png">
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
  styles: [`
  .container {
    display: flex;
    height: 100vh;
  }

  .left-side {
    width: 50%;
    background-image: url('https://th.bing.com/th/id/OIP.CT3lxFToU1GVPcyluYKxBQHaE8?rs=1&pid=ImgDetMain');
    background-size: cover;
    background-position: left top;
    position: relative;
  }

  .right-side {
    width: 50%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .devotion {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: left;
    color: white;
    padding: 10px 0;
  }

  .dev {
    font-weight: bold;
    font-size: 24px;
    margin-bottom: -10px;
  }

  .otion {
    font-size: 24px;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .white-background {
    font-size: 14px;
    background-color: white;
    padding: 1px;
  }
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  .microsoft-button { background-color: navy;
    background-color: #2A4365;
    color: white; border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .microsoft-logo { 
    height: 20px;
    width: auto;
   } 

   .small-text {
    font-size: 10px;
    
  }
  .lower-content {
    /*flex-grow: 1;
    display: flex;*/
    align-items: flex-end;
    justify-content: center;
    font-size: 10px;
  }
  .vision-text {
    font-size: 14px;
    color: white;
    text-align: right;
  }
  .image-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .image-container img {
    margin: 0 10px;
  }

  `]
})
export class LoginComponent {

}