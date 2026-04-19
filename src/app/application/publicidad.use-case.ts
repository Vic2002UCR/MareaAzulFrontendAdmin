import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publicidad } from '../domain/entities/publicidad.entity';
import { PublicidadRepository } from '../domain/interfaces/publicidad.repository';

@Injectable({
  providedIn: 'root'
})
export class PublicidadUseCase {
  private readonly repository = inject(PublicidadRepository);

  getAll(): Observable<Publicidad[]> {
    return this.repository.getAll();
  }

  getById(id: number): Observable<Publicidad> {
    return this.repository.getById(id);
  }

  getActivas(): Observable<Publicidad[]> {
    return this.repository.getActivas();
  }

  create(publicidad: Publicidad): Observable<Publicidad> {
    return this.repository.create(publicidad);
  }

  update(id: number, publicidad: Publicidad): Observable<any> {
    return this.repository.update(id, publicidad);
  }

  delete(id: number): Observable<any> {
    return this.repository.delete(id);
  }
}