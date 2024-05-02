from flask import Blueprint, request, render_template
from models import Order, Customer, Product, ProductOrder
from db import db

api_customers_bp = Blueprint("api_customers", __name__)


@api_customers_bp.route("/customers")
def customers():
    statement = db.select(Customer).order_by(Customer.id)
    results = db.session.execute(statement).scalars()
    return render_template("customers.html", customers=results)

@api_customers_bp.route("customers/<int:customer_id>")
def customer_detail(customer_id):
    statement = db.select(ProductOrder).join(Order).where(Order.customer_id == customer_id)
    results = db.session.execute(statement).scalars()
    return render_template("customer_order.html", orders=results)

@api_customers_bp.route("/api/customers", methods=["POST"])
def create_customer():
    data = request.json
    if "name" not in data or "phone" not in data:
        return "name or phone attributes are missing", 400
    
    balance = data["balance"]
    if not isinstance(balance, (int, float)):
        return "balance attribute should be integer or float", 400
    
    else : 
        customer = Customer(name=data["name"], phone=data["phone"])
        db.session.add(customer)
        db.session.commit()
        return "", 201

@api_customers_bp.route("api/customers/<int:customer_id>", methods=["PUT"])
def updates_customers(customer_id):
    data = request.json
    customer = db.get_or_404(Customer, customer_id)

    if customer is None:
        return "Customer not found", 404
    
    if "balance" not in data:
        return "balance attribute is missing", 400
    
    balance = data["balance"]

    if not isinstance(balance, (int, float)):
        return "balance attribute is not a number", 400

    elif "balance" in data:
        customer.balance = data["balance"]
        db.session.commit()
        return "", 204


@api_customers_bp.route("api/customers/<int:customer_id>", methods=["DELETE"])
def delete_customer(customer_id):
    customer = db.get_or_404(Customer, customer_id)
    if customer is None:
        return "Customer not found", 404
    else:
        db.session.delete(customer)
        db.session.commit()
        return "", 204

@api_customers_bp.route("api/customers/<int:customer_id>", methods=["GET"])
def customer_detail_json(customer_id) :
    statement = db.select(Customer).where(Customer.id == customer_id)
    result = db.session.execute(statement)
    customer = result.scalar()
    if customer is None:
        return "error : Customer not found", 404
    else:
        return "", 200