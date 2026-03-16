from sqlmodel import SQLModel, create_engine

sqlite_file_name = "backend/database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url)

def create_db_and_tables():
    print("Creating database and tables...")
    SQLModel.metadata.create_all(engine)