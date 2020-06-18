import os
from dotenv import load_dotenv

APP_ROOT = os.path.join(os.path.dirname(__file__), "..")  # refers to application_top
dotenv_path = os.path.join(APP_ROOT, ".env")
load_dotenv(dotenv_path)


class Config(object):
    SECRET_KEY = os.environ.get("SECRET_KEY") or "flamingo-645744-jar-kale"
    MONGODB_URI = os.environ.get("MONGODB_URI") or "localhost"
    DATABASE_NAME = "dustball_db"

