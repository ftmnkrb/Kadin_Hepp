import { Component } from '@angular/core';

@Component({
  selector: 'app-under-cunstruction',
  template: `
    <div
      style="min-height: 100vh;"
      class="d-flex flex-column align-items-center justify-content-center bg-white"
    >
      <h1 class="fw-bolder text-center">
        We're under cunstruction. <br />Please come back later :)
      </h1>
      <img class="img-fluid" src="assets/photos/construction.gif" alt="" />
      <button class="btn btn-primary text-white fs-3" routerLink="">
        Go Back
      </button>
    </div>
  `,
})
export class UnderCunstructionComponent {}
