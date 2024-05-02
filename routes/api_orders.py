from flask import Blueprint, request, render_template, redirect, url_for
from models import Order, Customer, Product, ProductOrder

from db import db

api_orders_bp = Blueprint("api_orders", __name__)


@api_orders_bp.route("/orders")
def orders():
    statement = db.select(Order).order_by(Order.id)
    records = db.session.execute(statement)
    results = records.scalars()
    return render_template("orders.html", orders=results)

@api_orders_bp.route("/orders/<int:order_id>")
def order_detail(order_id):
    statement = db.select(ProductOrder).where(ProductOrder.order_id == order_id)
    results = db.session.execute(statement).scalars()
    return render_template("order_product.html", orders=results)

    
@api_orders_bp.route("/api/orders/", methods=["POST"])
def create_order():
    data = request.json

    if "customer_id" not in data or "items" not in data:
        return "Missing customer_id or items", 404

    customer_id = data["customer_id"]
    items = data["items"]

    if not isinstance(items, list) or len(items) == 0:
        return "Items must be a list with at least 1 item", 400

    customer = db.session.execute(db.select(Customer).where(Customer.id == customer_id)).scalar()

    if customer is None:
        return "customer not found", 404

    order_items = []
    for item in items:
        if "name" not in item or "quantity" not in item:
            return "each item must have a name and quantity", 400

        product = db.session.execute(db.select(Product).where(Product.name == item["name"])).scalar()

        if product is None:
            continue

        quantity = int(item["quantity"])

        if quantity < 0:
            return "Quantity must be a positive integer", 410
            
        product_order = ProductOrder(product=product, quantity=quantity)
        order_items.append(product_order)

    order = Order(customer=customer, items=order_items)
    db.session.add(order)
    db.session.commit()

    return "", 201
    

@api_orders_bp.route("/orders/<int:order_id>/delete", methods=["POST"])
def delete_order(order_id):
    order = db.get_or_404(Order, order_id)

    if order is None:
        return "Order not found", 404
    elif order.processed == True:
        return "Processed orders cannot be deleted", 404
    else:
        db.session.delete(order)
        db.session.commit()
        return redirect(url_for("api_orders.orders"))


@api_orders_bp.route("api/orders/<int:order_id>", methods=["POST"])
def process_order(order_id, strategy="adjust"):
    data = request.json
    
    if "process" not in data:
        return "we cannot find your process key", 401

    order = db.session.execute(db.select(Order).where(Order.id == order_id)).scalar()

    if order is None:
        return "error: Order not found", 410

    if "strategy" not in data:
        strategy = "adjust"
    else:
        strategy = data["strategy"]

    current = order.process(strategy)

    if current is not None:
        db.session.commit()
        return "", 204
    else:
        return "Cannot Process order due to None value", 405
    
