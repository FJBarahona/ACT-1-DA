# backend/routes/libro_routes.py
from flask import Blueprint, request, jsonify
from models.libro import ListaLibros

libro_bp = Blueprint('libros', __name__)
libros = ListaLibros()

@libro_bp.route('/libros', methods=['POST'])
def crear_libro():
    libro = request.json
    libros.insertar(libro)
    return jsonify({'mensaje': 'Libro creado'}), 201

@libro_bp.route('/libros', methods=['GET'])
def obtener_libros():
    return jsonify([nodo.libro for nodo in libros])

@libro_bp.route('/libros/<titulo>', methods=['DELETE'])
def eliminar_libro(titulo):
    libros.eliminar(titulo)
    return jsonify({'mensaje': 'Libro eliminado'})
