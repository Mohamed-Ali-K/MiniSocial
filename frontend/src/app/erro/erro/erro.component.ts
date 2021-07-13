import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.css'],
})
export class ErroComponent implements OnInit {
   constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}

  ngOnInit(): void {}
}
