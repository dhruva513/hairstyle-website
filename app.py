from flask import Flask, render_template, jsonify, request
from hairstyles import db

app = Flask(__name__)


# ---------- PAGE ROUTE ----------
@app.route("/")
def home():
    return render_template("index.html")


# ---------- API ROUTES ----------

@app.route("/api/face-shapes")
def api_face_shapes():
    """Return list of all face shape names"""
    shapes = db.get_all_shapes()
    return jsonify({"success": True, "shapes": shapes})


@app.route("/api/face-shape/<shape>")
def api_face_shape(shape):
    """Return all data for one face shape"""
    data = db.get_shape_data(shape)
    if data:
        return jsonify({"success": True, "data": data})
    return jsonify({"success": False, "error": "Shape not found"}), 404


@app.route("/api/recommendations/<shape>")
def api_recommendations(shape):
    """Return recommendations for a shape + gender"""
    gender = request.args.get("gender", "women")

    if gender not in ["men", "women"]:
        return jsonify({"success": False, "error": "Gender must be men or women"}), 400

    data = db.get_recommendations(shape, gender)
    if data:
        return jsonify({"success": True, **data})
    return jsonify({"success": False, "error": "Not found"}), 404


@app.route("/api/search")
def api_search():
    """Search hairstyles by keyword"""
    query = request.args.get("q", "").lower().strip()

    if not query:
        return jsonify({"success": False, "error": "Provide ?q=keyword"}), 400

    results = []

    for shape_name in db.get_all_shapes():
        shape = db.get_shape_data(shape_name)

        for gender in ["men", "women"]:
            for style in shape[gender]["recommended"]:
                if query in style["name"].lower() or query in style["description"].lower():
                    results.append({
                        "shape": shape_name,
                        "gender": gender,
                        "style": style
                    })

    return jsonify({"success": True, "count": len(results), "results": results})


# ---------- RUN ----------
if __name__ == "__main__":
    print("")
    print("=" * 50)
    print("  StyleFinder is running!")
    print("  Open your browser and go to:")
    print("  http://localhost:5000")
    print("=" * 50)
    print("")
    app.run(debug=True, port=5000)