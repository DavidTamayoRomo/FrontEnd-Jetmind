import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent {

  public titulo:string = '';
  public tituloSubs$: Subscription;
  constructor(private router:Router, private route:ActivatedRoute) { 
    this.tituloSubs$ = this.getArgumentRoute().subscribe(data => {
                                    this.titulo = data.titulo;
                                    document.title = `JETMIND - ${this.titulo}`;
                                  });
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }


  getArgumentRoute(){
    return this.router.events
    .pipe(
      filter( (event: any) => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data ),
    );
  }

}
