from pathlib import Path
from db import db
# from routes import api_customers_bp
# from routes import api_products_bp
# from routes import api_orders_bp
from flask import Blueprint
from flask import Flask, render_template


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.instance_path = Path("database").resolve()
db.init_app(app)

# app.register_blueprint(api_customers_bp, url_prefix="/")
# app.register_blueprint(api_products_bp, url_prefix="/")
# app.register_blueprint(api_orders_bp, url_prefix="/")


@app.route("/")
def home():
    return render_template("base.html", name = "Austin")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=8888)

