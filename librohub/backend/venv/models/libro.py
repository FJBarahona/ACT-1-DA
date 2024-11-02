# backend/models/libro.py
class Nodo:
    def __init__(self, libro):
        self.libro = libro
        self.siguiente = None

class ListaLibros:
    def __init__(self):
        self.cabeza = None

    def insertar(self, libro):
        nuevo_nodo = Nodo(libro)
        nuevo_nodo.siguiente = self.cabeza
        self.cabeza = nuevo_nodo

    def eliminar(self, titulo):
        actual = self.cabeza
        previo = None
        while actual and actual.libro['titulo'] != titulo:
            previo = actual
            actual = actual.siguiente
        if previo is None:
            self.cabeza = actual.siguiente
        elif actual:
            previo.siguiente = actual.siguiente

    def buscar(self, titulo):
        actual = self.cabeza
        while actual and actual.libro['titulo'] != titulo:
            actual = actual.siguiente
        return actual.libro if actual else None
