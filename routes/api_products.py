from flask import Blueprint, request, render_template, request
from db import db
from models import Product

api_products_bp = Blueprint("api_products", __name__)


@api_products_bp.route("/products")
def products():
    statement = db.select(Product).order_by(Product.name)
    records = db.session.execute(statement)
    results = records.scalars()
    return render_template("products.html", products=results)

@api_products_bp.route("/api/products/", methods = ["POST"])
def create_product():
    data = request.json

    if "name" not in data or "price" not in data:
        return "Error : name, price or quantity attributes are missing", 400

    price = data["price"]
    

    if "quantity" not in data:
        quantity = 100
    else:
        quantity = data["quantity"]

    if not isinstance(price, float) or price < 0:
        return "Error : price attribute is not a positive float", 400

    if not isinstance(quantity, int) or quantity < 0:
        return "Error : quantity attribute is not a positive integer", 400

    product = Product(name=data["name"], price=price, quantity=quantity)

    db.session.add(product)
    db.session.commit()
    return "", 201

@api_products_bp.route("api/products/<int:product_id>", methods=["PUT"])
def update_product(product_id) :
    data = request.json
    product = db.get_or_404(Product, product_id)
    if product is None:
        return "Product not found", 404

    if "name" in data:
        product.name = data["name"]
        if len(product.name) < 0 :
            return "Name should not be empty", 400

    if "price" in data:
        price = data["price"]
        if not isinstance(price, float) or price <= 0:
            return "Error : price attribute is not a positive float", 400
        product.price = price

    if "quantity" in data:
        quantity = data["quantity"]
        if not isinstance(quantity, int) or quantity < 0:
            return "Error : quantity attribute is not a positive integer", 400
        product.quantity = quantity

    db.session.commit()
    return "", 204


@api_products_bp.route("/api/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    product = db.get_or_404(Product, product_id)
    if product is None:
        return "Product not found", 404
    else:
        db.session.delete(product)
        db.session.commit()
        return "", 204
