from app import app
from db import db
from models import Assignment, Course
import csv
from sqlalchemy.sql import functions as func
import random

def create_tables():
        db.create_all()

def drop_tables():
        db.drop_all()

def open_database():

        with open('templates/data/assignments.csv', mode='r') as file: 
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                assignment = Assignment(title=row['title'], description=row['description'], due_date=row['due_date'], submission_status=row['submission_status'])
                db.session.add(assignment)
                

        with open('templates/data/courses.csv', mode='r') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                course = Course(course_name=row['course_name'], instructor_name=row['instructor_name'], course_description=row['course_description'], semester=row['semester'], year=row['year'])
                db.session.add(course)

        db.session.commit()

# def rand_mix():
#     select_cust = db.select(Customer).order_by(func.random()).limit(1)
#     customer = db.session.execute(select_cust).scalar()

#     order = Order(customer=customer)
#     db.session.add(order)

#     select_prod = db.select(Product).order_by(func.random()).limit(1)
#     product = db.session.execute(select_prod).scalar()
#     rand_qty = random.randint(10,20)

#     association1 = ProductOrder(product=product, order=order, quantity=rand_qty)
#     db.session.add(association1)


#     select_prod = db.select(Product).order_by(func.random()).limit(1)
#     product = db.session.execute(select_prod).scalar()
#     rand_qty = random.randint(10,20)

#     association2 = ProductOrder(product=product, order=order, quantity=rand_qty)
#     db.session.add(association2)

#     db.session.commit()

if __name__ == "__main__":
      with app.app_context():
        drop_tables()
        create_tables()
        open_database()
        # for i in range(100):
        #      rand_mix()
        print("Done")


