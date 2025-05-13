import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';


declare var bootstrap: any;

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})export class GestionUsuariosComponent implements OnInit {
  @ViewChild('modalUsuario') modalElement!: ElementRef;
  filtroPropiedad: string = 'first_Name';  // Propiedad por defecto a filtrar
  usuariosFiltrados: any[] = [];
  filtro: string = '';  // Filtro para buscar usuarios
  usuarios: any[] = [];
  usuarioSeleccionado: any = {
    id: null,
    first_Name: '',
    last_Name: '',
    email: '',
    phone: '',
    address: ''
  };
  editando: boolean = false;
  modalInstance: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  ngAfterViewInit() {
    if (this.modalElement?.nativeElement) {
      this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    } else {
      console.error('modalElement no está definido.');
    }
  }

  obtenerUsuarios(): void {
    this.apiService.getAllCustomers().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.usuariosFiltrados = [...this.usuarios];  // Inicializamos los usuarios filtrados
        console.log('Usuarios obtenidos:', data);
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  aplicarFiltro(): void {
    const filtroTexto = this.filtro.toLowerCase();  // Convertimos el filtro a minúsculas
    this.usuariosFiltrados = this.usuarios.filter((usuario) => {
      // Filtramos según la propiedad seleccionada
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
        id: null,
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
    const usuarioParaEditar = {
      id: this.usuarioSeleccionado.id,
      first_Name: this.usuarioSeleccionado.first_Name,
      last_Name: this.usuarioSeleccionado.last_Name,
      email: this.usuarioSeleccionado.email,
      phone: this.usuarioSeleccionado.phone,
      address: this.usuarioSeleccionado.address
    };
    const usuarioParaCrear = {
      name: this.usuarioSeleccionado.first_Name || this.usuarioSeleccionado.name,
      lastName: this.usuarioSeleccionado.last_Name || this.usuarioSeleccionado.lastName,
      email: this.usuarioSeleccionado.email,
      phone: this.usuarioSeleccionado.phone,
      address: this.usuarioSeleccionado.address
    };

    const operacion = this.editando ? 
      this.apiService.updateCustomer(usuarioParaEditar) :
      this.apiService.createCustomer(usuarioParaCrear)

    operacion.subscribe({
      next: () => {
        console.log(this.editando ? 'Usuario actualizado:' : 'Usuario creado:', usuarioParaEditar);
        this.obtenerUsuarios();
        this.modalInstance.hide();
        this.limpiarFormulario();
      },
      error: (err) => {
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
      id: null,
      first_Name: '',
      last_Name: '',
      email: '',
      phone: '',
      address: ''
    };
    this.editando = false;
  }
}
