"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    data = request.json
    required_fields = ['username', 'password', 'email']
    
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    try:
        new_user = User(
            username=data['username'],
            email=data['email'],
        )

        new_user.set_password(data['password'])  

        db.session.add(new_user)
        db.session.flush()  
        db.session.commit()
        return jsonify({"message": "Usuario y objetivo registrados con éxito"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Parece que algo salió mal", "details": str(e)}), 500
    
@api.route('/login', methods=['POST'])
def login():
    data = request.json
    required_fields = ['email', 'password']

    if not all(field in data for field in required_fields):
        return jsonify({"message": "Email y contraseña son obligatorios"}), 400

    user = User.query.filter_by(email=data['email']).first()

    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404

    if not check_password_hash(user.password, data['password']):
        return jsonify({"message": "Contraseña incorrecta"}), 401

    access_token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Inicio de sesión exitoso",
        "access_token": access_token,
        "user": user.serialize()
    }), 200
