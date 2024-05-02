from app import app
from db import db
from models import Customer, Product, ProductOrder, Order
import csv
from sqlalchemy.sql import functions as func
import random

def create_tables():
        db.create_all()

def drop_tables():
        db.drop_all()

def open_database():

        with open('templates/data/customers.csv', mode='r') as file: 
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                customer = Customer(name=row['name'], phone=row['phone'])
                db.session.add(customer)

        with open('templates/data/products.csv', mode='r') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                product = Product(name=row['name'], price=row['price'])
                product.price = round(float(product.price), 2)
                db.session.add(product)

        db.session.commit()

def rand_mix():
    select_cust = db.select(Customer).order_by(func.random()).limit(1)
    customer = db.session.execute(select_cust).scalar()

    order = Order(customer=customer)
    db.session.add(order)

    select_prod = db.select(Product).order_by(func.random()).limit(1)
    product = db.session.execute(select_prod).scalar()
    rand_qty = random.randint(10,20)

    association1 = ProductOrder(product=product, order=order, quantity=rand_qty)
    db.session.add(association1)


    select_prod = db.select(Product).order_by(func.random()).limit(1)
    product = db.session.execute(select_prod).scalar()
    rand_qty = random.randint(10,20)

    association2 = ProductOrder(product=product, order=order, quantity=rand_qty)
    db.session.add(association2)

    db.session.commit()

if __name__ == "__main__":
      with app.app_context():
        drop_tables()
        create_tables()
        open_database()
        for i in range(100):
             rand_mix()
        print("Done")


