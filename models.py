from sqlalchemy import Numeric, ForeignKey, Integer, String, DECIMAL
from sqlalchemy.orm import mapped_column, relationship
from sqlalchemy.sql.sqltypes import Float, DateTime
from sqlalchemy.sql.functions import func

from db import db

class Assignment(db.Model):
    assignment_id = mapped_column(Integer, primary_key=True)
    title = mapped_column(String(200), nullable=False)
    description = mapped_column(String(200), nullable=False)
    due_date = mapped_column(String(100), nullable=False)
    submission_status = mapped_column(String(200), nullable=False)
    course_id = mapped_column(Integer, ForeignKey('course.course_id'), nullable=False)
    course = relationship("Course", back_populates="assignments")
  

class Course(db.Model):
    course_id = mapped_column(Integer, primary_key=True)
    course_name = mapped_column(String(200), nullable=False)
    instructor_name = mapped_column(String(200), nullable=False)
    course_description = mapped_column(String(200), nullable=False)
    semester = mapped_column(String(200), nullable=False)
    year = mapped_column(Integer, nullable=False)
    assignments = relationship("Assignment")


    
# class Customer(db.Model):
#     id = mapped_column(Integer, primary_key=True)
#     name = mapped_column(String(200), nullable=False, unique=True)
#     phone = mapped_column(String(20), nullable=False)
#     balance = mapped_column(DECIMAL(5,2), nullable=False, default=200)
#     orders = relationship("Order")


# class Order(db.Model):
#     id = mapped_column(Integer, primary_key=True)
#     customer_id = mapped_column(Integer, ForeignKey(Customer.id), nullable=False)
#     customer = relationship("Customer", back_populates="orders")
#     total = mapped_column(DECIMAL(5,2), nullable=True)
#     items = relationship("ProductOrder", cascade="all, delete-orphan")
#     created = mapped_column(DateTime, server_default=func.now())
#     processed = mapped_column(DateTime, nullable=True)


#     def estimate_total(self):
#         total = sum(item.product.price * item.quantity for item in self.items)
#         return total

#     def process(self, strategy):

#         if self.processed:
#             return "already processed"
        
#         process = True
#         total = 0
#         tmp = []
        
#         for item in self.items:
            
#             if item.quantity > item.product.quantity:
#                 if strategy == "adjust":
#                     adjusted = min(item.quantity, item.product.quantity)
#                     tmp.append((item, adjusted))

#                 elif strategy == "reject":
#                     process = False
#                     break

#                 elif strategy == "ignore":
#                     item.quantity = 0

#             else :
#                 item.product.quantity -= item.quantity
#                 total += item.quantity * item.product.price

#         for pair in tmp:
#             item, adjusted_quantity = pair
#             product = item.product
#             product.quantity -= adjusted_quantity
#             total += adjusted_quantity * product.price

#         if process == True:
#             self.total = total
#             self.customer.balance -= total
#             self.processed = func.now()
#             return True
#         else :
#             self.processed = None
#             return False

        
# class Product(db.Model):
    
#     id = mapped_column(Integer, primary_key=True)
#     name = mapped_column(String(200), nullable=False, unique=True)
#     price = mapped_column(DECIMAL(5,2))
#     quantity = mapped_column(Integer, nullable=False, default=50)
#     orders = relationship("ProductOrder")

#     def to_json(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "price": self.price,
#             "quantity": self.quantity,
#         }

# class ProductOrder(db.Model):

#     id = mapped_column(Integer, primary_key=True)
#     product_id = mapped_column(Integer, ForeignKey(Product.id), nullable=False)
#     order_id = mapped_column(Integer, ForeignKey(Order.id), nullable=False)
#     quantity = mapped_column(Integer, nullable=False)
#     product = relationship("Product", back_populates="orders")
#     order = relationship("Order", back_populates="items")
    
