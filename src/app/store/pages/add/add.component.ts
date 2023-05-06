import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DuckyService} from "../../services/ducky.service";
import {Ducky} from "../../interfaces/ducky.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Color} from "../../enums/color.enum";
import {DictionaryHelper} from "../../helpers/dictionary.helper";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  ducky!: Ducky;
  duckyForm = this.formBuilder.group({
    id: '',
    color: '',
    size: '',
    quantity: '',
    price: ''
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private duckyService: DuckyService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')){
      return;
    }

    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.duckyService.getDuckyById(id))
    ).subscribe(ducky => {
      this.ducky = ducky;
      this.duckyForm.controls['id'].setValue(String(ducky.id));
      this.duckyForm.controls['color'].setValue( DictionaryHelper.toSpanishColor(ducky.color));
      this.duckyForm.controls['size'].setValue(String(ducky.size));
      this.duckyForm.controls['quantity'].setValue(String(ducky.quantity));
      this.duckyForm.controls['price'].setValue(String(ducky.price));
    });
  }

  saveDucky() {
    if (!this.duckyForm.value) {
      return;
    }

    const ducky: Ducky = {
      color : this.duckyForm.controls['color'].value as Color,
      size : String(this.duckyForm.controls['size'].value),
      price : Number(this.duckyForm.value.price),
      quantity: Number(this.duckyForm.controls['quantity'].value)
    }

    if (this.ducky?.id){
      //update
      this.duckyService.updateDucky(this.ducky.id, ducky.price, ducky.quantity)
        .subscribe({
          next: ducky => {
            this.router.navigate(['list']);
            this.showSnackBar("Registro actualizado");
          }
        })
    }else{
      //create
      ducky.id = 0;
      this.duckyService.addDucky(ducky).subscribe({
        next: ducky => {
          this.router.navigate(['list']);
          this.showSnackBar("Registro creado");
        }
      })
    }
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'ok!', {
      duration: 2000
    });
  }

  isUpdate() {
    return this.ducky && this.ducky.id;
  }
}