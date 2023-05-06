import {Component, OnInit} from '@angular/core';
import {DuckyService} from "../../services/ducky.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "../../components/confirm/confirm.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Color} from "../../enums/color.enum";
import {DictionaryHelper} from "../../helpers/dictionary.helper";
import {Ducky} from "../../interfaces/ducky.interface";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'color', 'size', 'price', 'quantity', 'actions'];
  dataSource: Ducky[] = [];

  constructor(private duckyService: DuckyService,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getDuckies();
  }

  edit(id: number) {
    this.router.navigate(['edit', id])
  }

  delete(id: number): void {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: null
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.duckyService.deleteDucky(id)
            .subscribe(resp => {
              this.getDuckies();
              this.showSnackBar('Registro eliminado');
            });
        }
      }
    );

  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'ok!', {
      duration: 2000
    });
  }

  private getDuckies() {
    this.duckyService.getDuckies()
      .subscribe({
        next: duckies => {
          this.dataSource = duckies;
        },
        error: err => {
          console.log("error al obtener los patitos");
        }
      })
  }

  convertToSpanish(color: Color): string {
    return DictionaryHelper.toSpanishColor(color);
  }
}
