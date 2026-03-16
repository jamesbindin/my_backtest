from sqlmodel import Session, select
import pandas as pd
from .models import Instrument, PriceData
from .database import create_db_and_tables, engine


def populate_db():
    with Session(engine) as session:
        # Add instruments
        eurusdD1 = Instrument(name="EUR/USD", symbol="EURUSD", timeframe="D1")
        session.add(eurusdD1)
        eurusdH1 = Instrument(name="EUR/USD", symbol="EURUSD", timeframe="H1")
        session.add(eurusdH1)
        eurusdH4 = Instrument(name="EUR/USD", symbol="EURUSD", timeframe="H4")
        session.add(eurusdH4)
        eurusdM1 = Instrument(name="EUR/USD", symbol="EURUSD", timeframe="M1")
        session.add(eurusdM1)
        eurusdM5 = Instrument(name="EUR/USD", symbol="EURUSD", timeframe="M5")
        session.add(eurusdM5)
        eurusdM15 = Instrument(name="EUR/USD", symbol="EURUSD", timeframe="M15")
        session.add(eurusdM15)
        eurusdM30 = Instrument(name="EUR/USD", symbol="EURUSD", timeframe="M30")
        session.add(eurusdM30)
        session.commit()

        def add_price_data(df, Instrument, session):
            for _, row in df.iterrows():
                price_data = PriceData(
                    instrument_id=Instrument.id,
                    time=row["time"],
                    open=row["open"],
                    high=row["high"],
                    low=row["low"],
                    close=row["close"],
                    volume=row["volume"]
                )
                session.add(price_data)

        instruments = session.exec(select(Instrument)).all()

        for instrument in instruments:
            csv_name = f"{instrument.symbol}_{instrument.timeframe}.csv"
            df = pd.read_csv(f"./backend/seed_data/forex/{csv_name}", parse_dates=["time"])
            add_price_data(df, instrument, session)
            print(f"Added price data for {instrument.name} ({instrument.timeframe})")

        session.commit()


def main():
    create_db_and_tables()
    populate_db()

if __name__ == "__main__":
    main()