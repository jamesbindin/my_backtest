from fastapi import FastAPI
from sqlmodel import Session, select
from enum import Enum
from datetime import datetime, timedelta
from .database import create_db_and_tables, engine
from .models import Instrument, PriceData

app = FastAPI()

class symbol(Enum):
    EURUSD = "EURUSD"

class timeframes(Enum):
    D1 = "D1"
    H1 = "H1"
    H4 = "H4"
    M1 = "M1"
    M5 = "M5"
    M15 = "M15"
    M30 = "M30"

@app.get("/bars/{symbol}/{timeframe}")
async def get_bars(symbol: symbol, timeframe: timeframes, timefrom: datetime = None, timeto: datetime = None, limit: int = None):
    print(timeto)
    with Session(engine) as session:
        instrument = session.exec(
            select(Instrument).where(Instrument.symbol == symbol.value, Instrument.timeframe == timeframe.value)
        ).first()
        if not instrument:
            return {"error": "Instrument not found"}
        if timefrom and timeto:
            price_data = session.exec(
                select(PriceData).where(
                    PriceData.instrument_id == instrument.id,
                    PriceData.time >= timefrom,
                    PriceData.time <= timeto
                ).order_by(PriceData.time)
            ).all()
            return price_data
        if limit:
            if timefrom:
                price_data = session.exec(
                    select(PriceData).where(
                        PriceData.instrument_id == instrument.id,
                        PriceData.time >= timefrom
                    ).order_by(PriceData.time.asc()).limit(limit)
                ).all()
                return price_data
            if timeto:
                price_data = session.exec(
                    select(PriceData).where(
                        PriceData.instrument_id == instrument.id,
                        PriceData.time <= timeto
                    ).order_by(PriceData.time.desc()).limit(limit)
                ).all()
                price_data.reverse()
                return price_data


# def main():
#     create_db_and_tables()

# if __name__ == "__main__":
#     main()