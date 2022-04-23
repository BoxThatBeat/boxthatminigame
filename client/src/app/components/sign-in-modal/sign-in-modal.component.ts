import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.css']
})
export class SignInModalComponent implements OnDestroy {

  private MODAL_NAME: string = 'SignIn';

  public form: FormGroup;
  submitted = false;

  public isOpen:boolean = false;
  subscription: Subscription;

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private accountService: AccountService
) { 

    this.subscription = this.modalService.modalOpened.subscribe(modalName => {
      if (modalName === this.MODAL_NAME) {
        this.openModal();
      }
    });

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.accountService.login(this.f['username'].value, this.f['password'].value, (response: any) : void => {
      if (response) {
        this.closeModal();
      }
    });
  }

  onModalCloseClick(): void {
    this.closeModal();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private openModal(): void {
    this.form.reset();
    this.isOpen = true;
  }

  private closeModal(): void {
    this.isOpen = false;
    this.modalService.closeModal(this.MODAL_NAME);
  }
}
