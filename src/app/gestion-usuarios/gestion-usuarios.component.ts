import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { IUsuario, IUsuarioParaCrear } from '../models/iusuario';
import { Observable } from 'rxjs';


declare var bootstrap: any;

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
}) export class GestionUsuariosComponent implements OnInit {

  @ViewChild('modalUsuario') modalElement!: ElementRef;
  @ViewChild('usuarioForm') usuarioForm!: NgForm;


  filtroPropiedad: string = 'first_Name';
  usuariosFiltrados: IUsuario[] = [];
  filtro: string = '';
  usuarios: IUsuario[] = [];
  usuarioSeleccionado: IUsuario = {
    id: 0,
    first_Name: '',
    last_Name: '',
    email: '',
    phone: '',
    address: ''
  };
  editando: boolean = false;
  modalInstance: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

 ngAfterViewInit() {
  if (this.modalElement?.nativeElement) {
    this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);

    this.modalElement.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.limpiarFormulario();
    });
  } else {
    console.error('modalElement no está definido.');
  }
}


  obtenerUsuarios(): void {
    this.apiService.getAllCustomers().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.usuariosFiltrados = [...this.usuarios];
        console.log('Usuarios obtenidos:', data);
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  aplicarFiltro(): void {
    const filtroTexto = this.filtro.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter((usuario) => {
      return usuario[this.filtroPropiedad]?.toString().toLowerCase().includes(filtroTexto);
    });
  }


  abrirModal(usuario?: any): void {
    this.editando = !!usuario;
    if (usuario) {
      this.usuarioSeleccionado = {
        id: usuario.id,
        first_Name: usuario.first_Name,
        last_Name: usuario.last_Name,
        email: usuario.email,
        phone: usuario.phone,
        address: usuario.address
      };
    } else {
      this.usuarioSeleccionado = {
        id: 0,
        first_Name: '',
        last_Name: '',
        email: '',
        phone: '',
        address: ''
      };
    }
    this.modalInstance.show();
  }

  guardarUsuario(): void {
    const usuarioParaEditar: IUsuario = { ...this.usuarioSeleccionado };
    const usuarioParaCrear: IUsuarioParaCrear = { ...this.usuarioSeleccionado };

    let operacion: Observable<any>;

    if (this.editando) {
      operacion = this.apiService.updateCustomer(usuarioParaEditar);
    } else {
      operacion = this.apiService.createCustomer(usuarioParaCrear);
    }

    operacion.subscribe({
      next: () => {
        console.log(this.editando ? 'Usuario actualizado:' : 'Usuario creado:', this.usuarioSeleccionado);
        this.obtenerUsuarios();
        this.modalInstance.hide();
        this.limpiarFormulario();
      },
      error: (err: any) => {
        console.error(this.editando ? 'Error al actualizar usuario:' : 'Error al crear usuario:', err);
      }
    });
  }

  editarUsuario(usuario: any): void {
    this.abrirModal(usuario);
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.apiService.deleteCustomer(id).subscribe({
        next: () => {
          console.log('Usuario eliminado:', id);
          this.obtenerUsuarios();
        },
        error: (err) => console.error('Error al eliminar usuario:', err)
      });
    }
  }

  private limpiarFormulario(): void {
    this.usuarioSeleccionado = {
      id: 0,
      first_Name: '',
      last_Name: '',
      email: '',
      phone: '',
      address: ''
    };
    this.editando = false;
    if (this.usuarioForm) {
    this.usuarioForm.resetForm();
  }
  }
}
