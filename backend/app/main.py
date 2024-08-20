import os
   from flask import Flask, jsonify
   from flask_cors import CORS
   from dotenv import load_dotenv

   load_dotenv()

   app = Flask(__name__)
   CORS(app)

   @app.route('/api/health', methods=['GET'])
   def health_check():
       return jsonify({"status": "healthy"}), 200

   @app.route('/api/nodes', methods=['GET'])
   def get_nodes():
       return jsonify({"nodes": ["导演", "制作中台", "剪辑师", "调色师", "混音师"]}), 200

   if __name__ == '__main__':
       app.run(debug=True, host='0.0.0.0', port=int(os.getenv('PORT', 5001)))